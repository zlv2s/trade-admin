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
        <i
          class="iconfont icon-bianji1"
          @click="handleEditAction(material)"
        ></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { getMaterialList } from '@api/material'
export default {
  name: 'material-lsit',
  data() {
    return {
      materialList: []
    }
  },

  methods: {
    async getMaterial() {
      const res = await getMaterialList()
      this.materialList = res.rows
    },
    handleEditAction(material) {
      this.$store.commit('SET_DATA_OBJ', material)
      this.$router.push({ path: '/material/update-material' })
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
    line-height: rem(18);
    font-size: rem(18);
    padding: 0 rem(15);
    background: #fff;
    margin-top: rem(15);

    p {
      flex: 1;
      color: $title-color;
      font-size: rem(14);
    }

    .remark {
      font-size: rem(12);
      color: $light-grey;
    }

    .iconfont {
      font-size: rem(20);
    }
  }
}
</style>
