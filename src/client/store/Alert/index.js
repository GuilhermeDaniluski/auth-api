import { alertConstants } from './constants'

export default function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.data,
      }
    case alertConstants.ERROR:
      return {
        type: 'alert-error',
        message: action.data,
      }
    case alertConstants.INFO:
      return {
        type: 'alert-info',
        message: action.data,
      }
    case alertConstants.CLEAR:
      return {}
    default:
      return state
  }
}
