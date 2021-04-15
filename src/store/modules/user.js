import { userLogin, autoLogin } from '@api/user'
import storage from '@utils/storage'
import config from '@config'

export default {
  namespaced: true,
  state: {
    token: null,
    id: ''
  },

  getters: {
    token: state => state.token,
    id: state => state.id
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_ID(state, id) {
      state.id = id
    }
  },

  actions: {
    doLogin({ commit }, { phone, vdtCode }) {
      return new Promise((resolve, reject) => {
        userLogin({ phone, vdtCode })
          .then(res => {
            commit('SET_TOKEN', res.token)
            commit('SET_ID', res.id)
            storage.set(config.TOKEN_KEY, res.token)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    autoLogin({ commit }) {
      return new Promise((resolve, reject) => {
        autoLogin()
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
