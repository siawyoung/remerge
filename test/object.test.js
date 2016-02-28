
/*
*
* Test suite for object-based state
*
*/

import test from 'ava'
import deepFreeze from 'deep-freeze'

import merge from '../src/merge'
import { objectInsertReducer, objectDeleteReducer } from '../src/objectReducers'
import { updateReducer } from '../src/updateReducers'

const objectReducer = merge({
  'models': {
    '_': {},
    'add': objectInsertReducer,
    'delete': objectDeleteReducer
  },
  'models[modelId]': {
    'update': updateReducer,
    'fields': {
      'add': objectInsertReducer
    }
  }
})


test('Initial state', (t) => {
  const stateAfter = {
    models: {}
  }

  deepFreeze(stateAfter)
  t.same(objectReducer(), stateAfter)
})

test('Insert model', (t) => {
  const action = {
    type: 'models.add',
    insertKey: 'abcde',
    data: { name: 'model abcde' }
  }

  const stateBefore = {
    models: {
      qwert: { name: 'model qwert' }
    }
  }

  const stateAfter = {
    models: {
      abcde: { name: 'model abcde' },
      qwert: { name: 'model qwert' }
    }
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(objectReducer(stateBefore, action), stateAfter)
})

test('Update model', (t) => {
  const action = {
    type: 'models[].update',
    modelId: 'abcde',
    data: { name: 'updated model abcde' }
  }

  const stateBefore = {
    models: {
      abcde: { name: 'model abcde' },
      qwert: { name: 'model qwert' }
    }
  }

  const stateAfter = {
    models: {
      abcde: { name: 'updated model abcde' },
      qwert: { name: 'model qwert' }
    }
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(objectReducer(stateBefore, action), stateAfter)
})

test('Delete model', (t) => {
  const action = {
    type: 'models.delete',
    deleteKey: 'abcde'
  }

  const stateBefore = {
    models: {
      abcde: { name: 'model abcde' },
      qwert: { name: 'model qwert' }
    }
  }

  const stateAfter = {
    models: {
      qwert: { name: 'model qwert' }
    }
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(objectReducer(stateBefore, action), stateAfter)
})

test('Initial state of objectInsertReducer', (t) => {
  const action = {
    type: 'models[].fields.add',
    modelId: 'abcde',
    insertKey: 'field 1',
    data: {
      name: 'field 1'
    }
  }

  const stateBefore = {
    models: {
      abcde: {
        name: 'abcde'
      }
    }
  }

  const stateAfter = {
    models: {
      abcde: {
        name: 'abcde',
        fields: {
          'field 1': {
            name: 'field 1'
          }
        }
      }
    }
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)
  t.same(objectReducer(stateBefore, action), stateAfter)
})
