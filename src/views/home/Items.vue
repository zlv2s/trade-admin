<template>
  <ul class="item-o-wrapper">
    <li class="item-o" v-for="menu in menuList" :key="menu.name">
      <h2 class="title">{{ menu.name }}</h2>
      <ul class="item-i-wrapper">
        <li class="item-i" v-for="child in menu.children" :key="child.title">
          <i class="iconfont" :class="child.icon"></i
          ><span>{{ child.title }}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import config from '@config'
export default {
  data() {
    return {
      menuList: config.menuList
    }
  }
}
</script>

<style lang="scss" scoped>
.item-o-wrapper {
  .item-o {
    padding: rem(10);
    background: #fff;
    margin-bottom: rem(10);
    .title {
      position: relative;
      line-height: rem(30);
      font-size: rem(14);
      border-bottom: 1px solid #ccc;
      margin-bottom: rem(10);
      text-indent: rem(10);

      &::before {
        content: '';
        display: block;
        position: absolute;
        width: rem(3);
        height: rem(18);
        background: #e328e2;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .item-i-wrapper {
    display: flex;
    .item-i {
      display: flex;
      width: 25%;
      flex-direction: column;
      align-items: center;
      font-size: rem(12);
      // margin-right: rem(10);
      i {
        font-size: rem(28);
        margin-bottom: rem(10);
      }
    }
  }
}
</style>
