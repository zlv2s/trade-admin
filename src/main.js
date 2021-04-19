import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  Swipe,
  SwipeItem,
  Form,
  Field,
  Image as VanImage,
  Popup,
  Picker,
  Circle
} from 'vant'

import './styles/common.scss'
Vue.use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Form)
  .use(Field)
  .use(VanImage)
  .use(Popup)
  .use(Picker)
  .use(Circle)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
