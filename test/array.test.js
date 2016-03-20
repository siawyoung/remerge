
/*
*
* Test suite for array-based state
*
*/

import test from 'ava'
import deepFreeze from 'deep-freeze'

import merge from '../src'
import { arrayInsertReducer, arrayDeleteReducer } from '../src/arrayReducers'
import { objectUpdateReducer } from '../src/objectReducers'

const arrayReducer = merge({
  models: {
    _: [],
    add: arrayInsertReducer,
    delete: arrayDeleteReducer,
    $modelId: {
      update: objectUpdateReducer,
      fields: {
        add: arrayInsertReducer,
        delete: arrayDeleteReducer,
        $fieldId: {
          update: objectUpdateReducer
        }
      }
    }
  }
}, true)


test('Initial state', (t) => {
  const stateAfter = {
    models: []
  }

  deepFreeze(stateAfter)
  t.same(arrayReducer(), stateAfter)
})

test('Add model', (t) => {
  const action = {
    type  : 'models.add',
    data: {
      name: 'model'
    }
  }

  const stateBefore = {
    models: []
  }
  const stateAfter = {
    models: [ {name: 'model'} ]
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(arrayReducer(stateBefore, action), stateAfter)
})

test('Insert model', (t) => {
  const action = {
    type  : 'models.add',
    data: {
      name: 'model1'
    },
    insertIndex: 0,
  }

  const stateBefore = {
    models: [ {name: 'model2'} ]
  }
  const stateAfter = {
    models: [ {name: 'model1'}, {name: 'model2'} ]
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(arrayReducer(stateBefore, action), stateAfter)
})


test('Update model', (t) => {
  const action = {
    type  : 'models.update',
    modelId: 0,
    data: {
      name: 'updatedModel'
    }
  }

  const stateBefore = {
    models: [ { name: 'oldModel' } ]
  }
  const stateAfter = {
    models: [ {name: 'updatedModel'} ]
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(arrayReducer(stateBefore, action), stateAfter)
})

test('Delete model', (t) => {
  const action = {
    type: 'models.delete',
    deleteIndex: 1
  }

  const stateBefore = {
    models: [
      { name: "model 1" },
      { name: 'model 2' }
    ]
  }

  const stateAfter = {
    models: [
      { name: "model 1" }
    ]
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(arrayReducer(stateBefore, action), stateAfter)
})

test('Add field to model', (t) => {
  const action = {
    type : 'models.fields.add',
    modelId: 0,
    data: {
      name: "field a",
      type: "integer"
    }
  }

  const stateBefore = {
    models: [
      {
        name: "modelz",
      }
    ]
  }

  const stateAfter = {
    models: [
      {
        name: "modelz",
        fields: [ {name: "field a", type: "integer"} ]
      }
    ]
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(arrayReducer(stateBefore, action), stateAfter)

})

test('Update field of model', (t) => {
  const action = {
    type : 'models.fields.update',
    modelId: 0,
    fieldId: 1,
    data: {
      name: "new field b",
      type: "integer"
    }
  }

  const stateBefore = {
    models: [
      {
        name: "model",
        fields: [{ name: "field a", type: "string" }, { name: "old field b", type: "string" }]
      }
    ]
  }

  const stateAfter = {
    models: [
      {
        name: "model",
        fields: [{ name: "field a", type: "string" }, { name: "new field b", type: "integer" }]
      }
    ]
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(arrayReducer(stateBefore, action), stateAfter)

})

test('Delete field of model', (t) => {
  const action = {
    type : 'models.fields.delete',
    modelId: 0,
    deleteIndex: 0
  }

  const stateBefore = {
    models: [
      {
        name: "model",
        fields: [{ name: "field a", type: "string" }, { name: "old field b", type: "string" }]
      }
    ]
  }

  const stateAfter = {
    models: [
      {
        name: "model",
        fields: [{ name: "old field b", type: "string" }]
      }
    ]
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(arrayReducer(stateBefore, action), stateAfter)
})

test('Array add test', (t) => {
  const startTime = process.hrtime()
  const action = {
    type  : 'models.add',
    data: {
      name: 'model'
    }
  }

  let state = {
    models: []
  }

  for(let i = 0; i < 1000; i++) {
    state = arrayReducer(state, action)
    console.log(state.models.length)
  }

  const endTime = process.hrtime(startTime)
  console.info("Execution time: %ds %dms", endTime[0], endTime[1]/1000000)
})
