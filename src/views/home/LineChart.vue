<template>
  <div class="chart-item" ref="lineChart"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')

export default {
  data() {
    return {
      chart: null
    }
  },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },

  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },

  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.lineChart, 'macarons')
      this.setOptions(this.chartData)
    },

    setOptions(chartData) {
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: chartData.legendData
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: chartData.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: chartData.seriesData
      }
      this.chart.setOption(option)
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }
}
</script>

<style lang="scss" scoped></style>
