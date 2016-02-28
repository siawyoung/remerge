/**
 * Reducer that inserts a value to an object
 * @param  {any}    action.data      The element to be added
 * @param  {string} action.insertKey The key to use
 */
export const objectInsertReducer = (
  state = {},
  action
) => {
  return {
    ...state,
    [`${action.insertKey}`]: action.data
  }
}

/**
 * Reducer that removes a value from an object
 * @param  {string} action.deleteKey The key to use
 */
export const objectDeleteReducer = (
  state,
  action
) => {
  let newState = {...state}
  delete newState[action.deleteKey]
  return newState
}
