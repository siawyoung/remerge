# Working with third party reducers

>This section discusses how Remerge can be used in conjunction with third party libraries such as React Router Redux and Redux Form, which expose reducers to hook into Redux state.

In order to allow Remerge to work with third party libraries, it includes a way to handle action types that do not follow Remerge's navigational pattern. For example, React Router Redux emits an action with the type `@@router/LOCATION_CHANGE`.

In a vanilla Redux app, one would include third party reducers like this:

```js
import reducers from './reducers'
import { routerReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
  form: formReducer
})
```

In Remerge, third party reducers are indicated with the special `__key__` syntax, like so:


```js
import { routerReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

const reducer = merge({
  __routing__: routerReducer,
  __form__: formReducer,
  users: {
    // rest of Remerge schema
  }
})
```

Whatever is between the leading and trailing underscores will be the key that the reducer is assigned to.

Continue to [Part 7 - Standalone usage](./7-standalone-usage.md).