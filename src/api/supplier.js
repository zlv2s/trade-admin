import request from '@utils/request'

export function getSupplierList({ page, size }) {
  return request({
    url: '/supplier/list',
    params: { page, size }
  })
}
