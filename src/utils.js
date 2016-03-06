
import colors from 'colors'

export function isMap(obj) {
  return Object.getPrototypeOf(obj) === Map.prototype
  || obj.constructor.name === 'Map' // Ava has a map shim which doesn't play nicely
}

export function consoleMessage(msg, debugMode) {
  if (debugMode) {
    console.log('[remerge]'.cyan + ' ' + msg)
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