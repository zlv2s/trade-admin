<template>
  <div class="form-wrapper p-10">
    <p class="fz-14 m-y-10">基本信息</p>
    <van-form @submit="onSubmit">
      <van-field
        v-model="supplier.name"
        name="供应商名"
        label="供应商名"
        placeholder="供应商名"
        :rules="[{ required: true, message: '请填写供应商名' }]"
      />
      <van-field
        v-model="supplier.city"
        name="城市"
        label="城市"
        placeholder="城市"
        :rules="[{ required: true, message: '请填写城市' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click.prevent="showPopup('county')"
            >选择城市</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="supplier.address"
        name="详细地址"
        label="详细地址"
        placeholder="详细地址"
        :rules="[{ required: true, message: '请填写详细地址' }]"
      />
      <van-field
        v-model="supplier.contact"
        name="联系人"
        label="联系人"
        placeholder="联系人"
        :rules="[{ required: true, message: '请填写联系人' }]"
      />
      <van-field
        v-model="supplier.phone"
        name="联系电话"
        label="联系电话"
        placeholder="联系电话"
        :rules="[{ required: true, message: '请填写联系电话' }]"
      />
      <van-field
        v-model="supplier.code"
        name="信用码"
        label="信用码"
        placeholder="信用码"
        :rules="[{ required: true, message: '请填写信用码' }]"
      />
      <van-field
        v-model="supplier.remark"
        name="备注"
        label="备注"
        placeholder="备注"
      />
      <div style="margin: 20px;">
        <van-button block color="#416fff" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <van-popup v-model="popup.isShowPopup" position="bottom">
      <CountyPicker @hide="onHide" @selected="onSelected" />
    </van-popup>
  </div>
</template>

<script>
import { updateSupplier, saveSupplier } from '@api/supplier'
import CountyPicker from '@com/CountyPicker'
import popup from '@/mixin/popup'

export default {
  name: 'supplier-edit',
  mixins: [popup],
  data() {
    return {
      status: 0, // 0 编辑。1 新建
      supplier: {
        name: '',
        address: '',
        city: '',
        county: '',
        province: '',
        code: '',
        conatct: '',
        phone: '',
        remark: ''
      }
    }
  },

  methods: {
    async onSubmit() {
      if (this.status === 1) {
        await saveSupplier({
          ...this.supplier
        })
      } else {
        await updateSupplier({
          ...this.supplier
        })
      }
      this.$toast('操作成功')
      setTimeout(() => {
        this.$router.replace({ path: '/supplier/list' })
      }, 500)
    },

    onSelected(v) {
      this.supplier.address = v.join(',')
      this.supplier.province = v[0]
      this.supplier.city = v[1]
      this.supplier.county = v[2]
      this.isShowCitySelModal = false
      this.popup.isShowPopup = false
    }
  },

  created() {
    const data = this.$store.getters.dataObj
    if (data) {
      this.status = 0
      this.supplier = data
      this.$store.commit('SET_DATA_OBJ', null)
    } else {
      this.status = 1
    }
  },
  components: {
    CountyPicker
  }
}
</script>

<style lang="scss" scoped></style>
