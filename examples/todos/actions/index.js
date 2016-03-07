let nextTodoId = 0

export const addTodo = (text) => {
  return {
    type: 'todos.add',
    data: {
      id: nextTodoId++,
      text,
      completed: false
    }
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'visibilityFilter.set',
    data: filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'todos.toggle',
    id
  }
}
