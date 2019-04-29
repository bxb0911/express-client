<template>
  <div class="account">
    <div class="wrap">
      <el-form :inline="true" ref="filter" :model="filter" >
        <el-form-item label="员工姓名">
          <el-select v-model="filter.name" placeholder="所有姓名">
            <el-option
              v-for="item in nameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-select v-model="filter.phone" placeholder="所有电话">
            <el-option
              v-for="item in phoneOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业编号">
          <el-select v-model="filter.corpCode" placeholder="按预定日期">
            <el-option
              v-for="item in corpCodeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search" type="primary" @click="searchHandler">搜索</el-button>
        </el-form-item>
      </el-form>
      <Table
        :columns="columns"
        :inline="true"
        :pageSize='10'
        :isReload='true'
        ref="table"
        @callServe="callServe" />
    </div>
  </div>
</template>

<script>
import Table from '../common/Table'
import tableConf from './tableConf'
export default {
  name: 'Account',
  components: {
    Table
  },
  data() {
    return {
      filter: {
        name: '',
        phone: '',
        corpCode: ''
      },
      nameOptions: [{
        value: '1',
        label: '郑恩地'
      }, {
        value: '2',
        label: '李宝英'
      }],
      phoneOptions: [{
        value: '1',
        label: '18800001111'
      }, {
        value: '2',
        label: '18800002222'
      }],
      corpCodeOptions: [{
        value: '1',
        label: '001'
      }, {
        value: '2',
        label: '002'
      }],
      columns: tableConf.call(this)
    }
  },
  methods: {
    async callServe(table) {
      const params = this.filter
      const { data: { list, total } } = await this.$http.get(this.api.account, params)
      if (list.length) {
        this.data = list
      }
      table.list = list || []
      table.page.total = total || 0
    },
    searchHandler() {
      this.$refs.table.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
  .account {
    .wrap {
      background: #FFFFFF;
      border: 1px solid #F5F6FB;
      padding: 23px 27px;
    }
  }
</style>
