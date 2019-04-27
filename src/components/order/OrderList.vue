<template>
   <div>
     <h1>订单列表</h1>
     <div v-if="data">{{data}}</div>
   </div>
</template>

<script>
export default {
  name: 'OrderList',
  data() {
    return {
      data: null
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      try {
        let res = await this.$http.get(this.api.order, { user: this.userinfo })
        if (res.errNo === 0) {
          this.data = res.data
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
