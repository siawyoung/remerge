# Remerge

State simplified.

The sole purpose of Remerge is to provide a consistent interface for defining and manipulating state. It's extremely easy and intuitive to use once you get the hang of it. While there is a slight learning curve, hopefully our examples will ease the learning process.

Although Remerge was built for use with Redux, it can also be used standalone. (full example apps coming soon!) It is completely framework-agnostic.

## Quick links

Part 1 - Basics (this)

[Part 2 - Nesting](docs/2-nesting.md)

[Part 3 - Convenience reducers](docs/3-convenience-reducers.md)

[Part 4 - Initial state](docs/4-initial-state.md)

[Part 5 - Debugging](docs/5-debugging.md)

#### Examples

[Redux TodoMVC, refactored with Remerge](examples/todos)

## Getting started

**Install**

```
npm install remerge --save
```

>This example can be found in [`examples/basic`](examples/basic.js).

**Define a Remerge schema**

```js
import merge from 'remerge'

const reducer = merge({
  todos: {
    _: [],
    add: todoAddReducer,
    delete: todoDeleteReducer
  }
})
```

**Define reducers**

```js
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
```

**Initialize the state tree**

```js
const initialState = reducer()
```

```js
// initialState
{
  todos: []
}
```

**Mutate the state tree with actions**

```js
const addTodo = {
  type: 'todos.add',
  todo: {
    title: 'Buy milk'
  }
}

const state1 = reducer(initialState, addTodo)

const deleteTodo = {
  type: 'todos.delete'
}

const state2 = reducer(state1, deleteTodo)
```

```js
// state1
{ todos:
  [
    { title: 'Buy milk' }
  ]
}

// state2
{
  todos: []
}
```

**Tada! You now have a live and working state tree.**

These steps are explained in more detail below.

### Remerge Schema

Remerge exposes a single top-level `merge` function, which takes a single object as an argument.

```js
const reducer = merge({
  todos: {
    _: [],
    add: todoAddReducer,
    delete: todoDeleteReducer
  }
})
```

This object, also called a **schema**, is a Remerge convention. It specifies the shape and behavior of your state tree using a familiar and intuitive syntax.

With this schema object, `merge` returns a pure function that serves two purposes: **setting up the initial state tree**, and **mutating it**.

### Initial state

The initial state of the state tree can be constructed by using the special `_` key. In this example, the initial state of `todos` is an empty array.

Now, we can construct the initial state tree by calling `reducer` with no arguments.

```js
const initialState = reducer()
```

### Mutation Actions

In order to mutate/populate the state tree, we use actions. Actions in Remerge are plain objects that represent a mutation to the state tree. They are heavily inspired from Redux actions.

```js
const addTodo = {
  type: 'todos.add',
  todo: {
    title: 'Buy milk'
  }
}

const state1 = reducer(initialState, addTodo)
```

The function returned by `merge` takes a state tree as the first argument, the action object as the second argument, and returns the new mutated state tree.

Another convention of Remerge is that it expects actions to consist of a `type` key. The `type` key represents the path that the action takes as it navigates through the state tree.

### Convenience Reducers

Remerge ships with some generic reducers to manipulate commonly-used collections such as arrays, plain objects, and Maps. We recommend using them extensively in your schema, only falling back your own custom reducers for more complex situations.

To use them, simply import them from the `lib` directory. Below is the same example using `arrayInsertReducer` and `arrayDeleteReducer`:

```js
import { arrayInsertReducer, arrayDeleteReducer } from 'remerge/lib/arrayReducers'

const reducer = merge({
  todos: {
    _: [],
    add: arrayInsertReducer,
    delete: arrayDeleteReducer
  }
})
```

For in-depth documentation and an exhausive list of reducers, take a look at [`docs/convenience-reducers/README.md`](docs/convenience-reducers/README.md).

## Documentation

Continue the second part of this README, starting in [Part 2 - Nesting](docs/2-nesting.md), to get a full low-down on how to use Remerge effectively!

Then take a look at [`examples/convenience-reducers`](examples/convenience-reducers.js) for a more extensive example on using Remerge.

Example apps with ~~Redux integration~~ and generic JavaScript apps are coming soon!

The `examples` folder now include [an example of using Remerge in a Redux app](examples/todos). The app itself was taken from [Redux's examples](https://github.com/reactjs/redux/tree/master/examples/todos), and refactored to use Remerge. The original tests have been rewritten to test Remerge's functionality as well, so if you're thinking of writing tests in your own app, this is a good starting point.

## Tests

Remerge includes a fairly comprehensive test suite that also doubles as documentation. Run it with `npm test`.

## License

MIT