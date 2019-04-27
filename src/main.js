import Vue from 'vue'
import './assets/base.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Http from './services/http'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Http)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
