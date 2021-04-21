<template>
  <div class="setting">
    <div class="avatar-box">
      <div class="avatar-wrapper">
        <van-image round width="1rem" height="1rem" :src="avatarURL" />
        <i @click="uploadImage" class="iconfont icon-edit1"></i>
        <van-circle
          v-if="isLoading"
          class="circle-box"
          color="#f40"
          v-model="loadindPercent"
          :rate="100"
        />
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
      <van-button @click="logout" block color="#1989fa">退出系统</van-button>
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
      isShowModal: false,
      isLoading: false,
      loadindPercent: 0,
      imgPath: ''
    }
  },
  computed: {
    avatarURL() {
      return this.imgPath
        ? `http://127.0.0.1:8080/api${this.imgPath}`
        : 'https://img01.yzcdn.cn/vant/cat.jpeg'
    }
  },
  methods: {
    logout() {
      this.$store.commit('user/CLEAR_ALL')
      storage.local.clear()
      storage.session.clear()
      debugger
      this.$router.replace({ path: '/login' })
    },

    clearCache() {
      storage.session.clear()
      this.$toast('缓存清除成功！')
    },

    openPwdChangeModal() {
      this.isShowModal = true
    },

    onUploadProgress(e) {
      this.loadingPercent = Math.ceil((e.loaded / e.total) * 100)
    },

    uploadImage() {
      const vm = this
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.onchange = function() {
        const fd = new FormData()
        const file = this.files[0]
        fd.append('fileName', file)
        vm.isLoading = true
        uploadFile(fd, vm.onUploadProgress).then(res => {
          console.log(111, res)
          vm.imgPath = res[0].path
          vm.isLoading = false
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

      .circle-box {
        position: absolute;
        left: 0;
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
