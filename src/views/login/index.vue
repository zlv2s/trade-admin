<template>
  <div class="login">
    <h2 class="title"><i class="iconfont icon-maoyi"></i>贸易跟单系统</h2>
    <form>
      <div class="form-item">
        <label for="phone"
          ><i class="iconfont icon-xingmingyonghumingnicheng"></i
        ></label>
        <input
          type="text"
          id="phone"
          v-model="userInfo.phone"
          placeholder="请输入手机号码"
        />
      </div>
      <div class="form-item">
        <label for="verify-code"><i class="iconfont icon-mima"></i></label>
        <div class="input-box">
          <input
            type="text"
            id="verify-code"
            v-model="userInfo.verifyCode"
            placeholder="请输入验证码"
          />
          <span class="sep">|</span>
          <input type="button" @click="fetchVerifyCode" :value="btnInfo" />
        </div>
      </div>
      <div class="form-item">
        <input
          type="checkbox"
          :checked="isRemberMe"
          class="rember-me"
          id="rember-me"
        /><span class="tips">是否七天免登陆？</span>
      </div>
      <div class="form-item">
        <!-- button 标签默认点击会触发表单提交事件 -->
        <van-button @click.prevent="login" type="primary" block
          >登录</van-button
        >
      </div>
    </form>
  </div>
</template>

<script>
import { getVerifyCode } from '@api/auth'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      userInfo: {
        phone: '13397978989',
        verifyCode: '2213'
      },
      isRemberMe: false,
      btnInfo: '获取验证码'
    }
  },
  methods: {
    ...mapActions('user', ['doLogin']),
    // 登录
    login() {
      this.doLogin({
        phone: this.userInfo.phone,
        vdtCode: this.userInfo.verifyCode
      }).then(res => {
        console.log(res)
        this.$router.push('/home')
      })
    },

    // 验证码获取
    fetchVerifyCode() {
      getVerifyCode(this.userInfo.phone).then(res => {
        this.userInfo.verifyCode = res.vdtCode
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
  margin-top: rem(80);
  .title {
    font-size: rem(24);
    color: #7e9cff;
    .iconfont {
      font-size: rem(24);
      margin-right: rem(10);
    }
  }

  form {
    padding: rem(40);

    .form-item {
      display: flex;
      align-items: center;
      margin-bottom: rem(30);

      font-size: rem(14);
      padding-bottom: rem(10);

      &:nth-of-type(-n + 2) {
        border-bottom: 1px solid#eee;
      }

      label {
        color: #ff7ed7;
      }

      input {
        border: none;
        outline: none;
        background: none;
        text-indent: rem(14);
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }

      .rember-me {
        width: 1.3em;
        height: 1.3em;
        background-color: white;
        border-radius: 50%;
        vertical-align: middle;
        border: 1px solid #ddd;
        -webkit-appearance: none;
        outline: none;
        cursor: pointer;

        &:checked {
          background-color: $base-font-color;
        }
      }

      .tips {
        text-indent: rem(14);
      }

      .input-box {
        display: flex;
        align-items: center;
      }

      .sep {
        color: #d2d2d2;
      }
    }
  }
}
</style>
