import * as arrayReducers  from '../src/arrayReducers'
import * as objectReducers from '../src/objectReducers'
import * as mapReducers    from '../src/mapReducers'

module.exports = {
  ...arrayReducers,
  ...objectReducers,
  ...mapReducers,
}