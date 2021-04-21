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
        name: 'material-list',
        path: 'material/list',
        component: () =>
          import(/* webpackChunkName: "material-list" */ '../views/material'),
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
            /* webpackChunkName: "update-material" */ '../views/material/MaterialForm'
          ),
        meta: { title: '更新材料' }
      },
      {
        name: 'supplier-list',
        path: 'supplier/list',
        component: () =>
          import(/* webpackChunkName: "supplier-list" */ '../views/supplier'),
        meta: {
          title: '供应商管理'
        }
      },
      {
        name: 'supplier-edit',
        path: 'supplier/edit',
        component: () =>
          import(
            /* webpackChunkName: "supplier-edit" */ '../views/supplier/SupplierEdit'
          ),
        meta: {
          title: '更新供应商'
        }
      },
      {
        name: 'supplier-new',
        path: 'supplier/new',
        component: () =>
          import(
            /* webpackChunkName: "supplier-new" */ '../views/supplier/SupplierEdit'
          ),
        meta: {
          title: '新增供应商'
        }
      },
      {
        name: 'project-list',
        path: 'project/list',
        component: () =>
          import(/* webpackChunkName: "project-list" */ '../views/project'),
        meta: {
          title: '项目管理'
        }
      },
      {
        name: 'project-edit',
        path: 'project/edit',
        component: () =>
          import(
            /* webpackChunkName: "project-edit" */ '../views/project/ProjectEdit'
          ),
        meta: {
          title: '更新项目'
        }
      },
      {
        name: 'project-new',
        path: 'project/new',
        component: () =>
          import(
            /* webpackChunkName: "project-new" */ '../views/project/ProjectEdit'
          ),
        meta: {
          title: '新增项目'
        }
      },
      {
        name: 'purchase-list',
        path: 'purchase/list',
        component: () =>
          import(/* webpackChunkName: "purchase-list" */ '../views/purchase'),
        meta: {
          title: '采购列表'
        }
      },
      {
        name: 'purchase-edit',
        path: 'purchase/edit',
        component: () =>
          import(
            /* webpackChunkName: "purchase-edit" */ '../views/purchase/PurchaseEdit'
          ),
        meta: {
          title: '采购更新'
        }
      },
      {
        name: 'purchase-new',
        path: 'purchase/new',
        component: () =>
          import(
            /* webpackChunkName: "purchase-new" */ '../views/purchase/PurchaseEdit'
          ),
        meta: {
          title: '新增采购'
        }
      },
      {
        name: 'purchase-info',
        path: 'purchase/info/:purchaseId',
        component: () =>
          import(
            /* webpackChunkName: "purchase-info" */ '../views/purchase/PurchaseInfo'
          ),
        meta: {
          title: '采购单详情'
        }
      },
      {
        name: 'receiving-list',
        path: 'receiving/list',
        component: () =>
          import(/* webpackChunkName: "receiving-list" */ '../views/receiving'),
        meta: {
          title: '收货列表'
        }
      },
      {
        name: 'receiving-edit',
        path: 'receiving/edit',
        component: () =>
          import(
            /* webpackChunkName: "receiving-edit" */ '../views/receiving/ReceivingEdit'
          ),
        meta: {
          title: '新建收货单'
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
