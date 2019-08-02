import Vue from 'vue'
import App from './App.vue'
// 挂载
import router from './router'

// 公共样式
import './assets/common.css'

// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 解决axios三个问题
// 1.每次都加基准地址
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 2.每个组件都需要引入
Vue.prototype.$axios = axios // 以后vue实例都可以使用$axios
// 3.每次请求都要携带token
// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.data.meta.status === 100011) {
      this.$router.push('/login')
    }
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
