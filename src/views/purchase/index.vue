<template>
  <div class="purchase">
    <van-swipe-cell>
      <template #left>
        <van-button square type="primary" text="选择" />
      </template>
      <!-- <van-cell :border="false" title="单元格" value="内容" /> -->
      <!-- dasd -->
      <van-cell :border="false" title="单元格" value="内容" />
      <template #right>
        <van-button square type="danger" text="删除" />
        <van-button square type="primary" text="收藏" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { getPurchaseList } from '@api/purchase'
export default {
  data() {
    return {
      purchaseList: []
    }
  },
  methods: {
    async getList() {
      const res = await getPurchaseList()
      console.log(res)
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped></style>
