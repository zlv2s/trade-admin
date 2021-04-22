<template>
  <div class="user-list">
    <div class="search-box">
      <van-search
        v-model="txt"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>

    <div class="view-wrapper">
      <list-view
        :dataList="userList"
        :finished="finished"
        :loading="loading"
        @load="onLoad"
        @set-loading="onSetLoading"
      >
        <template v-slot="{ dataItem: item }">
          <p @click="onClick(item)" class="user-item fz-14">
            {{ item.id + ':' + item.name }}
          </p>
        </template>
      </list-view>
    </div>
  </div>
</template>

<script>
import ListView from './ListView'
import { getUserList } from '@api/user'
export default {
  data() {
    return {
      txt: '',
      userList: [],
      dataList: [],
      finished: false,
      loading: false,
      page: 1,
      size: 10,
      total: 0
    }
  },
  methods: {
    onSetLoading(v) {
      this.loading = v
    },

    onLoad() {
      console.log('receive loading')
      if (this.finished) return
      this.getList(this.page)
    },
    async onSearch() {
      // 数据已全部获取
      if (this.dataList.length === this.total) {
        this.userList = this.dataList.filter(x => x.name.includes(this.txt))
      } else {
        this.userList = (await getUserList({ name: this.txt, size: 9999 })).rows
        this.finished = true
      }
    },
    onCancel() {
      this.txt = ''
      this.userList = this.dataList
    },
    onClick(value) {
      this.$emit('selected', { type: 'approver', value })
    },
    async getList(page) {
      const res = await getUserList({ page })
      this.total = res.total
      console.log(res)
      this.userList = [...this.userList, ...res.rows]
      this.dataList = this.userList
      this.loading = false
      if (this.page * this.size >= res.total) {
        this.finished = true
      } else {
        this.page++
      }
    }
  },
  computed: {},
  created() {
    this.loading = true
    this.getList()
  },
  components: {
    ListView
  }
}
</script>

<style lang="scss" scoped>
.user-list {
  overflow-y: auto;
  height: 400px;

  .search-box {
    position: absolute;
    width: 100%;
  }

  .view-wrapper {
    padding-top: 54px;
  }
}
</style>
