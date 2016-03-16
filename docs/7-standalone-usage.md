# Standalone usage

>This section discusses how Remerge can be used as a standalone script.

Remerge is also distributed as a standalone script, which exposes a global `merge` function.

Remerge's built-in reducers are distributed in another script, which exposes a global `reducers` object whose properties are the reducers.

These scripts can be found in the [dist](../dist) folder.

Usage of the script is mostly the same, except that the reducers are namespaced under `reducers`:

```html
<script src="merge.js"></script>
<script src="reducers.js"></script>

<script>
  var reducer = merge({
    todos: {
      _: [],
      add: reducers.arrayInsertReducer,
      delete: reducers.arrayDeleteReducer
    }
  })
</script>
```

A full example can be found in [examples/standalone](../examples/standalone).