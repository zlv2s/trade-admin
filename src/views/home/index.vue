<template>
  <div>
    welocme
  </div>
</template>

<script>
import { getUserInfo } from '@api/user'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['token'])
  },
  created() {
    getUserInfo()
  }
}
</script>

<style lang="scss" scoped></style>
