/**
 * Reducer that inserts a value to an array
 * @param  {any}    action.data        The element to be added
 * @param  {number} action.insertIndex The index to be inserted
 */
export const arrayInsertReducer = (
  state = [],
  action
) => {
  const index = action.insertIndex == undefined ? state.length : action.insertIndex
  return [
  ...state.slice(0, index),
  action.data,
  ...state.slice(index),
  ]
}

/**
 * Reducer that removes an element from an array
 * @param  {number} action.deleteIndex The index to be removed
 */
export const arrayDeleteReducer = (
  state,
  action
) => {
  const index = action.deleteIndex
  return [
    ...state.slice(0, index),
    ...state.slice(index + 1),
  ]
}
