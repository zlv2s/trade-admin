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
 * @param {String} token
 * @returns {Promise}
 */
export function autoLogin(token) {
  return request({
    url: '/user/auto/login',
    method: 'POST',
    data: { token }
  })
}
