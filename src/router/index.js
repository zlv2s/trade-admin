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
        name: 'home',
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home'),
        meta: { title: '管理系统' }
      },
      {
        name: 'material',
        path: 'material',
        component: () =>
          import(/* webpackChunkName: "material" */ '../views/material'),
        meta: { title: '材料管理' }
      },
      {
        name: 'new-material',
        path: 'material/new-material',
        component: () =>
          import(
            /* webpackChunkName: "new-material" */ '../views/material/MaterialForm'
          ),
        meta: { title: '新建材料' }
      },
      {
        name: 'update-material',
        path: 'material/update-material',
        component: () =>
          import(
            /* webpackChunkName: "new-material" */ '../views/material/MaterialForm'
          ),
        meta: { title: '更新材料' }
      },
      {
        name: 'supplier',
        path: '/supplier/list',
        component: () =>
          import(/* webpackChunkName: "supplier-list" */ '../views/supplier'),
        meta: {
          title: '供应商管理'
        }
      },
      {
        name: 'supplier-edit',
        path: '/supplier/edit',
        component: () =>
          import(
            /* webpackChunkName: "supplier-edit" */ '../views/supplier/SupplierEdit'
          ),
        meta: {
          title: '供应商编辑'
        }
      },
      {
        name: 'supplier-new',
        path: '/supplier/new',
        component: () =>
          import(
            /* webpackChunkName: "supplier-edit" */ '../views/supplier/SupplierEdit'
          ),
        meta: {
          title: '新增供应商'
        }
      },
      {
        name: 'setting',
        path: 'setting',
        component: () =>
          import(/* webpackChunkName: "setting" */ '../views/setting'),
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
