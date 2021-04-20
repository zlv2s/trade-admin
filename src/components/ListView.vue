<template>
  <van-list
    class="list-wrapper"
    v-model="$_loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    :offset="20"
    @load="emitLoad"
  >
    <div
      class="list-item"
      v-for="item in dataList"
      :key="item.id"
      @click="$emit('edit', item)"
    >
      <slot :dataItem="item"></slot>
    </div>
  </van-list>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    $_loading: {
      get() {
        return this.loading
      },

      set(v) {
        this.$emit('set-loading', v)
      }
    }
  },

  props: {
    dataList: {
      type: Array,
      default: () => []
    },

    finished: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    emitLoad() {
      console.log('emit loading')
      this.$emit('load')
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  padding: rem(20);
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: rem(20);
  padding-bottom: rem(10);
  border-bottom: 1px solid #ddd;

  .info {
    .title {
      font-weight: bold;
    }

    .address {
      font-size: rem(12);
    }

    .contact {
      color: #999;
      font-size: rem(12);
    }
  }

  i {
    font-size: rem(14);
  }
}
</style>
