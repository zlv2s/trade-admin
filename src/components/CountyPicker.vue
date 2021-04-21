<template>
  <van-picker
    title="选择地市"
    show-toolbar
    value-key="label"
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script>
import { getCityList } from '@api/supplier'
export default {
  data() {
    return {
      columns: []
    }
  },
  async created() {
    this.columns = (await getCityList()).slice(0, -3)
  },
  methods: {
    onCancel() {
      this.$emit('hide')
    },

    onConfirm(v) {
      this.$emit('selected', v)
    }
  }
}
</script>

<style lang="scss" scoped></style>
