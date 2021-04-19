<template>
  <van-popup
    position="bottom"
    v-model="isShowModal"
    :close-on-click-overlay="false"
  >
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        disabled
      />
      <van-field
        v-model.trim="userInfo.password"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model.trim="userInfo.confirmPassword"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="btn-box">
        <van-button
          size="small"
          :disabled="isDisabled"
          color="#416fff"
          native-type="submit"
          >提交</van-button
        >
        <van-button size="small" @click.prevent="onCancel">取消</van-button>
      </div>
    </van-form>
  </van-popup>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateUser } from '@api/user'
export default {
  data() {
    return {
      userInfo: {
        password: '',
        confirmPassword: ''
      }
    }
  },

  computed: {
    ...mapGetters('user', ['user']),
    isDisabled() {
      return (
        !this.userInfo.password ||
        this.userInfo.password !== this.userInfo.confirmPassword
      )
    }
  },

  methods: {
    onCancel() {
      this.$emit('update:isShowModal', false)
      this.userInfo.password = ''
      this.userInfo.confirmPassword = ''
    },

    async onSubmit() {
      const res = await updateUser({
        id: this.user.id,
        password: this.userInfo.password
      })
      console.log(res)
      this.$toast('密码更改成功')
      setTimeout(() => {
        this.$router.replace({ path: '/login' })
      }, 500)
    }
  },

  props: {
    isShowModal: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  margin: 16px;
  text-align: center;
  button {
    width: rem(140);
    &:first-of-type {
      margin-right: rem(10);
    }
  }
}
</style>
