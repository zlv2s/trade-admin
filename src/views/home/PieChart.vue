<template>
  <div class="chart-item" ref="pieChart"></div>
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
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.pieChart, 'macarons')
      this.setOptions()
    },
    setOptions() {
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'top',
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5']
        },

        series: [
          {
            name: '半径模式',
            type: 'pie',
            radius: [20, 70],
            center: ['25%', '50%'],
            roseType: 'radius',
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { value: 10, name: 'rose1' },
              { value: 5, name: 'rose2' },
              { value: 15, name: 'rose3' },
              { value: 25, name: 'rose4' },
              { value: 20, name: 'rose5' }
            ]
          },
          {
            name: '面积模式',
            type: 'pie',
            radius: [20, 70],
            center: ['75%', '50%'],
            roseType: 'area',
            data: [
              { value: 10, name: 'rose1' },
              { value: 5, name: 'rose2' },
              { value: 15, name: 'rose3' },
              { value: 25, name: 'rose4' },
              { value: 20, name: 'rose5' }
            ]
          }
        ]
      }

      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped></style>
