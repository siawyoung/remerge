
import test from 'ava'
import deepFreeze from 'deep-freeze'
import _ from 'lodash'

import merge from '../src/merge'
import { mapInsertReducer, mapDeleteReducer } from '../src/mapReducers'
import { updateReducer } from '../src/updateReducers'

const mapReducer = merge({
  'models': {
    'add': mapInsertReducer,
    'delete': mapDeleteReducer
  },
  'models[modelId]': {
    'update': updateReducer
  }
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
    type: 'models[].update',
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