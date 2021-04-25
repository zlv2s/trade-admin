<template>
  <van-form @submit="onSubmit" class="p-10">
    <!-- 项目信息 -->
    <div class="p-10">
      <p class="fz-14 m-y-10">项目基本信息</p>
      <van-field
        :value="userName"
        disabled
        name="创建人"
        label="创建人"
        placeholder="创建人"
        :rules="[{ required: true, message: '请填写创建人' }]"
      />

      <van-field
        v-model="receiving.createTime"
        name="创建时间"
        label="创建时间"
        placeholder="请选择创建时间"
        :rules="[{ required: true, message: '请选择日期' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click.prevent="showPopup('date')"
            >选择日期</van-button
          >
        </template>
      </van-field>
    </div>

    <!-- 采购单信息 -->
    <div class="p-10">
      <p class="fz-14 m-y-10">采购单信息</p>
      <van-field
        v-model="receiving.purchaseId"
        name="采购单"
        label="采购单"
        placeholder="采购单"
        :rules="[{ required: true, message: '请选择采购单' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click.prevent="showPopup('purchase')"
            >选择采购单</van-button
          >
        </template>
      </van-field>

      <van-field
        v-model="receiving.projectName"
        name="项目名"
        label="项目名"
        placeholder="项目名"
        :rules="[{ required: true, message: '请填写项目名' }]"
      />

      <van-field
        v-model="receiving.purchaserName"
        name="采购人"
        label="采购人"
        placeholder="采购人"
        :rules="[{ required: true, message: '请填写采购人' }]"
      />

      <van-field
        v-model="receiving.supplierName"
        name="供应商"
        label="供应商"
        placeholder="请选择供应商"
        :rules="[{ required: true, message: '请选择供应商' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click.prevent="showPopup('supplier')"
            >选择供应商</van-button
          >
        </template>
      </van-field>

      <van-field
        v-model="receiving.materialName"
        name="材料名"
        label="材料名"
        placeholder="材料名"
        :rules="[{ required: true, message: '请填写材料名' }]"
      />

      <van-field
        v-model="receiving.materialUnit"
        name="单位"
        label="单位"
        placeholder="单位"
        :rules="[{ required: true, message: '请填写单位' }]"
      />

      <van-field
        v-model="receiving.materialWeight"
        name="材料重量"
        label="材料重量"
        placeholder="材料重量"
        :rules="[{ required: true, message: '请填写材料重量' }]"
      />
    </div>

    <div class="p-10">
      <p class="fz-14 m-y-10">备注信息</p>
      <van-field
        v-model="receiving.remark"
        name="备注"
        label="备注"
        placeholder="备注"
      />
    </div>

    <van-popup v-model="popup.isShowPopup" position="bottom">
      <DatePicker
        v-if="popup.type === 'date'"
        @close="onHide"
        @selected="onSelected"
      />

      <DataPicker
        :type="popup.type"
        :valueKey="popup.type === 'purchase' ? 'id' : 'name'"
        v-else
        @hide="onHide"
        @selected="onSelected"
      />
    </van-popup>

    <div style="margin: 20px;">
      <van-button block color="#416fff" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script>
import DatePicker from '@com/DatePicker'
import DataPicker from '@com/DataPicker'

// import { getSupplierList } from '@api/supplier'
// import { getPurchaseList } from '@api/purchase'
import { saveReceiving, updateReceiving } from '@api/receiving'

import popup from '@/mixin/popup'

export default {
  mixins: [popup],
  data() {
    return {
      status: 1,
      receiving: {
        userId: '',
        userName: '',
        createTime: '',
        purchaserId: '',
        purchaserName: '',
        purchaseId: '',
        supplierId: '',
        supplierName: '',
        supplierContact: '',
        supplierPhone: '',
        materialId: '',
        materialName: '',
        materialUnit: '',
        materialWeight: '',
        price: '',
        remark: ''
      },

      dataList: []
    }
  },
  computed: {
    userName() {
      return this.$store.getters['user/user'].name
    }
  },
  methods: {
    async onSubmit() {
      if (this.status === 0) {
        console.log('更新采购单')
        await updateReceiving()
      } else {
        await saveReceiving({ ...this.purchase })
      }
      this.$toast(`${this.status ? '添加' : '更新'}成功`)
      setTimeout(() => {
        this.$router.replace({ path: '/receiving/list' })
      }, 500)
    },

    onSelected(v) {
      console.log(v)
      if (typeof v === 'string') {
        this.receiving.createTime = v
      } else {
        this.receiving[`${v.type}Name`] = v.value.name
        this.receiving[`${v.type}Id`] = v.value.id
      }
      this.dataList = []
      this.popup.isShowPopup = false
    }

    // async getDataList(type) {
    //   switch (type) {
    //     case 'purchase':
    //       this.dataList = (await getPurchaseList()).rows
    //       break
    //     case 'supplier':
    //       this.dataList = (await getSupplierList()).rows
    //       break
    //     default:
    //       break
    //   }
    // }
  },
  components: {
    DatePicker,
    DataPicker
  }
}
</script>

<style lang="scss" scoped></style>
