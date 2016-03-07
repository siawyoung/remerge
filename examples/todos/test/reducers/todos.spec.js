import expect from 'expect'
import todoApp from '../../reducers'
import * as actions from '../../actions'

describe('todoApp reducer', () => {

  it("should handle initial state", () => {
    expect(
      todoApp())
    .toEqual({
      todos: [],
      "visibilityFilter": "SHOW_ALL"
    })
  })

  it("should handle todos.add", () => {
    expect(
      todoApp(
        todoApp(),
        actions.addTodo('Use Redux')
      ))
    .toEqual({
      todos: [
        {
          id: 1,
          text: 'Use Redux',
          completed: false
        }
      ],
      "visibilityFilter": "SHOW_ALL"
    })
  })

  it("should handle todos.toggle", () => {
    const initialState = todoApp(todoApp(), actions.addTodo('Use Redux'))
    expect(todoApp(
      initialState,
      actions.toggleTodo(0)
      ))
    .toEqual({
      todos: [
        {
          id: 2,
          text: 'Use Redux',
          completed: true
        }
      ],
      "visibilityFilter": "SHOW_ALL"
    })
  })

  it("should handle visibilityFilter.set", () => {
    expect(
      todoApp(
        todoApp(),
        actions.setVisibilityFilter('active')
      ))
    .toEqual({
      todos: [],
      "visibilityFilter": "active"
    })
  })

})
