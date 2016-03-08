# Part 3 - Convenience Reducers

>This section showcases the usage of Remerge's convenience reducers.

Regarding mutations that are allowed on the state tree, we've defined the schema so that we can add, delete, or update users, and also add, delete or update items from a user:

```js
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

Let's initialize the state tree:

```js
const initialStateTree = reducer()
```

```js
// initialStateTree
{
  users: {}
}
```

Then, add a user:

```js
const addUserAction = {
  type: 'users.add',
  insertKey: 'john',
  data: {
    name: 'John'
  }
}

const state1 = reducer(initialStateTree, addUserAction)
```

Now, our state tree looks like this:

```js
// state1
{
  users: {
    john: {
      name: 'John'
    }
  }
}
```

Let's give John an apple. If the path involves accessing elements in a collection, then those collection accessor keys need to be defined as well. Therefore, we now need to provide `userId`, since we are accessing John's items:

```js
const addAppleAction = {
  type: 'users.items.add',
  userId: 'john',
  data: {
    itemName: 'apple'
  }
}

const state2 = reducer(state1, addAppleAction)
```

```js
// state2
{
  users: {
    john: {
      name: 'John',
      items: [ { itemName: 'apple' } ]
    }
  }
}
```

Now let's change John's name. We still need to provide `userId`, since the update mutation works on a single element in a collection:

```js
const changeUserNameAction = {
  type: 'users.update',
  userId: 'john',
  data: {
    name: 'Jim'
  }
}

const state3 = reducer(state2, changeUserNameAction)
```

```js
// state3
{
  users: {
    john: {
      name: 'Jim',
      items: [ { itemName: 'apple' } ]
    }
  }
}
```

As a trickier example, let's change the apple that John has to an orange. Now, we need to provide `itemId` as well as `userId`. Notice that since `items` is represented by an array, `itemId` is a numerical index:

```js
const changeItemNameAction = {
  type: 'users.items.update',
  userId: 'john',
  itemId: 0,
  data: {
    itemName: 'orange'
  }
}

const state4 = reducer(state3, changeItemNameAction)
```

```js
// state4
{
  users: {
    john: {
      name: 'Jim',
      items: [ { itemName: 'orange' } ]
    }
  }
}
```

Finally, let's remove Jim from our state tree. Notice that we don't need to provide `userId`, since the delete mutation works on the entire collection.

```js
const deleteUserAction = {
  type: 'users.delete',
  deleteKey: 'john'
}

const state5 = reducer(state4, deleteUserAction)
```

```js
// state5
{
  users: {}
}
```

Continue to [Part 4 - Initial State](./4-initial-state.md).