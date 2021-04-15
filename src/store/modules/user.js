import { userLogin } from '@api/user'

export default {
  namespaced: true,
  state: {
    token: null
  },

  getters: {
    token: state => state.token
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },

  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },

    doLogin({ commit }, { phone, vdtCode }) {
      return new Promise((resolve, reject) => {
        userLogin({ phone, vdtCode })
          .then(res => {
            commit('SET_TOKEN', res.token)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
