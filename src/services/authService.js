import api from './api'
import decode from 'jwt-decode'

const AUTH_TOKEN = process.env.VUE_APP_AUTH_TOKEN

export const login = async (data) => {

  const resp = await api.post('login', data)

  if (resp.status === 200) {
    localStorage.setItem(AUTH_TOKEN, resp.data.token)
  }

  return resp
}

export const forgotPass = (email) => {
  return api.post('forgot-pass', email)
}

export const resetPass = (data) => {
  return api.post('reset-pass', data)
}

export const logout = () => {
  clearAuthToken()
}

const clearAuthToken = () => {
  api.defaults.headers.common['Authorization'] = ''
  localStorage.removeItem(AUTH_TOKEN)
}

export const setHeadersAuthToken = () => {
  const token = getAuthToken()

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export const isLoggedIn = () => {
  let token = getAuthToken()
  return !!token && !isTokenExpired(token)
}

const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN)
}

function isTokenExpired (token) {
  let expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}

function getTokenExpirationDate (encodedToken) {
  let token = decode(encodedToken)
  if (!token.exp) {
    return null
  }

  let date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

// export const isValidToken = () => {
//   let authToken = getAuthToken()

//   if (!authToken) {
//     return true
//   }

//   return !isTokenExpired(authToken.token)
// }

export const getUserInfo = () => {
  if (isLoggedIn()) {
    return decode(getAuthToken())
  }
}