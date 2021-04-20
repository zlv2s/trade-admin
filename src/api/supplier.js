import request from '@utils/request'

/**
 * 获取供应商列表
 * @param {*} param
 * @returns {Promise}
 */
export function getSupplierList({ page, size }) {
  return request({
    url: '/supplier/list',
    params: { page, size }
  })
}

/**
 * 获取城市列表
 * @returns null
 */
export function getCityList() {
  return request({
    url: '/city/list/info'
  })
}

/**
 * 修改供应商信息
 * @param {*} 更新信息
 * @returns {Promise}
 */
export function updateSupplier({ id, ...update }) {
  return request({
    url: '/supplier/update',
    method: 'POST',
    data: { id, ...update }
  })
}

/**
 * 新增供应商
 * @param {*} data 供应商对象
 * @returns {Promise}
 */
export function saveSupplier(data) {
  return request({
    url: '/supplier/save',
    method: 'POST',
    data
  })
}
