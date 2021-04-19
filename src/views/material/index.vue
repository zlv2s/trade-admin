<template>
  <div>
    <ul class="material-list">
      <li
        class="material-item"
        v-for="material in materialList"
        :key="material.id"
      >
        <p>
          {{ material.name | format
          }}<span class="remark">{{ material.remark }}</span>
        </p>
        <i class="iconfont icon-bianji1"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { getMaterialList } from '@api/material'
export default {
  data() {
    return {
      materialList: []
    }
  },
  methods: {
    async getMaterial() {
      const res = await getMaterialList()
      this.materialList = res.rows
    }
  },

  created() {
    this.getMaterial()
  },

  filters: {
    format(v) {
      return v.substr(0, 6) + '...'
    }
  }
}
</script>

<style lang="scss" scoped>
.material-list {
  padding: 0 rem(8);

  .material-item {
    display: flex;
    align-items: center;
    line-height: rem(20);
    font-size: rem(18);
    padding: 0 rem(15);
    background: #fff;
    margin-top: rem(15);

    p {
      flex: 1;
      color: $title-color;
    }

    .remark {
      font-size: rem(14);
      color: $light-grey;
    }

    .iconfont {
      font-size: rem(20);
    }
  }
}
</style>
