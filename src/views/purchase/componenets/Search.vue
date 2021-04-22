<template>
  <div class="search fz-16 mb-10">
    <div class="search-wrapper">
      <van-row type="flex" align="center" justify="center">
        <van-col span="16">
          <van-field v-model="searchTxt" placeholder="请输入项目名" />
        </van-col>
        <van-col span="4" class="tac sel-options"
          ><span class="fz-14">全部</span></van-col
        >
        <van-col span="4" class="tac sel-icon"
          ><i class="iconfont icon-sw_sousuo" @click="handleClick"></i
        ></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTxt: ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('search', this.searchTxt)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  height: rem(44);

  .search-wrapper {
    border-bottom: 1px solid #eee;
    background: #fff;

    .sel-options {
      position: relative;
      &::before,
      &::after {
        position: absolute;
        top: 50%;
        content: '';
        width: 2px;
        height: 40px;
        background: #ccc;
        transform: translateY(-50%) scale(0.5);
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
  }
}
</style>
