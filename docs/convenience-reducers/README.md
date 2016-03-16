# Convenience Reducers

A exhaustive list of reducers that ship with Remerge include:

```js
import { arrayInsertReducer, arrayDeleteReducer } from 'remerge/lib/arrayReducers'
import { objectInsertReducer, objectDeleteReducer, objectUpdateReducer } from 'remerge/lib/objectReducers'
import { mapInsertReducer, mapDeleteReducer } from 'remerge/lib/mapReducers'
```

This page serves as documentation for all of these reducers.

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

#### objectUpdateReducer

`objectUpdateReducer` is used to update the state, which is expected to be an object. `objectUpdateReducer` expects the updated object to be indicated with the `data` key:

```js
const updateItemAction = {
  type: 'items.update',
  data: { name: 'a yummier apple' }
}
```

### Map Reducers

Map reducers - `mapInsertReducer` and `mapDeleteReducer` - are used exactly the same as their object reducer counterparts.