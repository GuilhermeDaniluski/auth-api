import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../sagas/index'
import alert from './Alert'
import auth from './Auth'
import update from './Update'





export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    alert,
    auth,
    update,
  })
  return configureStore(rootReducer,rootSaga)
}
