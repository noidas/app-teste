import axios from 'axios'

const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: process.env.VUE_APP_API_URL
})

// api.defaults.withCredentials = true

// api.defaults.headers.common['Authorization'] = `Bearer ${token}`

// Add a response interceptor
// apiNode.interceptors.response.use(response => response, function (error) {

//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   if (error.response.status === 401) {

//     router.push({ path: '/login' })
//   }

//   // return Promise.reject(error)
// })

export default api
