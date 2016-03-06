
import merge from '../src'
import { arrayInsertReducer, arrayDeleteReducer } from '../src/arrayReducers'
import { objectInsertReducer, objectDeleteReducer } from '../src/objectReducers'
import { updateReducer } from '../src/updateReducers'
import { printTree } from '../src/utils'

const reducer = merge({
  users: {
    _: {},
    add: objectInsertReducer,
    delete: objectDeleteReducer,
    $userId: {
      update: updateReducer,
      items: {
        add: arrayInsertReducer,
        delete: arrayDeleteReducer,
        $itemId: {
          update: updateReducer
        }
      }
    }
  }
}, true)

const initialStateTree = reducer()
printTree(initialStateTree)

const addUserAction = {
  type: 'users.add',
  insertKey: 'user0id',
  data: {
    name: 'John'
  }
}

const state1 = reducer(initialStateTree, addUserAction)
printTree(state1)

const addAppleAction = {
  type: 'users.items.add',
  userId: 'user0id',
  data: {
    itemName: 'apple'
  }
}

const state2 = reducer(state1, addAppleAction)
printTree(state2)

const changeUserNameAction = {
  type: 'users.update',
  userId: 'user0id',
  data: {
    name: 'Jim'
  }
}

const state3 = reducer(state2, changeUserNameAction)
printTree(state3)

const changeItemNameAction = {
  type: 'users.items.update',
  userId: 'user0id',
  itemId: 0,
  data: {
    itemName: 'orange'
  }
}

const state4 = reducer(state3, changeItemNameAction)
printTree(state4)

const deleteUserAction = {
  type: 'users.delete',
  deleteKey: 'user0id'
}

const state5 = reducer(state4, deleteUserAction)
printTree(state5)
