<template>
  <div class="setting">
    <div class="avatar-box">
      <div class="avatar-wrapper">
        <van-image
          round
          width="1rem"
          height="1rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <i @click="uploadImage" class="iconfont icon-edit1"></i>
      </div>
    </div>
    <div class="func-box">
      <ul class="func-list">
        <li @click="clearCache" class="func-item">
          <span>清除缓存</span
          ><i class="iconfont icon-Icon-KeyboardArrow-Down-Rounded"></i>
        </li>
        <li @click="openPwdChangeModal" class="func-item">
          <span>修改密码</span
          ><i class="iconfont icon-Icon-KeyboardArrow-Down-Rounded"></i>
        </li>
      </ul>
    </div>
    <div class="btn-box">
      <van-button @click="logout" block color="#416fff">退出系统</van-button>
    </div>
    <PasswordChange :isShowModal.sync="isShowModal" />
  </div>
</template>

<script>
import storage from '@utils/storage'
import { uploadFile } from '@api/upload'
import PasswordChange from './PasswordChange'

export default {
  data() {
    return {
      isShowModal: false
    }
  },
  methods: {
    logout() {
      this.$store.commit('user/CLEAR_ALL')
      storage.local.clear()
      storage.session.clear()
      this.$router.replace({ path: '/login ' })
    },

    clearCache() {
      storage.session.clear()
      this.$toast('缓存清除成功！')
    },

    openPwdChangeModal() {
      this.isShowModal = true
    },

    uploadImage() {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.onchange = function() {
        const fd = new FormData()
        const file = this.files[0]
        fd.append('fileName', file)

        uploadFile(fd).then(res => {
          console.log(res)
        })
      }
      input.click()
    }
  },
  components: {
    PasswordChange
  }
}
</script>

<style lang="scss" scoped>
.setting {
  height: 100%;
  padding-top: rem(20);
  font-size: rem(16);
  .avatar-box {
    display: flex;
    justify-content: center;
    .avatar-wrapper {
      position: relative;
      i {
        position: absolute;
        top: rem(2);
        left: rem(100);
        font-size: rem(18);
      }
    }
  }
  .func-box {
    flex: 1;
    margin-top: rem(60);
    .func-list {
      .func-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: rem(10);
        margin-top: rem(15);
        background: $color-w;
        font-size: rem(14);

        i {
          font-size: rem(20);
        }
      }
    }
  }

  .btn-box {
    width: 80%;
    margin: rem(150) auto;
  }
}
</style>
