<template>
  <div class="purchase-info fz-16">PurchaseInfo {{ purchaseId }}</div>
</template>

<script>
export default {
  computed: {
    purchaseId() {
      return this.$route.params.purchaseId
    }
  }
}
</script>

<style lang="scss" scoped>
.purchase-info {
}
</style>
