import { takeLatest, all } from 'redux-saga/effects'
import { startup } from './StartupSaga'
import { startupConstants } from 'store/Startup/constants'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(startupConstants.STARTUP, startup),
  ])
}
