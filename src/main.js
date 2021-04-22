import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters'
import {
  Button,
  Swipe,
  SwipeItem,
  Form,
  Field,
  Image as VanImage,
  Popup,
  Picker,
  Circle,
  List,
  Area,
  Calendar,
  SwipeCell,
  Cell,
  CellGroup,
  Row,
  Col,
  Search,
  Step,
  Steps
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
  .use(List)
  .use(Area)
  .use(Calendar)
  .use(SwipeCell)
  .use(Cell)
  .use(CellGroup)
  .use(Row)
  .use(Col)
  .use(Search)
  .use(Step)
  .use(Steps)

Vue.use(filters)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
