/**
 * The top-level merge function
 *
 * @param {object} remerge map
 * @return {function} reducer function
 *
 */

import _ from 'lodash'

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

  const _process = (_map, state, action) => {

    const currentPath = action.type.split('.', 1)[0]

    const newState = _.cloneDeep(state)

    for (const path of Object.keys(_map)) {
      if (path === currentPath) {
        const { key, accessorKeyName, isLeaf, child } = _map[path]

        if (isLeaf) {

          return child(newState, action)

        } else {

          const smallerMap = child
          const smallerState = accessorKeyName ? newState[key][action[accessorKeyName]] : newState[key]
          const smallerAction = {
            ...action,
            type: action.type.split('.').splice(1).join(".")
          }
          const newSmallerState = _process(smallerMap, smallerState, smallerAction)

          if (accessorKeyName) {
            newState[key][action[accessorKeyName]] = newSmallerState
          } else {
            newState[key] = newSmallerState
          }
        }
      }
    }

    return newState
  }

  const computedMap = _preprocess(map)

  return (state, action) => {
    return _process(computedMap, state, action)
  }
}

export default merge
