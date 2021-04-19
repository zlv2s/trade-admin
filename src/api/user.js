import request from '@/utils/request'

/**
 * 获取单个用户信息
 * @param {String} id
 * @returns {Promise}
 */
export function getUserInfo(id) {
  return request({
    url: '/user/info',
    params: { id }
  })
}

/**
 * app 端用户登录
 * @returns
 */
export function userLogin({ phone, vdtCode }) {
  return request({
    url: '/user/app/login',
    method: 'POST',
    data: { phone, vdtCode }
  })
}

/**
 * 自动登录
 * @returns {Promise}
 */
export function autoLogin() {
  return request({
    url: '/user/auto/login',
    method: 'POST'
  })
}

/**
 * 更新用户信息
 * @param {Object} data 用户信息
 * @returns {Promise}
 */
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'POST',
    data
  })
}
