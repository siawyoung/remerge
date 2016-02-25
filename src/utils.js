
export function isMap(obj) {
  return Object.getPrototypeOf(obj) === Map.prototype
  || obj.constructor.name === 'Map' // Ava has a map shim which doesn't play nicely
}
