import request from '@utils/request'
/**
 * 获取验证码
 * @param {String} phone 手机号
 * @returns {Object} 验证码信息
 */
export function getVerifyCode(phone) {
  return request({
    url: '/user/validate/code',
    method: 'POST',
    data: { phone }
  })
}
