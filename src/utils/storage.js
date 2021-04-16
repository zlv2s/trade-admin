function getStorage(type) {
  const map = {
    session: sessionStorage,
    local: localStorage
  }
  return {
    get(k) {
      try {
        return JSON.parse(map[type].getItem(k))
      } catch (error) {
        return ''
      }
    },

    set(k, v) {
      try {
        map[type].setItem(k, JSON.stringify(v))
      } catch (error) {}
    },

    remove(k) {
      try {
        map[type].removeItem(k)
      } catch (error) {}
    },

    clear() {
      try {
        map[type].clear()
      } catch (error) {}
    }
  }
}

export default {
  local: getStorage('local'),
  session: getStorage('session')
}
