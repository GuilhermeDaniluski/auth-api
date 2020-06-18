import { put, call, select, take,fork } from 'redux-saga/effects'
import { updateConstants } from 'Store/Update/constants'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

  // Add more operations you need to do at startup here
  // ...
  // When those operations are finished we redirect to the main screen
  //   yield put({ type: 'NAVIGATION_SPLASH_SCREEN' })
  const bgSyncTask = yield fork(bgSync)
}

function* bgSync() {
  try {
    while (true) {
      yield put({ type: updateConstants.UPDATE })
      yield put({ type: updateConstants.CLEAR })
      let timeInSeconds = localStorage.getItem('updateTime') || 30
      let timeInMs = timeInSeconds * 1000
      yield delay(timeInMs)
    }
  } finally {
    yield cancelled()
  }
}
