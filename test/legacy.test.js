
/*
*
* Test suite for legacy reducer support
*
*/

import test from 'ava'
import deepFreeze from 'deep-freeze'

import merge from '../src'
import { arrayInsertReducer, arrayDeleteReducer } from '../src/arrayReducers'

const legacyReducer = (
  state = "initial state",
  action
) => {
  if (action.type === "LEGACY_ACTION_TYPE_1") {
    return "legacy state"
  } else {
    return state
  }
}

const reducer = merge({
  _: {
    someTopLevelInitialState: 1
  },
  models: {
    _: [],
    add: arrayInsertReducer,
    delete: arrayDeleteReducer,
  },
  __legacy__: legacyReducer
}, true)

test("Initial state for legacy reducer", (t) => {

  const stateAfter = {
    someTopLevelInitialState: 1,
    models: [],
    legacy: "initial state"
  }

  deepFreeze(stateAfter)

  t.same(reducer(), stateAfter)

})

// import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'

// test.only("Routing test", (t) => {
//   const action = {
//     type: "@@router/LOCATION_CHANGE",
//     payload: {
//       pathname: "/fo",
//       search: "",
//       hash: "",
//       state: null,
//       action: "POP",
//       key: "k12jsad"
//     },
//     query: {},
//     $searhBase: {
//       search: "",
//       searchBase: ""
//     }
//   }

//   const stateBefore = {
//     // models: [],
//     routing: {}
//   }

//   const stateAfter = {
//     // models: [],
//     routing: {
//       locationBeforeTransitions: {
//         pathname: '/fo',
//         search: '',
//         hash: '',
//         state: null,
//         action: 'POP',
//         key: 'k12jsad'
//       }
//     },
//     legacy: 'initial state'
//   }

//   deepFreeze(action)
//   deepFreeze(stateBefore)
//   deepFreeze(stateAfter)

//   let testReducer = combineReducers({
//     routing: routerReducer
//   })

//   // console.log('testReducer', testReducer(stateBefore, action))
//   console.log('reducer', reducer(stateBefore, action))
//   console.log('after', stateAfter)
//   t.same(reducer(stateBefore, action), stateAfter)
// })

test("Legacy test", (t) => {

  const action = {
    type: "LEGACY_ACTION_TYPE_1"
  }

  const stateBefore = {
    models: [],
    legacy: undefined
  }

  const stateAfter = {
    models: [],
    legacy: "legacy state"
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(reducer(stateBefore, action), stateAfter)

})

