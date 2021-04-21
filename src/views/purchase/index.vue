<template>
  <!-- <div class="purchase p-y-10">
    <van-swipe-cell
      v-for="purchase in purchaseList"
      :key="purchase.id"
      class="mb-10"
    >
      <div class="purchase-item p-10">
        <p class="title fz-16 fw-700 mb-10">
          {{ purchase.projectName }} --
          <span class="fz-12 fw-n">{{ purchase.materialName }}</span>
        </p>
        <p class="info fz-12">
          供应商：{{ purchase.supplierName }}，数量：{{
            purchase.materialWeight + purchase.materialUnit
          }}
        </p>
      </div>
      <template #right>
        <van-button square type="danger" text="付款" @click="doPayment" />
        <van-button square type="primary" text="详情" @click="goDetail" />
      </template>
    </van-swipe-cell>
  </div> -->
  <div class="list">
    <list-view
      :dataList="purchaseList"
      :finished="finished"
      :loading="loading"
      @load="onLoad"
      @set-loading="onSetLoading"
    >
      <template v-slot="{ dataItem: item }">
        <van-swipe-cell class="w-100">
          <div class="purchase-item">
            <p class="title fz-16 fw-700 mb-10">
              {{ item.projectName }} --
              <span class="fz-12 fw-n">{{ item.materialName }}</span>
            </p>
            <p class="info fz-12">
              供应商：{{ item.supplierName }}，数量：{{
                item.materialWeight + item.materialUnit
              }}
            </p>
          </div>
          <template #right>
            <van-button square type="danger" text="付款" @click="doPayment" />
            <van-button
              square
              type="primary"
              text="详情"
              @click="$router.push({ path: `/purchase/info/${item.id}` })"
            />
          </template>
        </van-swipe-cell>
      </template>
    </list-view>
  </div>
</template>

<script>
import { getPurchaseList } from '@api/purchase'
import ListView from '@com/ListView'
export default {
  data() {
    return {
      purchaseList: [],
      loading: false,
      finished: false,
      page: 1,
      size: 10
    }
  },
  methods: {
    async getList(page) {
      const res = await getPurchaseList({ page })
      console.log(res)
      this.purchaseList = [...this.purchaseList, ...res.rows]
      this.loading = false
      if (this.page * this.size >= res.total) {
        this.finished = true
      }
      this.page++
    },

    doPayment() {
      console.log('make payment')
    },

    onSetLoading(v) {
      this.loading = v
    },

    onLoad() {
      console.log('receive loading')
      this.getList(this.page)
    }
  },
  created() {
    this.loading = true
    this.getList(this.page)
  },
  components: {
    ListView
  }
}
</script>

<style lang="scss" scoped>
.list {
  &::v-deep .van-swipe-cell__right {
    font-size: 16px;
  }

  &::v-deep .van-swipe-cell__right .van-button {
    height: 100%;
  }
}
</style>
