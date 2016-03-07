import merge from 'remerge'
import { arrayInsertReducer } from 'remerge/lib/arrayReducers'

const todoToggleReducer = (
  state,
  _action
) => ({
  ...state,
  completed: !state.completed
})

const updateVisibilityReducer = (
  _state,
  action
) => action.data

const todoApp = merge({
  todos: {
    _: [],
    add: arrayInsertReducer,
    $id: {
      toggle: todoToggleReducer
    }
  },
  visibilityFilter: {
    _: 'SHOW_ALL',
    set: updateVisibilityReducer
  }
})

export default todoApp