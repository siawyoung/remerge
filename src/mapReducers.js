
import clone from 'lodash.clone'

export const mapInsertReducer = (
  state = new Map(),
  action
) => {
  const newState = clone(state)
  newState.set(action.insertKey, action.data)
  return newState
}

export const mapDeleteReducer = (
  state,
  action
) => {
  const newState = clone(state)
  newState.delete(action.deleteKey)
  return newState
}
