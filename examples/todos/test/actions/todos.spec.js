import expect from 'expect'
import * as actions from '../../actions'

describe('todo actions', () => {
  it('addTodo should create correct Remerge action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: 'todos.add',
      data: {
        id: 0,
        text: 'Use Redux',
        completed: false
      }
    })
  })

  it('setVisibilityFilter should create correct Remerge action', () => {
    expect(actions.setVisibilityFilter('active')).toEqual({
      type: 'visibilityFilter.set',
      data: 'active'
    })
  })

  it('toogleTodo should create correct Remerge action', () => {
    expect(actions.toggleTodo(1)).toEqual({
      type: 'todos.toggle',
      id: 1
    })
  })
})
