import { authConstants } from './constants'

export default function auth(state = {isLogged: false}, action) {
  switch (action.type) {
    case authConstants.LOGIN:
      return {
        type: authConstants.LOGIN,
        isLogged: true,
      }
    case authConstants.LOGOUT:
      return {
        type: authConstants.LOGOUT,
        isLogged: false,
      }
    default:
      return state
  }
}
