import request from '@utils/request'
/**
 * 获取材料列表信息
 * @returns {Promise}
 */
export function getMaterialList() {
  return request({
    url: '/material/list'
  })
}

/**
 * 新建材料信息
 * @param {Object} data 材料对象
 * @returns {Promise}
 */
export function saveMaterial({ parentId, name, remark }) {
  return request({
    url: '/material/save',
    method: 'POST',
    data: { parentId, name, remark }
  })
}

/**
 * 更新材料信息
 * @param {Object} data 材料对象
 * @returns {Promise}
 */
export function updateMaterial({ id, parentId, name, remark }) {
  return request({
    url: '/material/update',
    method: 'POST',
    data: { id, parentId, name, remark }
  })
}
