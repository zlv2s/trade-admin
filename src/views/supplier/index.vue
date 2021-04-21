<template>
  <div class="list">
    <list-view
      :dataList="supplierList"
      :finished="finished"
      :loading="loading"
      @edit="onEdit"
      @load="onLoad"
      @set-loading="onSetLoading"
    >
      <template v-slot="{ dataItem: item }">
        <div class="info">
          <p class="title mb-10">{{ item.name }}</p>
          <p class="address mb-10">{{ item.address }}</p>
          <p class="contact">
            <span>联系人：{{ item.contact }}，手机{{ item.phone }}</span>
          </p>
        </div>
        <i class="iconfont icon-fanhui1"></i>
      </template>
    </list-view>
  </div>
</template>

<script>
import ListView from '@com/ListView'
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

  components: { ListView },
  methods: {
    onEdit(item) {
      console.log('edit', item)

      this.$store.commit('SET_DATA_OBJ', item)
      this.$router.push({ path: '/supplier/edit' })
    },

    onSetLoading(v) {
      this.loading = v
    },

    getList(page) {
      getSupplierList({ page }).then(res => {
        console.log(res)
        this.supplierList = [...this.supplierList, ...res.rows]
        this.loading = false
        if (this.page * this.size >= res.total) {
          this.finished = true
        }
        this.page++
      })
    },

    onLoad() {
      console.log('receive loading')
      this.getList(this.page)
    }
  },
  async created() {
    // 第一次进入开启 loading
    this.loading = true
    await this.getList(this.page)
  }
}
</script>

<style lang="scss" scoped>
.list {
  font-size: rem(14);
  background: #fff;

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: rem(20);
    padding-bottom: rem(10);
    border-bottom: 1px solid #ddd;

    .info {
      .title {
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
