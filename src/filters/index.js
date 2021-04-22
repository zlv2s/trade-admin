/**
 * 时间格式化 2020-07-07 23:30:07
 * @param {Number} time 时间戳
 * @returns {String} 格式化字符串
 */
function formatTime(time = +new Date()) {
  const date = new Date(time + 8 * 3600 * 1000)
  return date
    .toJSON()
    .substr(0, 19)
    .replace('T', ' ')
}

const filters = { formatTime }

export default function(Vue) {
  Object.entries(filters).forEach(([k, v]) => Vue.filter(k, v))
}
