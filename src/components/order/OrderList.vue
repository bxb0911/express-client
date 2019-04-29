<template>
  <div class="order">
    <div class="wrap">
      <el-form :inline="true" ref="filter" :model="filter" >
        <el-form-item label="日期类型">
          <el-select v-model="filter.dateType" placeholder="按预定日期">
            <el-option
              v-for="item in dateTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="filter.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="filter.department" placeholder="所有部门">
            <el-option
              v-for="item in departmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-select v-model="filter.name" placeholder="所有姓名">
            <el-option
              v-for="item in nameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-select v-model="filter.phone" placeholder="所有电话">
            <el-option
              v-for="item in phoneOptions"
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
      <div class="databoard">
        <div class="board" v-for="item in databoard" :key="item.value">
          <div class="imgwrap"><img src="../../assets/placeholder.png"></div>
          <div class="datawrap">
            <span class="label">{{item.label}}</span>
            <span class="data">{{item.data}}</span>
          </div>
        </div>
      </div>
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
  name: 'OrderList',
  components: {
    Table
  },
  data() {
    return {
      filter: {
        dateType: '',
        date: '',
        department: '',
        name: '',
        phone: ''
      },
      dateTypeOptions: [{
        value: '1',
        label: '按预定日期'
      }, {
        value: '2',
        label: '按预定场地'
      }],
      departmentOptions: [{
        value: '1',
        label: '财务部'
      }, {
        value: '2',
        label: '研发部'
      }],
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
      databoard: [{
        label: '客房订单总量',
        data: '4,200'
      }, {
        label: '间夜总量',
        data: '14,200'
      }, {
        label: '订单总金额',
        data: '14,200.00'
      }, {
        label: '平均房价直出',
        data: '5,400'
      }],
      columns: tableConf.call(this)
    }
  },
  methods: {
    async callServe(table) {
      const params = this.filter
      const { data: { list, total } } = await this.$http.get(this.api.order, params)
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
  .order {
    .wrap {
      background: #FFFFFF;
      border: 1px solid #F5F6FB;
      padding: 23px 27px;
      .databoard {
        .board {
          display: inline-block;
          min-width: 260px;
          height: 98px;
          padding: 0 30px;
          box-sizing: border-box;
          background: #FFFFFF;
          border: 1px solid #EDEEF0;
          font-size: 0;
          &:not(:last-child) {
            margin-right: 20px;
          }
          & > div {
            display: inline-block;
            vertical-align:top;
            width: 50%;
            height: 98px;
          }
          .imgwrap {
            line-height: 98px;
            img {
              width: 40px;
            }
          }
          .datawrap {
            padding: 20px 0;
            box-sizing: border-box;
            .label {
              font-size: 12px;
              color: #8E8E8E;
            }
            .data {
              margin-top: 10px;
              display: inline-block;
              font-size: 28px;
              color: #4D4D4D;
            }
          }
        }
      }
    }
  }
</style>
