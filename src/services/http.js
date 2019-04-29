import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import api from './api'

const mode = process.env.NODE_ENV
axios.defaults.baseURL = mode === 'development' ? 'http://localhost:3000' : ''
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
axios.interceptors.response.use(response => {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response) // eslint-disable-line
  }
}, error => {
  return Promise.reject(error.response)
})

/* eslint-disable no-new-func */
const http = new Function()
;['get', 'post'].forEach(method => {
  http[method] = async function(url, params = {}, options) {
    const base = { method: method, url }
    method === 'get' && (base.params = params)
    method === 'post' && (base.data = qs.stringify(params))
    try {
      const response = await axios(Object.assign(base, options))
      return response.data
      // let { data: { errNo, errstr, data } } = response
      // if (typeof errNo !== 'undefined') {
      //   switch (Number(errNo)) {
      //     default:
      //       Message({ message: errstr || '请求失败', type: 'error' })
      //       return Promise.reject({errNo, errstr, data})  // eslint-disable-line
      //   }
      // }
    } catch (error) {
      Message({ message: '未知错误', type: 'error' })
      return Promise.reject(new Error('请求失败'))
    }
  }
})

export default {
  install(Vue, options = {}) {
    Vue.$http = Vue.prototype.$http = http
    Vue.api = Vue.prototype.api = api
  }
}
