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
        v-model="purchase.createTime"
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

      <van-field
        v-model="purchase.projectName"
        name="项目名称"
        label="项目名称"
        placeholder="请选择项目"
        :rules="[{ required: true, message: '请选择项目' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click.prevent="showPopup('project')"
            >选择项目</van-button
          >
        </template>
      </van-field>
    </div>

    <!-- 材料信息 -->
    <div class="p-10">
      <p class="fz-14 m-y-10">材料信息</p>
      <van-field
        v-model="purchase.materialName"
        name="材料名称"
        label="材料名称"
        placeholder="材料"
        :rules="[{ required: true, message: '请选择材料' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click.prevent="showPopup('material')"
            >选择材料</van-button
          >
        </template>
      </van-field>

      <van-field
        v-model="purchase.materialWeight"
        name="材料重量"
        label="材料重量"
        placeholder="材料重量"
        :rules="[{ required: true, message: '请填写材料重量' }]"
      />

      <van-field
        v-model="purchase.materialUnit"
        name="单位"
        label="单位"
        placeholder="单位"
        :rules="[{ required: true, message: '请填写单位' }]"
      />

      <van-field
        v-model="purchase.price"
        name="材料单价"
        label="材料单价"
        placeholder="材料单价"
        :rules="[{ required: true, message: '请填写材料单价' }]"
      />
    </div>

    <!-- 供应商信息 -->
    <div class="p-10">
      <p class="fz-14 m-y-10">供应商信息</p>
      <van-field
        v-model="purchase.supplierName"
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
        v-model="purchase.supplierContact"
        name="联系人"
        label="联系人"
        placeholder="联系人"
        :rules="[{ required: true, message: '请填写联系人' }]"
      />

      <van-field
        v-model="purchase.supplierPhone"
        name="电话"
        label="电话"
        placeholder="电话"
        :rules="[{ required: true, message: '请填写电话' }]"
      />
    </div>

    <!-- 审批信息 -->
    <div class="p-10">
      <p class="fz-14 m-y-10">审批信息</p>
      <van-field
        v-model="purchase.approver"
        name="审批人"
        label="审批人"
        placeholder="请选择审批人"
        :rules="[{ required: true, message: '请选择审批人' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click.prevent="showPopup('approver')"
            >选择审批人</van-button
          >
        </template>
      </van-field>

      <van-field
        v-model="purchase.remark"
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
      <UserList v-else-if="popup.type === 'approver'" @selected="onSelected" />
      <DataPicker
        :type="popup.type"
        :dataList="dataList"
        valueKey="name"
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
import UserList from '@com/UserList'
import { getProjectList } from '@api/project'
import { getMaterialList } from '@api/material'
import { getSupplierList } from '@api/supplier'

import { savePurchase, updatePurchase } from '@api/purchase'

export default {
  data() {
    return {
      status: 1,
      purchase: {
        nextId: 'nextId-1',
        createId: 'createId-1',
        approver: '',
        // createName: '',
        createTime: '',
        projectId: '',
        projectName: '',
        materialId: '',
        materialName: '',
        materialUnit: '',
        materialWeight: '',
        price: '',
        supplierId: '',
        supplierName: '',
        supplierContact: '',
        supplierPhone: '',
        remark: ''
      },
      popup: {
        type: '',
        isShowPopup: false
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
        await updatePurchase()
      } else {
        await savePurchase({ createName: this.userName, ...this.purchase })
      }
      this.$toast(`${this.status ? '添加' : '更新'}成功`)
      setTimeout(() => {
        this.$router.replace({ path: '/purchase/list' })
      }, 500)
    },

    showPopup(type) {
      this.popup.type = type
      this.getDataList(type)
      this.popup.isShowPopup = true
    },

    onHide() {
      this.popup.isShowPopup = false
    },

    onSelected(v) {
      console.log(v)

      if (typeof v === 'string') {
        this.purchase.createTime = v
      } else {
        if (v.type === 'approver') {
          this.purchase[v.type] = v.value.name
        } else {
          this.purchase[`${v.type}Name`] = v.value.name
          this.purchase[`${v.type}Id`] = v.value.id
        }
      }

      this.popup.isShowPopup = false
      // this.projectName = ''
      // this.materialName = ''
      // this.supplierName = ''
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
        default:
          break
      }
    }
  },
  components: {
    DatePicker,
    DataPicker,
    UserList
  }
}
</script>

<style lang="scss" scoped></style>
