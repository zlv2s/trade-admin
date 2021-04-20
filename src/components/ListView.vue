<template>
  <van-list
    class="list-wrapper"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div
      class="list-item"
      v-for="item in dataList"
      :key="item.id"
      @click="goEdit(item)"
    >
      <div class="info">
        <p class="company-name mb-10">{{ item.name }}</p>
        <p class="address mb-10">{{ item.address }}</p>
        <p class="contact">
          <span>联系人：{{ item.contact }}，手机{{ item.phone }}</span>
        </p>
      </div>
      <i class="iconfont icon-fanhui1"></i>
    </div>
  </van-list>
</template>

<script>
export default {
  props: {
    dataList: []
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  padding: rem(20);
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: rem(20);
  padding-bottom: rem(10);
  border-bottom: 1px solid #ddd;

  .info {
    .company-name {
      font-weight: bold;
    }

    .address {
      font-size: rem(12);
    }

    .contact {
      color: #999;
      font-size: rem(12);
    }
  }

  i {
    font-size: rem(14);
  }
}
</style>
