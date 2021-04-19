<template>
  <van-popup
    position="bottom"
    v-model="isShowModal"
    :close-on-click-overlay="false"
  >
    <van-form @submit="onSubmit">
      <van-field
        v-model="userInfo.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        disabled
      />
      <van-field
        v-model="userInfo.password"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="userInfo.confirmPassword"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button color="#416fff" native-type="submit">提交</van-button>
        <van-button @click="$emit('update:isShowModal', false)"
          >取消</van-button
        >
      </div>
    </van-form>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        phone: '111',
        password: '46464',
        confirmPassword: '54163465'
      }
    }
  },

  props: {
    isShowModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>

<style lang="scss" scoped></style>
