
import _ from 'lodash'

export const addArrayReducer = (
  state,
  action
) => {
  const newState = _.cloneDeep(state)
  newState.push(action.data)
  return newState
}

export const deleteArrayReducer = (
  state,
  action
) => {
  const newState = _.cloneDeep(state)
  newState.splice([action.deleteId], 1)
  return newState
}
