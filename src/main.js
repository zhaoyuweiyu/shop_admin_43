import Vue from 'vue'
import App from './App.vue'
// 挂载
import router from './router'

// 公共样式
import './assets/common.css'

// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
