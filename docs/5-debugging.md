# Debugging Remerge

For debugging purposes, the `merge` function also accepts a second optional argument. If set to `true`, the reducer will log out the path that actions take through the state tree. For example:

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
        $itemId: {
          update: objectUpdateReducer
        }
      }
    }
  }
}, true)
```

The logs will look like this:

```
[remerge] Setting up initial state tree

[remerge] Received action with type: users.add
[remerge] Navigating element node: users
[remerge] Executing action at leaf node: add

[remerge] Received action with type: users.items.add
[remerge] Navigating collection node: users
[remerge] Navigating element node: items
[remerge] Executing action at leaf node: add

[remerge] Received action with type: users.update
[remerge] Navigating collection node: users
[remerge] Executing action at leaf node: update

[remerge] Received action with type: users.items.update
[remerge] Navigating collection node: users
[remerge] Navigating collection node: items
[remerge] Executing action at leaf node: update

[remerge] Received action with type: users.delete
[remerge] Navigating element node: users
[remerge] Executing action at leaf node: delete
```