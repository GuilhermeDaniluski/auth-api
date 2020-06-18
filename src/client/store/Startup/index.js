import { startupConstants } from './constants'

export default function auth(state = {isLogged: true}, action) {
  switch (action.type) {
    case startupConstants.STARTUP:
      return {
        type: startupConstants.STARTUP,
      }
    default:
      return state
  }
}
