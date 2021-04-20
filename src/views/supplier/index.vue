<template>
  <div class="supplier">
    <van-list
      class="supplier-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        class="supplier-item"
        v-for="item in supplierList"
        :key="item.name"
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
  </div>
</template>

<script>
import { getSupplierList } from '@api/supplier'
// import { getSupplierList } from '@/mock/api'
export default {
  name: 'supplier-list',
  data() {
    return {
      supplierList: [],
      loading: false,
      finished: false,
      page: 1,
      size: 10
    }
  },
  methods: {
    onLoad() {
      getSupplierList({ page: this.page }).then(res => {
        console.log(res)

        this.supplierList = [...this.supplierList, ...res.rows]
        this.loading = false
        if (this.page * this.size >= res.total) {
          this.finished = true
        }
        this.page++
      })
    },
    goEdit(supplier) {
      this.$store.commit('SET_DATA_OBJ', supplier)
      this.$router.push({ path: '/supplier/edit' })
    }
  }
}
</script>

<style lang="scss" scoped>
.supplier {
  font-size: rem(14);
  background: #fff;

  .supplier-list {
    padding: rem(20);
  }

  .supplier-item {
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
}
</style>
