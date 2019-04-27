import Vue from 'vue'
import Router from 'vue-router'
import OrderList from '@/components/order/OrderList'
import Account from '@/components/account/Account'
import Department from '@/components/account/Department'
import OPHistory from '@/components/account/OPHistory'
// import Posts from '@/components/Posts'
// import NewPost from '@/components/NewPost'
// import EditPost from '@/components/EditPost'

Vue.use(Router)

const Container = {
  render(h) {
    return h('router-view')
  }
}

export default new Router({
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/order',
      label: '订单查询',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/account',
      label: '员工账号管理',
      component: Container,
      children: [
        {
          path: 'account',
          name: 'Account',
          label: '员工账号',
          component: Account
        },
        {
          path: 'department',
          name: 'Department',
          label: '部门管理',
          component: Department
        },
        {
          path: 'ophistory',
          name: 'OPHistory',
          label: '操作历史',
          component: OPHistory
        }
      ]
    }
  ]
})
