<template>
  <div>
    welocme
  </div>
</template>

<script>
import { getUserInfo } from '@api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters('user', ['id'])
  },

  async created() {
    const user = await getUserInfo(this.id)
    console.log(user)
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
