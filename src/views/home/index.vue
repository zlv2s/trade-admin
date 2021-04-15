<template>
  <div>
    welocme
  </div>
</template>

<script>
import { getUserInfo } from '@api/user'
import { mapGetters, mapActions } from 'vuex'
import config from '@config'
import storage from '@utils/storage'

export default {
  name: 'Home',
  computed: {
    ...mapGetters('user', ['id'])
  },

  async created() {
    const user = await getUserInfo(this.id)
    console.log(user)
  },
  methods: {
    ...mapActions('user', ['autoLogin']),
    async checkLogin() {
      const token = storage.get(config.TOKEN_KEY)
      if (token) {
        const res = await this.autoLogin()
        console.log(res)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
