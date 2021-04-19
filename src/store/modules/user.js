import { userLogin, autoLogin, getUserInfo } from '@api/user'
import storage from '@utils/storage'

export default {
  namespaced: true,
  state: {
    token: storage.session.get('token'),
    user: storage.session.get('user')
  },

  getters: {
    token: state => state.token
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },

    SET_USER(state, user) {
      state.user = user
    },

    CLEAR_ALL(state) {
      state.token = ''
      state.user = null
    }
  },

  actions: {
    // 登录
    doLogin({ commit }, { phone, vdtCode }) {
      return new Promise((resolve, reject) => {
        userLogin({ phone, vdtCode })
          .then(res => {
            commit('SET_TOKEN', res.token)
            storage.session.set('token', res.token)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取用户信息
    getUserInfo({ commit }, id) {
      return new Promise((resolve, reject) => {
        getUserInfo(id)
          .then(res => {
            commit('SET_USER', res)
            storage.session.set('user', res)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 自动登录，并获取用户信息
    autoLogin({ commit }) {
      return new Promise((resolve, reject) => {
        autoLogin()
          .then(res => {
            commit('SET_USER', res)
            storage.session.set('user', res)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
