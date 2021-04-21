<template>
  <van-picker
    show-toolbar
    :columns="dataList"
    :value-key="valueKey"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    },

    type: {
      type: String,
      default: ''
    },
    valueKey: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    onConfirm(value) {
      console.log('emit selected', value)
      this.$emit('selected', this.type ? { type: this.type, value } : value)
    },
    onCancel() {
      console.log('emit cancel')
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss" scoped></style>
