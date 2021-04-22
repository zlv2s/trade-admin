<template>
  <div class="list">
    <Search @search="onSearch" @clear="onClear" />
    <list-view
      style="background: #fff"
      :dataList="receivingList"
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
              @click="$router.push({ path: `/receiving/info/${item.id}` })"
            />
          </template>
        </van-swipe-cell>
      </template>
    </list-view>
  </div>
</template>

<script>
import { getReceivingList } from '@api/receiving'
import ListView from '@com/ListView'
import Search from '@com/Search'

export default {
  data() {
    return {
      receivingList: [],
      resList: [],
      loading: false,
      finished: false,
      page: 1,
      size: 10
    }
  },
  methods: {
    async getList(page) {
      const res = await getReceivingList({ page })
      console.log(res)
      this.receivingList = [...this.receivingList, ...res.rows]
      this.resList = this.receivingList
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
    },

    async onSearch(txt) {
      console.log(txt)
      this.receivingList = (
        await getReceivingList({ projectName: txt, size: 9999 })
      ).rows
      this.finished = true
    },
    onClear() {
      this.receivingList = this.resList
    }
  },

  created() {
    this.loading = true
    this.getList(this.page)
  },
  components: {
    ListView,
    Search
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
