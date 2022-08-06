import api from './api'

export const saveDirectMail = (data) => {
  return api.post('direct-mail', data)
}

export const updateDirectMail = (data) => {
  return api.put('direct-mail', data)
}

export const getDirectMails = () => {
  return api.get('direct-mails')
}

export const getDirectMail = (id) => {
  return api.get(`direct-mail/${id}`)
}

export const deleteDirectMail = (id) => {
  return api.delete(`direct-mail/${id}`)
}

export const uploadFile = (formData) => {
  return api.post('direct-mail/add-file', formData)
}

export const startProcess = (id) => {
  return api.post('start-process', { _id: id })
}

export const getProcess = (data) => {
  return api.get(`process/${data.id}/${data.user}`)
}
