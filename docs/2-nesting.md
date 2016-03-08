# Part 2 - Nesting

>This section showcases the concept of nesting. The example code here can be found in [examples/convenience-reducers](../examples/convenience-reducers.js)

From this part onwards, we will consider the following state tree, which represents `users`. Each of these `users` may be associated with some `items`. When populated, the state tree might look something like this when populated with data:

```js
const stateTree = {
  users: {
    john: {
      name: 'John',
      items: [
        { itemName: 'Apple' },
        { itemName: 'Orange' }
      ]
    },
    mary: {
      name: 'Mary',
      items: [
        { itemName: 'Pear' },
        { itemName: 'Mango' }
      ]
    }
  }
}
```

We can represent the structure of such a state tree, as well as the mutations that are allowed on it, with the following Remerge schema:

```js
import merge from 'remerge'
import { arrayInsertReducer, arrayDeleteReducer } from 'remerge/lib/arrayReducers'
import { objectInsertReducer, objectDeleteReducer } from 'remerge/lib/objectReducers'
import { objectUpdateReducer } from 'remerge/lib/updateReducers'

const reducer = merge({
  users: {
    _: {},
    add: objectInsertReducer,
    delete: objectDeleteReducer,
    $userId: {
      update: objectUpdateReducer,
      items: {
        add: arrayInsertReducer,
        delete: arrayDeleteReducer,
        $itemIndex: {
          update: objectUpdateReducer
        }
      }
    }
  }
})
```

As you can see, the update mutation, as well as the `items` key, are found under the `$userId` key. This `$userId` key represents operations that involve a single element in a collection<sup>1</sup>, rather than on the entire collection.

The part after the `$` symbol, `userId` (and `itemIndex`), will be used to access individual elements in the collection. Note that this is an arbitrary choice - as long as the action provides the correct key when it is needed, it is fine.

Some example action types that involve nested elements would look like:

```js
let action1 = {
  type: 'users.update',
  userId: 'john'
}
```

or

```js
let action2 = {
  type: 'users.items.update',
  userId: 'mary',
  itemIndex: 0
}
```

Continue to [Part 3 - Convenience Reducers](./3-convenience-reducers.md).

1. A collection here refers to data structures like arrays, objects, or maps that can contain multiple elements and are accessable by key.