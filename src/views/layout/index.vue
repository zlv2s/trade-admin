<template>
  <div class="layout-container">
    <h2 class="title">
      <i
        v-show="isShowHomeBtn"
        class="iconfont icon-shouye1"
        @click="$router.replace({ path: '/' })"
      ></i
      ><i v-show="isShowBackBtn" class="iconfont icon-fanhui back"></i
      >{{ $route.meta.title }}
    </h2>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isShowHomeBtn() {
      return !['/', '/home'].includes(this.$route.path)
    },
    isShowBackBtn() {
      return false
    }
  },
  created() {
    // console.log(this.$route)
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
}

.title {
  position: fixed;
  z-index: 99;
  width: 100%;
  font-size: rem(16);
  line-height: rem(45);
  text-align: center;
  background: $title-color;
  color: $color-w;
  .iconfont {
    position: absolute;
    left: rem(10);
    font-size: rem(20);
    &.back {
      left: rem(60);
      font-size: rem(14);
    }
  }
}

.content {
  padding-top: rem(45);
  background: #f5f5f5;
}
</style>
