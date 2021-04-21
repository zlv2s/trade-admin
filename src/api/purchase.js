import request from '@utils/request'

/**
 * 获取采购列表
 * @param {Number} page 当前页数
 * @param {Number} size 每页数量
 * @param {String} state 采购状态：'新建'，'确认'，'在途'，'完成' ，'作废'，默认全部传 ''
 * @param {String} projectName 项目名
 * @returns
 */
export function getPurchaseList({
  page = 1,
  size = 10,
  state = '',
  projectName = ''
} = {}) {
  return request({
    url: '/purchase/list',
    params: {
      page,
      size,
      state,
      projectName
    }
  })
}

/**
 * 新建采购单
 * @param {Object} data 采购数据对象
 * @returns {Promise}
 */
export function savePurchase(data) {
  return request({
    url: '/purchase/save',
    method: 'POST',
    data
  })
}

/**
 * 更新采购信息
 * @param {String} id 采购单 id
 * @param {Object} update 采购单更新信息
 * @returns {Promise}
 */
export function updatePurchase({ id, ...update }) {
  return request({
    url: '/purchase/update',
    method: 'POST',
    data: { id, ...update }
  })
}

/**
 * 删除采购单
 * @param {String} id 待删除 id
 * @returns {Promise}
 */
export function deletePurchase(id) {
  return request({
    url: `/purchase/delete/${id}`,
    method: 'POST'
  })
}

/**
 * 根据 id 获取采购单详情
 * @param {String} id 采购单 id
 * @returns {Promise}
 */
export function getPurchaseDetail(id) {
  return request({
    url: '/purchase/info',
    params: { id }
  })
}

/**
 * 更新采购订单状态
 * @param {String} id 采购订单 id
 * @param {Boolean} isReject 是否驳回
 * @param {String} userId 用户 id
 * @param {String} userName 用户名
 * @param {String} remark 备注
 * @returns {Promise}
 */
export function flowPurchase({ id, isReject, userId, userName, remark }) {
  return request({
    url: '/purchase/flow',
    method: 'POST',
    data: { id, isReject, userId, userName, remark }
  })
}

/**
 * 采购订单支付
 * @param {String} id 采购订单 id
 * @param {Number} amount 支付金额
 * @param {String} userId 用户 id
 * @param {String} userName 用户名
 * @param {String} remark 备注
 * @returns {Promise}
 */
export function payPurchase({ id, amount, userId, userName, remark }) {
  return request({
    url: '/purchase/payment',
    method: 'POST',
    data: { id, amount, userId, userName, remark }
  })
}
