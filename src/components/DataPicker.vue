<template>
  <van-picker
    show-toolbar
    :columns="dataList"
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
    }
  },
  methods: {
    onConfirm(v) {
      console.log('emit selected', v)
      this.$emit('selected', v)
    },
    onCancel() {
      console.log('emit cancel')
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss" scoped></style>
