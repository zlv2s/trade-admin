<template>
  <div>
    supplier edit
  </div>
</template>

<script>
export default {
  data() {
    return {
      supplier: null
    }
  },
  created() {
    console.log(this.$store.getters.dataObj)
  }
}
</script>

<style lang="scss" scoped></style>
