import request from '@utils/request'

/**
 * 获取收货单列表
 * @param {Number} page 当前页数
 * @param {Number} size 每页数量
 * @param {String} state 收货单状态
 * @param {String} projectName 项目名
 * @returns
 */
export function getReceivingList({
  page = 1,
  size = 10,
  state = '',
  projectName = ''
} = {}) {
  return request({
    url: '/receiving/list',
    params: {
      page,
      size,
      state,
      projectName
    }
  })
}

/**
 * 根据 id 获取收货单详情
 * @param {String} id 收货单 id
 * @returns {Promise}
 */
export function getReceivingDetail(id) {
  return request({
    url: '/receiving/info',
    params: { id }
  })
}
