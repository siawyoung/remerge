# Part 4 - Initial State

>This section discusses the finer points about setting up initial state in Remerge. The example code here can be found in [examples/initial-state](../examples/initial-state.js)

For the purposes of this discussion, let's consider such a schema. In addition to holding the state for an array of todos, the state tree also holds the state for two modals on the frontend - one for adding a todo, and another for removing a todo. A value of `true` indicates that the modal is visible.

```js
const toggleModalReducer = (
  state,
  action
) => {
  state[action.modalName] = action.modalOpen
  return state
}

const reducer = merge({
  todos: {
    _: [],
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
})
```

In addition to `todos`, we've also defined the initial state for `addTodo` and `deleteTodo`. The first reason we do this is to allow the views to (correctly) hide the modal when it reads a value of `false` from the state tree for its initial render. The second reason we need to do this is because this allows `toggleModalReducer` to access the keys when it sets them.

```js
const initialStateTree = reducer()
const openAddTodoModal = {
  type: 'ui.modals.toggle',
  modalName: 'addTodo',
  modalOpen: true
}

const state1 = reducer(initialStateTree, openAddTodoModal)
```

```js
// initialStateTree
{
  todos: [],
  ui: {
    modals: {
      addTodo: false,
      deleteTodo: false
    }
  }
}

// state1
{
  todos: [],
  ui: {
    modals: {
      addTodo: true,
      deleteTodo: false
    }
  }
}
```

### Alternative Pattern

The schema could also have been written like this:

```js
const reducer = merge({
  todos: {
    _: [],
    add: arrayInsertReducer,
    delete: arrayDeleteReducer
  },
  ui: {
    modals: {
      _: {
        addTodo: false,
        deleteTodo: false
      },
      toggle: toggleModalReducer
    }
  }
})
```

This is a matter of taste.

### Missing initial state

If you omit the initial state, Remerge will default to a value of `null`:

```js
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
})
```

will result in a initial state tree of:

```js
{
  todos: null,
  ui: {
    modals: {
      addTodo: false,
      deleteTodo: false
    }
  }
}
```

This may or may not affect the operation of the state tree, depending on how your app handles `null` values, and how your reducers handle `null` values.

Continue to [Part 5 - Debugging](./5-debugging.md).