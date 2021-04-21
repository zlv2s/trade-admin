import request from '@utils/request'

/**
 * 获取项目列表
 * @param {Number} page 页码
 * @param {Number} size 每页数量
 * @returns {Promise}
 */
export function getProjectList({ page = 1, size = 10 } = {}) {
  return request({
    url: '/project/list',
    params: { page, size }
  })
}

/**
 * 更新项目
 * @param {Number} id
 * @param {Object} update 更新信息
 * @returns {Promise}
 */
export function updateProject({ id, ...update }) {
  return request({
    url: '/project/update',
    method: 'POST',
    data: { id, ...update }
  })
}

/**
 * 新增项目
 * @param {Object} data 项目信息
 * @returns {Promise}
 */
export function saveProject(data) {
  return request({
    url: '/project/save',
    method: 'POST',
    data
  })
}
