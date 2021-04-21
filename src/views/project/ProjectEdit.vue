<template>
  <van-form @submit="onSubmit">
    <!-- 项目信息 -->
    <div class="p-10">
      <p class="fz-14 m-y-10">项目基本信息</p>
      <van-field
        v-model="project.name"
        name="项目名"
        label="项目名"
        placeholder="项目名"
        :rules="[{ required: true, message: '请填写项目名' }]"
      />

      <van-field
        v-model="project.signTime"
        name="签订日期"
        label="签订日期"
        placeholder="请选择日期"
        :rules="[{ required: true, message: '请选择日期' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click.prevent="showPopup('date')"
            >选择日期</van-button
          >
        </template>
      </van-field>

      <van-field
        v-model="project.county"
        name="地市"
        label="地市"
        placeholder="请选择地市"
        :rules="[{ required: true, message: '请选择地市' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click.prevent="showPopup('county')"
            >选择地市</van-button
          >
        </template>
      </van-field>

      <van-field
        v-model="project.address"
        name="详细地址"
        label="详细地址"
        placeholder="详细地址"
        :rules="[{ required: true, message: '请填写详细地址' }]"
      />

      <van-field
        v-model="project.liableName"
        name="负责人"
        label="负责人"
        placeholder="负责人"
        :rules="[{ required: true, message: '请选择负责人' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click.prevent="showPopup('liable')"
            >选择负责人</van-button
          >
        </template>
      </van-field>

      <van-field
        v-model="project.phone"
        name="联系电话"
        label="联系电话"
        placeholder="联系电话"
        :rules="[{ required: true, message: '请填写联系电话' }]"
      />

      <van-field
        v-model="project.projectRemark"
        name="备注"
        label="备注"
        placeholder="备注"
      />
    </div>

    <!-- 业主信息 -->
    <div class="form-wrapper p-10">
      <p class="fz-14 m-y-10">业主信息</p>
      <van-field
        v-model="project.ownerName"
        name="业主"
        label="业主"
        placeholder="业主"
        :rules="[{ required: true, message: '请填写业主' }]"
      />

      <van-field
        v-model="project.ownerAddress"
        name="业主地址"
        label="业主地址"
        placeholder="业主地址"
        :rules="[{ required: true, message: '请填写业主地址' }]"
      />

      <van-field
        v-model="project.ownerPhone"
        name="联系电话"
        label="联系电话"
        placeholder="联系电话"
        :rules="[{ required: true, message: '请填写联系电话' }]"
      />
    </div>

    <!-- 备注信息 -->
    <div class="form-wrapper p-10">
      <p class="fz-14 m-y-10">备注信息</p>
      <van-field
        v-model="project.remark"
        name="备注"
        label="备注"
        placeholder="备注"
      />
    </div>
    <div style="margin: 20px;">
      <van-button block color="#416fff" native-type="submit">提交</van-button>
    </div>
    <van-popup v-model="popup.isShowPopup" position="bottom">
      <CountyPicker
        v-if="popup.type === 'county'"
        @hide="onHide"
        @selected="onSelected"
      />
      <DatePicker
        v-if="popup.type === 'date'"
        @close="onHide"
        @selected="onSelected"
      />
      <DataPicker
        :dataList="liableList"
        v-if="popup.type === 'liable'"
        @hide="onHide"
        @selected="onSelected"
      />
    </van-popup>
  </van-form>
</template>

<script>
import CountyPicker from '@com/CountyPicker'
import DatePicker from '@com/DatePicker'
import DataPicker from '@com/DataPicker'
import { getProjectList, saveProject, updateProject } from '@api/project'
export default {
  data() {
    return {
      projectList: [],
      project: {
        address: '',
        city: '',
        county: '',
        liableId: '',
        liableName: '',
        name: '',
        ownerAddress: '',
        ownerName: '',
        ownerPhone: '',
        province: '',
        remark: '',
        projectRemark: '',
        signTime: '',
        state: ''
      },
      popup: {
        type: '',
        isShowPopup: false
      },
      status: 0
    }
  },
  computed: {
    liableList() {
      return this.projectList.map(x => x.liableName).filter(x => !!x)
    }
  },
  methods: {
    async getProjectList() {
      this.projectList = (await getProjectList({ page: 1 })).rows
    },
    showPopup(type) {
      this.popup.type = type
      this.popup.isShowPopup = true
    },

    onHide() {
      this.popup.isShowPopup = false
    },

    onSelected(v) {
      console.log(this.popup.type + ' received: ' + v)

      switch (this.popup.type) {
        case 'date':
          this.project.signTime = v
          break
        case 'county':
          this.project.address = v.join(',')
          this.project.province = v[0]
          this.project.city = v[1]
          this.project.county = v[2]
          break
        case 'liable':
          this.project.liableName = v
          break
        default:
          break
      }
      this.popup.isShowPopup = false
    },

    async onSubmit(v) {
      if (this.status === 1) {
        await saveProject({ ...this.project })
      } else {
        await updateProject({ ...this.project })
      }
      this.$toast('操作成功')
      setTimeout(() => {
        this.$router.replace({ path: '/project/list' })
      }, 500)
    }
  },

  created() {
    this.getProjectList()
    const project = this.$store.getters.dataObj
    if (project) {
      this.status = 0
      this.project = project
      this.$store.commit('SET_DATA_OBJ', null)
    } else {
      this.status = 1
    }
  },

  components: {
    CountyPicker,
    DatePicker,
    DataPicker
  }
}
</script>

<style lang="scss" scoped></style>
