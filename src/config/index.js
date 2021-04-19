export default {
  /**
   * @description axios 请求超时时间
   */
  timeout: 8000,

  TOKEN_KEY: 'auto_login_token',
  menuList: [
    {
      name: '基础数据',
      children: [
        {
          title: '材料管理',
          icon: 'icon-cailiao',
          path: '/material'
        },
        {
          title: '新建材料',
          icon: 'icon-cailiao',
          path: '/material/new-material'
        },
        {
          title: '供应商管理',
          icon: 'icon-renzheng6',
          path: ''
        },
        {
          title: '新建供应商',
          icon: 'icon-renzheng6',
          path: ''
        }
      ]
    },
    {
      name: '项目管理',
      children: [
        {
          title: '项目列表',
          icon: 'icon-icon-test',
          path: ''
        },
        {
          title: '新建材料',
          icon: 'icon-xinjian',
          path: ''
        }
      ]
    },
    {
      name: '采购管理',
      children: [
        {
          title: '采购列表',
          icon: 'icon-caigou',
          path: '/purchase-list'
        },
        {
          title: '新建采购单',
          icon: 'icon-xinjian1',
          path: '/new-purchase'
        }
      ]
    },
    {
      name: '收货管理',
      children: [
        {
          title: '收货列表',
          icon: 'icon-shouhuodanwei',
          path: ''
        },
        {
          title: '新建收货单',
          icon: 'icon-shouhuodan',
          path: ''
        }
      ]
    },
    {
      name: '系统管理',
      children: [
        {
          title: '设置',
          icon: 'icon-shezhi',
          path: '/setting'
        }
      ]
    }
  ]
}
