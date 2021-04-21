/**
 * 从数组对象中根据某个 key，抽取成新数组
 * @param {Array} arr 数组对象
 * @param {String} key 带抽取的 key
 * @returns {Array} 新的数组
 */
export function pull(arr = [], key) {
  console.log(arr)

  return arr.map(x => x[key])
}
