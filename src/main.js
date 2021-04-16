import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Swipe, SwipeItem } from 'vant'

import './styles/common.scss'
Vue.use(Button)
  .use(Swipe)
  .use(SwipeItem)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
