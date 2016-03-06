
import colors from 'colors'
import util from 'util'

export function isMap(obj) {
  return Object.getPrototypeOf(obj) === Map.prototype
  || obj.constructor.name === 'Map' // Ava has a map shim which doesn't play nicely
}

export function debug(map, state, action) {
  console.log('----------------------')
  console.log('Running process')
  console.log('current map')
  console.log(map)
  console.log('current state')
  console.log(state)
  console.log('current action')
  console.log(action)
  console.log('----------------------')
}

export function printTree(obj) {
  console.log(util.inspect(obj, false, null))
}

export function getCollectionElement(collection, key) {
  if (isMap(collection)) {
    return collection.get(key)
  } else {
    return collection[key]
  }
}

export function setCollectionElement(collection, key, value) {
  if (isMap(collection)) {
    collection.set(key, value)
  } else {
    collection[key] = value
  }
}

export function consoleMessage(msg, debugMode) {
  if (debugMode) {
    console.log('[remerge]'.cyan + ' ' + msg)
  }
}

export function consoleWarning(msg, debugMode) {
  if (debugMode) {
    console.log('[remerge]'.yellow + ' ' + msg)
  }
}

export function consoleSuccess(msg, debugMode) {
  if (debugMode) {
    console.log('[remerge]'.green + ' ' + msg)
  }
}

export function consoleError(msg, debugMode) {
  if (debugMode) {
    console.error('[remerge]'.red + ' ' + msg)
  }
}
