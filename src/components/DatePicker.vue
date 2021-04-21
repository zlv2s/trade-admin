<template>
  <van-calendar
    :poppable="false"
    :style="{ height: '500px' }"
    :show-confirm="false"
    @close="onClose"
    @select="onSelected"
  />
</template>

<script>
export default {
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    },
    onSelected(v) {
      this.$emit('selected', this.formatDate(v))
      this.$emit('hide')
    },
    onClose() {
      console.log('close')
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss" scoped></style>
