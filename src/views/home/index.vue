<template>
  <div class="main">
    <van-swipe class="swipe-box" :show-indicators="false">
      <van-swipe-item>
        <line-chart
          v-if="Object.keys(chartData).length"
          :chartData="chartData"
        />
      </van-swipe-item>
      <van-swipe-item>
        <pie-chart />
      </van-swipe-item>
    </van-swipe>
    <div class="menu-items">
      <items />
    </div>
  </div>
</template>

<script>
import { getPaymentStats, getCollectStats } from '@api/stats'
import LineChart from './LineChart'
import PieChart from './PieChart'
import Items from './Items'

export default {
  name: 'Home',
  data() {
    return {
      chartData: {}
    }
  },

  methods: {
    transfomData(list) {
      const [payments, collection] = list
      const paymentsObj = payments.reduce(
        (acc, x) => {
          acc.date.push(x.date.substr(5))
          acc.paid.push(x.paid)
          acc.payable.push(x.payable)
          return acc
        },
        { date: [], paid: [], payable: [] }
      )

      const collectObj = collection.reduce(
        (acc, x) => {
          acc.received.push(x.received)
          acc.receiving.push(x.receiving)
          return acc
        },
        {
          received: [],
          receiving: []
        }
      )
      const dataObj = { ...paymentsObj, ...collectObj }

      const map = {
        paid: '已付',
        payable: '应付',
        received: '已收',
        receiving: '应收'
      }

      return {
        legendData: Object.keys(dataObj)
          .filter(x => x !== 'date')
          .map(x => map[x]),
        xAxisData: dataObj.date,
        seriesData: Object.entries(dataObj)
          .filter(([k, v]) => k !== 'date')
          .map(([k, v]) => ({
            name: map[k],
            type: 'line',
            stack: '总量',
            data: v
          }))
      }
    }
  },

  async created() {
    this.chartData = this.transfomData(
      await Promise.all([getPaymentStats(), getCollectStats()])
    )
  },

  components: { LineChart, PieChart, Items }
}
</script>

<style lang="scss" scoped>
.main {
  .swipe-box {
    padding-top: rem(25);
    .chart-item {
      width: 100%;
      height: rem(300);
    }
  }

  .menu-items {
    padding: rem(20);
  }
}
</style>
