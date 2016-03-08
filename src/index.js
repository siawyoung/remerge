/**
 * The top-level merge function
 *
 * @param {object} remerge map
 * @return {function} reducer function
 *
 */

import _ from 'lodash'
import {
  isMap,
  getCollectionElement,
  setCollectionElement,
  consoleMessage,
  consoleError,
  consoleSuccess,
  consoleWarning,
  consoleGrouped,
  consoleEndGrouped,
} from './utils'

const collectionRegex = /^\$(.+)/

const merge = (map, debugMode = false) => {

  const _getAccessorKey = (key) => {
    // this regex tests if the key is of the form $abcd1234
    const captureAccessor = collectionRegex.exec(key)
    if (captureAccessor) {
      return captureAccessor[1]
    } else {
      return null
    }
  }

  const _preprocess = (map) => {
    const newMap = {}

    for (const key in map) {
      if (key === '_') { continue }
      if (newMap.$) {
        consoleWarning(`More than one collection accessor ${newMap.$.accessorKeyName}`)
        continue
      }

      const isFunction = _.isFunction(map[key])
      newMap[key.replace(_getAccessorKey(key), "")] = {
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
    let foundPath  = false

    for (const path of Object.keys(_map)) {
      if (path === currentPath) {
        foundPath = true
        const { accessorKeyName, isLeaf, child } = _map[path]

        if (isLeaf) {
          consoleSuccess(`Executing action at leaf node: ${currentPath}`, debugMode)
          return child(newState, action)

        } else {
          const collectionKeyName = child.$ && child.$.accessorKeyName
          const collectionKey = action && action[collectionKeyName]

          // child is a collection and we should enter because accessor key name is given
          if (collectionKeyName && collectionKey !== undefined) {
            consoleSuccess(`Navigating collection node: ${currentPath}`, debugMode)
            let newCollection = _.clone(getCollectionElement(newState, path))
            const smallerMap = child.$.child
            const smallerState = getCollectionElement(newCollection, collectionKey)
            const smallerAction = {
              ...action,
              type: action.type.split('.').splice(1).join(".")
            }

            const newSmallerState = _process(smallerMap, smallerState, smallerAction)
            setCollectionElement(newCollection, collectionKey, newSmallerState)
            setCollectionElement(newState, path, newCollection)
          } else {
            consoleSuccess(`Navigating element node: ${currentPath}`, debugMode)
            const smallerMap = child
            const smallerState = getCollectionElement(newState, path)
            const smallerAction = {
              ...action,
              type: action.type.split('.').splice(1).join(".")
            }
            const newSmallerState = _process(smallerMap, smallerState, smallerAction)
            setCollectionElement(newState, path, newSmallerState)
          }
        }
      }
    }

    if (!foundPath) {
      consoleError(`Could not find path: ${currentPath}`, debugMode)
    }

    return newState
  }

  const initialState = _initial(map)
  const computedMap = _preprocess(map)

  return (state, action) => {

    if (action === undefined) {
      consoleMessage(`Setting up initial state tree`, debugMode)
    } else if (!action.type) {
      consoleError(`Action is missing type`, debugMode)
    }

    if (state === undefined) {
      return initialState
    }

    consoleGrouped(`Received action with type: ${action.type}`, debugMode)
    const newState = _process(computedMap, state, action)
    consoleEndGrouped(null, debugMode)

    return newState
  }
}

export default merge
