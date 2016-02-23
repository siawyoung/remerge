# Remerge

State simplified.

## Getting started

```
npm install remerge --save
```

Remerge exposes a single top-level `merge` function, which takes an object that specifies the shape and behavior of your state tree using a familiar syntax, and returns a pure function that takes your existing state tree object as its first argument, and a state mutation action as its second argument, and returns a deep copy of the mutated state tree object.

```js
import merge from 'remerge'
import { addArrayReducer, deleteArrayReducer } from 'remerge/lib/arrayReducers'
import { updateReducer } from 'remerge/lib/updateReducers'

const mainReducer = merge({
  "items": {
    "add": addArrayReducer,
    "delete": deleteArrayReducer
  },
  "items[itemId]": {
    "update": updateReducer
  }
})
```

## State Mutation

Remerge expects state tree mutation actions to consist of at least a `type` key that determines the path that the action takes as it navigates through the state tree, as well as any other accessor keys that you've defined in the remerge reducer schema (in this case `itemId`).

As an example, an action that adds an item to the top-level `items` array in the state tree:

```js
const addItemAction = {
  type  : 'items.add',
  data: {
    name: 'item1'
  }
}

const stateBefore = {
  items: []
}

const stateAfter = {
  items: [ {name: 'item1'} ]
}

assertDeepEqual(mainReducer(stateBefore, addItemAction), stateAfter) // true
```

## Convenience Reducers

Remerge ships with some default reducers to manipulate common structures such as arrays and plain objects. Support for more modern structures such as maps are also expected to come soon.

To use these default reducers, simply import them from the `lib` directory:

A exhaustive list of default reducers that ship with Remerge include:

```js
import { addArrayReducer, deleteArrayReducer } from 'remerge/lib/arrayReducers'
import { addObjectReducer, deleteObjectReducer } from 'remerge/lib/objectReducers'
import { updateReducer } from 'remerge/lib/updateReducers'
```

### arrayReducers

#### addArrayReducer

`addArrayReducer` is used to append an object to the state, which is expected to be an array. `addArrayReducer` expects the object to be appended to be indicated with the `data` key:

```js
const addItemAction = {
  type: 'items.add',
  data: {
    name: 'model'
  }
}
```

#### deleteArrayReducer

`deleteArrayReducer` is used to remove an object by index from the state, which is expeced to be an array. `deleteArrayReducer` expects the index of the object to be indicated with the `deleteId` key:


```js
const deleteItemAction = {
  type: 'items.delete',
  deleteId: 1
}
```

### objectReducers

#### addObjectReducer

`addArrayReducer` is used to add a key-value pair to the state, which is expected to be an object. `addArrayReducer` expects the key to be indicated with the `addId` key, and the value to be indicated with the `data` key:

```js
const addItemAction = {
  type: 'items.add',
  addId: 'apple',
  data: { name: 'a yummy apple' }
}
```

If there is an existing key in the object, it is overwritten.

#### deleteObjectReducer

`deleteArrayReducer` is used to remove a key-value pair from the state, which is expected to be an object. `deleteArrayReducer` expects the key to be indicated with the `deleteId` key:

```js
const deleteItemAction = {
  type: 'models.delete',
  deleteId: 'apple'
}
```

### updateReducers

#### updateReducer

`updateReducer` is used to update the state, which is expected to be an array or an object. `updateReducer` expects the updated object to be indicated with the `data` key:

```js
const updateItemAction = {
  type: 'items[].update',
  itemId: 'apple',
  data: { name: 'a yummier apple' }
}
```

## Contributing

### Tests

Remerge includes a fairly comprehensive test suite that also doubles as documentation. Run it with `npm test`.