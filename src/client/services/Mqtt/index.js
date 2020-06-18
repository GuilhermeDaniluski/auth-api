import api, { errorHandling } from 'Config/api'
import _enum from 'Utils/enum'
import { store } from 'App'
import { alertConstants } from 'Store/Alert/constants'
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getRemote() {
  try {
    const response = await api.get('/mqtt/remote')
    return response.data
  } catch (error) {
    // Error
    return errorHandling(error)
  }
}

export async function postRemote(data) {
  try {
    const { ip, username, password } = data
    let payload = {
      ip,
      credentials: {
        username,
        password,
      },
    }
    await sleep(2000)
    const response = await api.post('/mqtt/remote', payload)
    store.dispatch({ type: alertConstants.INFO, data: 'Alterações Salvas' })
    return response.data
  } catch (error) {
    // Error
    return errorHandling(error)
  }
}

export async function getLocal() {
  try {
    const response = await api.get('/mqtt/local/auth')
    return response.data
  } catch (error) {
    // Error
    return errorHandling(error)
  }
}

export async function postLocal(data) {
  try {
    let payload = {
      credentials: data
    }
    await sleep(2000)
    const response = await api.post('/mqtt/local/auth', payload)
    store.dispatch({ type: alertConstants.INFO, data: 'Alterações Salvas' })
    return response.data
  } catch (error) {
    // Error
    return errorHandling(error)
  }
}
