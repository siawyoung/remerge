/**
 * The top-level merge function
 *
 * @param {object} remerge map
 * @return {function} reducer function
 *
 */

import _ from 'lodash'
import { isMap } from './utils'

const merge = (map) => {

  const _getAccessorKey = (key) => {
    // this regex tests if the key is of the form abc[123], with opening and closing square brackets
    const containsAccessor = /\w+\[\w+\]$/.test(key)
    if (containsAccessor) {
      // this regex captures the content inside the square brackets
      const captureAccessor = /.+\[(\w+)\]/.exec(key)
      if (captureAccessor) {
        return captureAccessor[1]
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const _removeAccessorKey = (key) => {
    if (_getAccessorKey(key)) {
      return key.replace(_getAccessorKey(key), "")
    }
    return key
  }

  const _preprocess = (map) => {
    const newMap = {}

    for (const key in map) {
      const isFunction = _.isFunction(map[key])
      newMap[_removeAccessorKey(key)] = {
        key: /([^\[]+)/.exec(key)[1],
        isLeaf: isFunction,
        accessorKeyName: _getAccessorKey(key),
        child: isFunction ? map[key] : _preprocess(map[key])
      }
    }

    return newMap
  }

  const _initial = (map) => {
    if (!map) {
      return undefined
    } else if (_.isFunction(map)) {
      return undefined
    } else if (map['_'] !== undefined) {
      return map['_']
    }

    const newMap = {}
    for (const key in map) {
      if (!_getAccessorKey(key)) {
        const result = _initial(map[key])
        if (result !== undefined) {
          newMap[key] = result
        }
      }
    }
    return Object.keys(newMap).length > 0 ? newMap : null
  }

  const _process = (_map, state, action) => {
    const currentPath = action.type.split('.', 1)[0]
    const newState = _.clone(state)
    var foundPath = false

    for (const path of Object.keys(_map)) {
      if (path === currentPath) {
        foundPath = true
        const { key, accessorKeyName, isLeaf, child } = _map[path]

        if (isLeaf) {
          console.log(`[remerge]: Executing action ${currentPath}`)
          return child(newState, action)

        } else if (accessorKeyName) {
          console.log(`[remerge]: Navigating collection at ${currentPath}`)
          const smallerMap = child
          let smallerState

          if (isMap(newState[key])) {
            smallerState = newState[key].get(action[accessorKeyName])
          } else {
            smallerState = newState[key][action[accessorKeyName]]
          }

          const smallerAction = {
            ...action,
            type: action.type.split('.').splice(1).join(".")
          }
          const newSmallerState = _process(smallerMap, smallerState, smallerAction)

          let collection = _.clone(newState[key])

          if (isMap(newState[key])) {
            collection.set(action[accessorKeyName], newSmallerState)
          } else {
            collection[action[accessorKeyName]] = newSmallerState
          }

          newState[key] = collection

        } else {
          console.log(`[remerge]: Navigating ${currentPath}`)
          const smallerMap = child
          const smallerState = newState[key]
          const smallerAction = {
            ...action,
            type: action.type.split('.').splice(1).join(".")
          }
          const newSmallerState = _process(smallerMap, smallerState, smallerAction)
          newState[key] = newSmallerState

        }
      }
    }

    if (!foundPath) {
      console.log(`[remerge]: Could not find path ${currentPath} in state tree!`)
    }

    return newState
  }

  const initialState = _initial(map)
  const computedMap = _preprocess(map)

  return (state, action) => {
    if (state === undefined) {
      return initialState
    }

    return _process(computedMap, state, action)
  }
}

export default merge
