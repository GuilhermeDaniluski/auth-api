import api, { errorHandling } from 'Config/api'

export async function getCpuInfo() {
  try {
    const response = await api.get('/cpu')
    return response.data
  } catch (_err) {
    return errorHandling(_err)
  }
}

export async function getOsInfo() {
  try {
    const response = await api.get('/os')
    return response.data
  } catch (_err) {
    return errorHandling(_err)
  }
}

export async function getMemInfo() {
  try {
    const response = await api.get('/memory')
    return response.data
  } catch (_err) {
    return errorHandling(_err)
  }
}

export async function getLoadInfo() {
  try {
    const response = await api.get('/load')
    return response.data
  } catch (_err) {
    return errorHandling(_err)
  }
}

export async function getDiskInfo() {
  try {
    const response = await api.get('/disk')
    return response.data
  } catch (_err) {
    return errorHandling(_err)
  }
}

export async function getServicesInfo() {
  try {
    let response = await api.get('/services')
    let data = response.data.map((service) => {
      if (service.name == 'mongodb') {
        service.name = 'Banco de Dados'
      }
      if (service.name == 'send-to-remote.sh') {
        service.name = 'Envio de Mensagens'
      }
      if (service.name == 'store-on-local') {
        service.name = 'Armazenamento de Mensagens'
      }
      if (service.name == 'mqtt') {
        service.name = 'Gerenciamento de Mensagens'
      }
      return service
    })

    return data
  } catch (_err) {
    return errorHandling(_err)
  }
}
