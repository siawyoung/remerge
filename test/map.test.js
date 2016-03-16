
import test from 'ava'
import deepFreeze from 'deep-freeze'
import _ from 'lodash'

import merge from '../src'
import { mapInsertReducer, mapDeleteReducer } from '../src/mapReducers'
import { objectUpdateReducer } from '../src/objectReducers'

const mapReducer = merge({
  models: {
    _: new Map(),
    add: mapInsertReducer,
    delete: mapDeleteReducer,
    $modelId: {
      update: objectUpdateReducer,
      fields: {
        add: mapInsertReducer
      }
    }
  }
}, true)

test('Initial state', (t) => {
  const stateAfter = {
    models: new Map()
  }

  deepFreeze(stateAfter)
  t.same(mapReducer(), stateAfter)
})

test('Add model', (t) => {
  const action = {
    type: 'models.add',
    addIndex: 'abcde',
    data: {
      name: 'model abcde'
    }
  }

  const stateBefore = {
    models: new Map()
  }

  const stateAfter = {
    models: new Map([['abcde', { name: 'model abcde' }]])
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)
  t.same(mapReducer(stateBefore, action), stateAfter)
})

test('Update model', (t) => {
  const action = {
    type: 'models.update',
    modelId: 'abcde',
    data: {
      name: 'updated model abcde'
    }
  }

  const stateBefore = {
    models: new Map([['abcde', { name: 'model abcde' }]])
  }

  const stateAfter = {
    models: new Map([['abcde', { name: 'updated model abcde' }]])
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(mapReducer(stateBefore, action), stateAfter)
})

test('Delete model', (t) => {
  const action = {
    type: 'models.delete',
    deleteKey: 'abcde'
  }

  const stateBefore = {
    models: new Map([['abcde', { name: 'model abcde' }]])
  }

  const stateAfter = {
    models: new Map()
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)

  t.same(mapReducer(stateBefore, action), stateAfter)
})

test('Initial state of mapInsertReducer', (t) => {
  const action = {
    type: 'models.fields.add',
    modelId: 'abcde',
    insertKey: 'field 1',
    data: {
      name: 'field 1'
    }
  }

  const stateBefore = {
    models: new Map([['abcde', {
      name: 'model abcde'
    }]])
  }

  const stateAfter = {
    models: new Map([['abcde', {
      name: 'model abcde',
      fields: new Map([['field 1', { name: 'field 1' }]])
    }]])
  }

  deepFreeze(action)
  deepFreeze(stateBefore)
  deepFreeze(stateAfter)
  t.same(mapReducer(stateBefore, action), stateAfter)
})
