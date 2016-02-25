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
import { arrayInsertReducer, arrayDeleteReducer } from 'remerge/lib/arrayReducers'
import { objectInsertReducer, objectDeleteReducer } from 'remerge/lib/objectReducers'
import { updateReducer } from 'remerge/lib/updateReducers'
```

### Array Reducers

#### Adding array elements

`arrayInsertReducer` is used to append an object to the state, which is expected to be an array. `arrayInsertReducer` expects the object to be appended to be indicated with the `data` key and optionally, the index `insertIndex`:

```js
const addItemAction = {
  type: 'items.add',
  insertIndex: 0,
  data: {
    name: 'model'
  }
}
```

#### Deleting array elements

`arrayDeleteReducer` is used to remove an object by index from the state, which is expeced to be an array. `arrayDeleteReducer` expects the index of the object to be indicated with the `deleteIndex` key:


```js
const deleteItemAction = {
  type: 'items.delete',
  deleteIndex: 1
}
```

### Object Reducers

#### Inserting object keys

`objectInsertReducer` is used to add a key-value pair to the state, which is expected to be an object. `objectInsertReducer` expects the key to be indicated with the `insertKey` key, and the value to be indicated with the `data` key:

```js
const addItemAction = {
  type: 'items.add',
  insertKey: 'apple',
  data: { name: 'a yummy apple' }
}
```

If there is an existing key in the object, it is overwritten.

#### Deleting object keys

`objectDeleteReducer` is used to remove a key-value pair from the state, which is expected to be an object. `objectDeleteReducer` expects the key to be indicated with the `deleteKey` key:

```js
const deleteItemAction = {
  type: 'models.delete',
  deleteKey: 'apple'
}
```

### Update Reducers

#### updateReducer

`updateReducer` is used to update the state, which is expected to be an array or an object. `updateReducer` expects the updated object to be indicated with the `data` key:

```js
const updateItemAction = {
  type: 'items[].update',
  data: { name: 'a yummier apple' }
}
```

## Contributing

### Tests

Remerge includes a fairly comprehensive test suite that also doubles as documentation. Run it with `npm test`.
