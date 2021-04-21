<template>
  <van-swipe-cell>
    <template #left>
      <van-button square type="primary" text="选择" />
    </template>
    <van-cell :border="false" title="单元格" value="内容" />
    <template #right>
      <van-button square type="danger" text="删除" />
      <van-button square type="primary" text="收藏" />
    </template>
  </van-swipe-cell>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
