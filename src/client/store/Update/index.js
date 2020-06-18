import { updateConstants } from './constants'

const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case updateConstants.UPDATE:
      return {
        type: updateConstants.UPDATE,
      }
    case updateConstants.CLEAR:
      return {}
    default:
      return state
  }
}
