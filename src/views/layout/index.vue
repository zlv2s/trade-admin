<template>
  <div>
    <h2 class="title">{{ $route.meta.title }}</h2>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$route)
  }
}
</script>

<style lang="scss" scoped>
.title {
  position: fixed;
  z-index: 99;
  width: 100%;
  font-size: rem(16);
  line-height: rem(45);
  text-align: center;
  background: $title-color;
  color: $color-w;
}

.content {
  padding-top: rem(45);
  background: #f5f5f5;
}
</style>
