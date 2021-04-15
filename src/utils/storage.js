export default {
  get(k) {
    try {
      return JSON.parse(localStorage.getItem(k))
    } catch (error) {
      return ''
    }
  },

  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v))
    } catch (error) {}
  },

  remove(k) {
    try {
      localStorage.removeItem(k)
    } catch (error) {}
  },

  clear() {
    try {
      localStorage.clear()
    } catch (error) {}
  }
}
