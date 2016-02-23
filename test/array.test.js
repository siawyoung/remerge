
/*
*
* Test suite for array-based state
*
*/

import test from 'ava'
import deepFreeze from 'deep-freeze'

import merge from '../src/merge'
import { addArrayReducer, deleteArrayReducer } from '../src/arrayReducers'
import { updateReducer } from '../src/updateReducers'

const arrayReducer = merge({
  'models': {
    'add': addArrayReducer,
    'delete': deleteArrayReducer
  },
  'models[modelId]': {
    'update': updateReducer,
    'fields': {
      'add': addArrayReducer,
      'delete': deleteArrayReducer
    },
    'fields[fieldId]': {
      'update': updateReducer
    }
  }
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

test('Update model', (t) => {
  const action = {
    type  : 'models[].update',
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
    deleteId: 1
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
    type : 'models[].fields.add',
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
        fields: []
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
    type : 'models[].fields[].update',
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
    type : 'models[].fields.delete',
    modelId: 0,
    deleteId: 0
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
