
import _ from 'lodash'

export const addObjectReducer = (
  state,
  action
) => {
  const newState = _.cloneDeep(state)
  newState[action.addId] = action.data
  return newState
}

export const deleteObjectReducer = (
  state,
  action
) => {
  const newState = _.cloneDeep(state)
  delete newState[action.deleteId]
  return newState
}
