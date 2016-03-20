/**
 * The top-level merge function
 *
 * @param {object} remerge map
 * @return {function} reducer function
 *
 */

import isFunction from 'lodash.isfunction'
import clone from 'lodash.clone'
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
const legacyRegex     = /^__(.+)__$/
const legacyKey      = '$legacy'

const merge = (schema, debugMode = false) => {

  const _getAccessorKey = (key) => {
    // this regex tests if the key is of the form $abcd1234
    const captureAccessor = collectionRegex.exec(key)
    if (captureAccessor) {
      return captureAccessor[1]
    } else {
      return null
    }
  }

  const _getLegacyKey = (key) => {
    // this regex tests if the key is of the form __abcd__
    const captureLegacy = legacyRegex.exec(key)
    if (captureLegacy) {
      return captureLegacy[1]
    } else {
      return null
    }
  }

  const _preprocess = (schema) => {
    const map = new Map()
    function _dive(subSchema, prefix = '', path = [], params = []) {
      for (const key in subSchema) {
        if (key === '_') { continue }
        const child = subSchema[key]
        const type = `${prefix}${key}`

        if (isFunction(child)) {
          const legacyKey = _getLegacyKey(key)
          if (legacyKey) {
            const node = {
              reducer: child,
              path,
            }

            const nodes = map.get(legacyKey) || []
            map.set(legacyKey, [...nodes, node])
          } else {
            const node = {
              reducer: child,
              path,
              params,
            }

            const nodes = map.get(type) || []
            map.set(type, [...nodes, node])
          }
        } else {
          const param = _getAccessorKey(key)
          if (param) {
            _dive(child, prefix, [...path, key], [...params, param])
          } else {
            _dive(child, `${type}.`, [...path, key], params)
          }
        }
      }
    }

    _dive(schema)
    return map
  }

  const _initial = (map) => {
    if (!map) {
      return undefined
    } else if (isFunction(map)) {
      return undefined
    }

    let newMap = map['_'] || {}
    let changed = map['_'] !== undefined

    for (const key in map) {
      if (key === '_') { continue }
      if (_getLegacyKey(key)) {
        newMap[_getLegacyKey(key)] = map[key](undefined, {})
        changed = true
      }

      // to avoid adding keys to collections
      if (!_getAccessorKey(key)) {
        let result = _initial(map[key])
        if (result !== undefined) {
          newMap[key] = result
          changed = true
        }
      }
    }

    return changed ? newMap : null
  }

  const _reduce = (state, action, node) => {
    let newState = clone(state)
    let current = newState
    let parent = null

    for (let key of node.path) {
      let accessorKey = _getAccessorKey(key)
      if (accessorKey) {
        parent = current
        current = clone(getCollectionElement(current, action[accessorKey]))
        setCollectionElement(parent, action[accessorKey], current)
      } else {
        parent = current
        current = clone(getCollectionElement(current, key))
        setCollectionElement(parent, key, current)
      }
    }

    current = node.reducer(current, action)

    const lastKey = node.path[node.path.length-1]
    let accessorKey = _getAccessorKey(lastKey)
    if (accessorKey) {
      setCollectionElement(parent, action[accessorKey], current)
    } else {
      setCollectionElement(parent, lastKey, current)
    }
    return newState
  }

  const initialState = _initial(schema)
  const map = _preprocess(schema)
  console.log(map)

  return (state, action) => {
    if (action === undefined) {
      consoleMessage(`Setting up initial state tree`, debugMode)
    } else if (!action.type) {
      consoleError(`Action is missing type`, debugMode)
    }

    if (state === undefined) {
      return initialState
    }

    let newState = state
    const nodes = map.get(action.type)
    if (nodes) {
      for (let node of nodes) {
        const valid = node.params.map((p) => action[p]).reduce((prev, curr) => (prev && curr !== undefined), true)
        if (valid) {
          newState = _reduce(newState, action, node)
          break
        }
      }
    } else {
      const legacyNodes = map.get(legacyKey)
      for (let node of legacyNodes) {
        newState = _reduce(newState, action, node)
      }
    }
    // consoleGrouped(`Received action with type: ${action.type}`, debugMode)
    // const newState = _process(computedMap, state, action)
    // consoleEndGrouped(null, debugMode)

    return newState
  }
}

export default merge
