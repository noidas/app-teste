import { login, logoutUser } from '../../services/auth/authService';

// const state = () => ({}),  
  
// const mutations = {},

const actions = {
  loginUser (context, data) {
    return new Promise((resolve, reject) => {

      login(data).then(response => {

        if (response.status === 200) {
          localStorage.setItem(process.env.VUE_APP_AUTH_TOKEN_KEY, response.data.token)
        }
        resolve(response)

      }).catch (error => {
        reject(error)
      })
    })
  },

  logoutUser () {
    return logoutUser()
  }
}

export default {
  namespaced: true,
  // state,
  // mutations,
  actions
}