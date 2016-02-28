
import _ from 'lodash'

export const mapInsertReducer = (
  state = new Map(),
  action
) => {
  const newState = _.clone(state)
  newState.set(action.insertKey, action.data)
  return newState
}

export const mapDeleteReducer = (
  state,
  action
) => {
  const newState = _.clone(state)
  newState.delete(action.deleteKey)
  return newState
}
