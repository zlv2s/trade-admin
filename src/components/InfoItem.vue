<template functional>
  <div class="info-item p-10">
    <h2 class="info-title fz-14 p-y-10">{{ props.title }}</h2>
    <div class="info-body m-y-10 p-10">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {},
  created() {}
}
</script>

<style lang="scss" scoped>
.info-body {
  background: #fff;
}
</style>
