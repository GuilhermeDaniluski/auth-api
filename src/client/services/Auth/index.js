import api, { errorHandling } from 'Config/api'
import _enum from 'Utils/enum'
import { store } from 'App'
import { alertConstants } from 'Store/Alert/constants'
import { authConstants } from 'store/Auth/constants'

export async function login(data) {
  try {
    const response = await api.post('/users/login', data)
    store.dispatch({type: alertConstants.SUCCESS, data:'Login Efetuado'})
    return response.data
  } catch (error) {
    // Error
    return errorHandling(error)
  }
}


export async function refreshToken() {
  try {
    const response = await api.get('/users/refreshToken')
    return response.data
  } catch (error) {
    // Error
    return errorHandling(error)
  }
}

export async function getUser() {
  try {
    let response = await api.get('/users/me')
    response.data.password = ''
    response.data.updateTime = localStorage.getItem('updateTime') || 30
    return response.data
  } catch (error) {
    // Error
    return errorHandling(error)
  }
}


export async function postUser(data) {
  try {
    let payload = {}
    const { username, password } = data
    payload.credentials = {
      username, password
    }
    localStorage.setItem('updateTime',data.updateTime)
    const response = await api.post('/users/me',payload)
    store.dispatch({type: alertConstants.INFO, data:'Alterações Salvas'})
    return response.data
  } catch (error) {
    // Error
    return errorHandling(error)
  }
}