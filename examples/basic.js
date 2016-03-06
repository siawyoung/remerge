import merge from '../src'
import { printTree } from '../src/utils'

const todoAddReducer = (
  state = [],
  action
) => {
  return state.concat(action.todo)
}

const todoDeleteReducer = (
  state = [],
) => {
  state.pop()
  return state
}

const reducer = merge({
  todos: {
    _: [],
    add: todoAddReducer,
    delete: todoDeleteReducer
  }
}, true)

const initialStateTree = reducer()
printTree(initialStateTree)

const addTodo = {
  type: 'todos.add',
  todo: {
    title: 'Buy milk'
  }
}

const state1 = reducer(initialStateTree, addTodo)
printTree(state1)

const deleteTodo = {
  type: 'todos.delete'
}

const state2 = reducer(state1, deleteTodo)
printTree(state2)
