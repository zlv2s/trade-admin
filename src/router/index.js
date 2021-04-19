import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Layout from '@views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home'),
        name: 'Home',
        meta: { title: '管理系统' }
      },
      {
        path: 'material',
        component: () =>
          import(/* webpackChunkName: "material" */ '../views/material'),
        name: 'material',
        meta: { title: '材料管理' }
      },
      {
        path: 'new-material',
        component: () =>
          import(
            /* webpackChunkName: "new-material" */ '../views/material/NewMaterial'
          ),
        name: 'new material',
        meta: { title: '新建材料' }
      },
      {
        path: 'setting',
        component: () =>
          import(/* webpackChunkName: "setting" */ '../views/setting'),
        name: 'setting',
        meta: { title: '系统设置' }
      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login'),
    meta: {
      noNeedAuth: true
    }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)

  if (!to.meta.noNeedAuth) {
    const token = store.getters['user/token']
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
