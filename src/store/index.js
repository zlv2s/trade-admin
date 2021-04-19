import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataObj: null
  },
  getters: {
    dataObj: state => state.dataObj
  },
  mutations: {
    SET_DATA_OBJ(state, dataObj) {
      state.dataObj = dataObj
    }
  },
  actions: {},
  modules: {
    user
  }
})
