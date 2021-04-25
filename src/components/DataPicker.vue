<template>
  <van-picker
    show-toolbar
    :columns="dataList"
    :value-key="valueKey"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script>
import { getProjectList } from '@api/project'
import { getMaterialList } from '@api/material'
import { getSupplierList } from '@api/supplier'
import { getPurchaseList } from '@api/purchase'
// import { savePurchase, updatePurchase } from '@api/purchase'

export default {
  data() {
    return {
      dataList: []
    }
  },
  props: {
    passedList: {
      type: Array,
      default: () => []
    },

    type: {
      type: String,
      default: ''
    },
    valueKey: {
      type: String,
      default: 'text'
    }
  },
  watch: {
    type(newValue, oldValue) {
      if (newValue) {
        this.getDataList(newValue)
      }
    }
  },
  methods: {
    onConfirm(value) {
      console.log('emit selected', value)
      this.$emit('selected', this.type ? { type: this.type, value } : value)
    },
    onCancel() {
      console.log('emit cancel')
      this.$emit('hide')
    },
    async getDataList(type) {
      switch (type) {
        case 'project':
          this.dataList = (await getProjectList()).rows
          break
        case 'material':
          this.dataList = (await getMaterialList()).rows
          break
        case 'supplier':
          this.dataList = (await getSupplierList()).rows
          break
        case 'liable':
          this.dataList = this.passedList
          break
        case 'purchase':
          this.dataList = (await getPurchaseList()).rows
          break
        default:
          break
      }
    }
  },
  created() {
    this.getDataList(this.type)
  }
}
</script>

<style lang="scss" scoped></style>
