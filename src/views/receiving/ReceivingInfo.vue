<template>
  <div class="purchase-info fz-16" v-if="Object.keys(receiving).length">
    <div class="info-box" v-for="item in info" :key="item.title">
      <info-item :title="item.title">
        <p
          class="p-10 fz-14 van-hairline--bottom"
          v-for="(k, v) in item.content"
          :key="k"
        >
          {{ v }}：{{ k }}
        </p>
      </info-item>
    </div>
    <div class="info-box" :key="timeLine.title">
      <info-item :title="timeLine.title">
        <van-steps direction="vertical" :active="timeLine.content.length">
          <van-step v-for="item in timeLine.content" :key="item.time">
            <h3 class="fz-14">{{ item.remark || '无记录' }}</h3>
            <p class="fz-12">
              {{ item.time | formatTime }} {{ item.userName }}
            </p>
          </van-step>
        </van-steps>
      </info-item>
    </div>
  </div>
</template>

<script>
import { getReceivingDetail } from '@api/receiving'
import InfoItem from '@com/InfoItem'

export default {
  data() {
    return {
      receiving: {}
    }
  },
  computed: {
    receivingId() {
      return this.$route.params.receivingId
    },
    info() {
      return { basic: this.receiving.basic, supplier: this.receiving.supplier }
    },
    timeLine() {
      return this.receiving.timeLine
    }
  },
  methods: {
    async getDetail() {
      const data = await getReceivingDetail(this.receivingId)
      const basicMap = {
        projectName: '项目名称',
        state: '项目状态',
        materialName: '材料名称',
        materialWeight: '重量',
        materialUnit: '单位',
        price: '应付',
        salePrice: '单价',
        userName: '建单人',
        createTime: '建单时间'
      }
      const supplierMap = {
        supplierName: '供应商名',
        supplierContact: '联系人',
        supplierPhone: '联系电话'
      }

      const basic = Object.entries(basicMap).reduce(
        (res, [k, v]) => {
          if (k in data) {
            res.content[v] = data[k]
          }
          return res
        },
        { title: '收货基本信息', content: {} }
      )

      const supplier = Object.entries(supplierMap).reduce(
        (res, [k, v]) => {
          if (k in data) {
            res.content[v] = data[k]
          }
          return res
        },
        { title: '供应商信息', content: {} }
      )

      const timeLine = { title: '环节信息', content: data.remark }

      console.log(this.receiving)
      this.$set(this.receiving, 'basic', basic)
      this.$set(this.receiving, 'supplier', supplier)
      this.$set(this.receiving, 'timeLine', timeLine)
    }
  },
  created() {
    this.getDetail()
  },
  components: {
    InfoItem
  }
}
</script>

<style lang="scss" scoped></style>
