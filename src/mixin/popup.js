export default {
  data() {
    return {
      popup: {
        type: '',
        isShowPopup: false
      }
    }
  },
  methods: {
    showPopup(type) {
      this.popup.type = type
      this.popup.isShowPopup = true
    },

    onHide() {
      this.popup.isShowPopup = false
    }
  }
}
