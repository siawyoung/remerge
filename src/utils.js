
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

const colors = {
    black  : "font-weight : bold; color : #000000;",
    gray   : "font-weight : bold; color : #1B2B34;",
    red    : "font-weight : bold; color : #EC5f67;",
    orange : "font-weight : bold; color : #F99157;",
    yellow : "font-weight : bold; color : #FAC863;",
    green  : "font-weight : bold; color : #99C794;",
    teal   : "font-weight : bold; color : #5FB3B3;",
    blue   : "font-weight : bold; color : #6699CC;",
    purple : "font-weight : bold; color : #C594C5;",
    brown  : "font-weight : bold; color : #AB7967;"
}

export function consoleMessage(msg, debugMode) {
  if (debugMode) {
    console.log(`%c[remerge]%c ${msg}`, colors.black, '')
  }
}

export function consoleWarning(msg, debugMode) {
  if (debugMode) {
    console.log(`%c[remerge]%c ${msg}`, colors.yellow, '')
  }
}

export function consoleSuccess(msg, debugMode) {
  if (debugMode) {
    console.log(`%c[remerge]%c ${msg}`, colors.green, '')
  }
}

export function consoleError(msg, debugMode) {
  if (debugMode) {
    console.error(`%c[remerge]%c ${msg}`, colors.red, '')
  }
}
