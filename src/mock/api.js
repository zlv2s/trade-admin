const Mock = require('mockjs')

Mock.Random.extend({
  phone: function() {
    var phonePrefixs = ['132', '135', '189', '187', '165', '138', '189']
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  }
})

Mock.Random.extend({
  company: function() {
    return this.ctitle(5, 7) + '商贸有限公司'
  }
})

export function getSupplierList({ page, size = 10 }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        Mock.mock({
          code: 200,
          rows: Array.from({ length: size }, () => {
            return {
              name: '@company',
              address: Mock.Random.county(true),
              city: '@city',
              'code|123456-999999': 1,
              contact: '@cname',
              county: '@county',
              id: Mock.Random.increment(),
              phone: '@phone',
              province: '@province',
              remark: '@csentence',
              state: 'y'
            }
          }),
          total: 60
        })
      )
    }, 1000)
  })
}
