import axios from "axios";
import _enum from "Utils/enum";
import { store } from "App";
import { alertConstants } from 'Store/Alert/constants'
import { authConstants } from "store/Auth/constants";

export const port = "80";
export const apiURL = `http://${window.location.hostname}:${port}`;

export default axios.create({
  baseURL: apiURL,
  timeout: 10000,
  withCredentials: true
});


export const errorHandling = (error) =>{
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    if (error.response.status == 403) {
      store.dispatch({type: alertConstants.ERROR, data:'Credenciais Inválidas'})
      return {error:_enum.INVALID_CREDENTIALS}
    }
    if (error.response.status == 401) {
      store.dispatch({ type: authConstants.LOGOUT })
      store.dispatch({ type: alertConstants.INFO, data: 'Sessão expirada' })
      return {error:_enum.INVALID_CREDENTIALS}
    }
    if (error.response.status == 400) {
      store.dispatch({ type: authConstants.LOGOUT })
      store.dispatch({ type: alertConstants.ERROR, data: 'Erro' })
      return {error:_enum.INVALID_CREDENTIALS}
    }
    return({error:error.response});
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the
    // browser and an instance of
    // http.ClientRequest in node.js
    console.log(error)
    store.dispatch({ type: alertConstants.ERROR, data: 'Sem Conexão' })
    return {error:error.request}
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
}