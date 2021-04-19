<template>
  <div class="form-wrapper">
    <p>基本信息</p>
    <van-form @submit="onSubmit">
      <van-field
        v-model="material.name"
        name="材料名称"
        label="材料名称"
        placeholder="材料名称"
        :rules="[{ required: true, message: '请填写材料名称' }]"
      />
      <van-field
        v-model="material.parentName"
        name="材料类型"
        label="材料类型"
        placeholder="材料类型"
        :rules="[{ required: true, message: '请填写材料类型' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="() => (isShowTypeModal = true)"
            >选择类型</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="material.remark"
        name="备注"
        label="备注"
        placeholder="备注"
      />
      <div style="margin: 20px;">
        <van-button block color="#416fff" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <van-popup v-model="isShowTypeModal" position="bottom">
      <van-picker
        title="材料类型"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { getMaterialList, updateMaterial } from '@api/material'
export default {
  name: 'new-material',
  data() {
    return {
      isShowTypeModal: false,
      materialList: [],
      material: {
        name: '',
        parentId: '',
        parentName: '',
        remark: '',
        state: ''
      }
    }
  },
  computed: {
    columns() {
      return this.materialList.map(x => x.name)
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
      updateMaterial({
        id: this.material.id,
        parentId: this.material.parentId,
        name: this.material.name,
        remark: this.material.remark
      }).then(res => {
        console.log(res)
        this.$toast('更新成功！')
        setTimeout(() => {
          this.$router.go(-1)
        }, 800)
      })
    },

    onConfirm(val) {
      this.material.parentName = val
      this.isShowTypeModal = false
    },

    onCancel() {
      this.isShowTypeModal = false
    }
  },

  async created() {
    const dataObj = this.$store.getters.dataObj
    if (dataObj) {
      this.material = dataObj
      this.$store.commit('SET_DATA_OBJ', null)
    }

    const res = await getMaterialList()
    this.materialList = res.rows
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  padding: rem(10);
  p {
    font-size: rem(14);
  }
}
</style>
