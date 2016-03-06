
import merge from '../src'
import { arrayInsertReducer, arrayDeleteReducer } from '../src/arrayReducers'
import { printTree } from '../src/utils'

const toggleModalReducer = (
  state,
  action
) => {
  state[action.modalName] = action.modalOpen
  return state
}

const reducer = merge({
  todos: {
    add: arrayInsertReducer,
    delete: arrayDeleteReducer
  },
  ui: {
    modals: {
      addTodo: {
        _: false
      },
      deleteTodo: {
        _: false
      },
      toggle: toggleModalReducer
    }
  }
}, true)

const initialStateTree = reducer()
printTree(initialStateTree)

const openAddTodoModal = {
  type: 'ui.modals.toggle',
  modalName: 'addTodo',
  modalOpen: true
}

const state1 = reducer(initialStateTree, openAddTodoModal)
printTree(state1)
