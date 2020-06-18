import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'


export default (rootReducer, rootSaga) => {
  const middleware = []
  const enhancers = []


  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)
  middleware.push(logger)

  enhancers.push(applyMiddleware(...middleware))

  const store = createStore(rootReducer, compose(...enhancers))
  // Kick off the root saga
  sagaMiddleware.run(rootSaga)

  return { store }
}
