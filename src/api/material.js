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
