import request from '@/utils/request'

/**
 * 付款统计
 * @returns {Promise}
 */
export function getPaymentStats() {
  return request({
    url: '/analysis/payable'
  })
}
/**
 * 收款统计
 * @returns {Promise}
 */
export function getCollectStats() {
  return request({
    url: '/analysis/collection'
  })
}
