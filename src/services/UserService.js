import api from './api'

export const saveUser = (data) => {
  return api.post('user', { name: data.name, email: data.email, password: data.password, status: data.status, isAdmin: data.isAdmin })
}

export const getUsers = () => {
  return api.get('users')
}

export const getUser = (id) => {
  return api.get(`user/${id}`)
}

export const deleteUser = (id) => {
  return api.delete(`user/${id}`)
}

export const updateUser = (id, data) => {
  return api.put(`user/${id}`, data)
}

export const getUsersFilter = (params) => {
  return api.get('users-by-filter', { params })
}

export const changePass = (data) => {
  return api.post('change-pass', data)
}
