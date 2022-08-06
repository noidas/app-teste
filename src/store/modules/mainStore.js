const state = () => ({

  breadcrumbs: [{ text: 'Dashboard', disabled: false, to: '/home' }],

  itemsPerPage: {
    current: 15,
    values: [15, 25, 50, 100]
  },

  userLogged: {}
})

const mutations = {
  SET_BREADCRUMBS: (state, value) => state.breadcrumbs.push(value),
  CLEAN_BREADCRUMBS: (state, value) => state.breadcrumbs = value,
  SET_ITEMS_PER_PAGE: (state, items) => state.itemsPerPage = items,
  SET_USER_LOGGED: (state, data) => state.userLogged = data
}

const actions = {

  addBreadcrumbs: ({ commit }, value) => {
    commit('SET_BREADCRUMBS', value)
  },

  cleanBreadcrumbs: ({ commit }) => {
    commit('CLEAN_BREADCRUMBS', [{ text: 'Dashboard', disabled: false, to: '/home' }])
  },

  setCurrentItemPerPage: ({ commit }, value) => {
    commit('SET_ITEMS_PER_PAGE', {current: value, values: [10, 20, 50, 100]})
  },

  setUserLogged: ({ commit }, data) => {
    commit('SET_USER_LOGGED', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
