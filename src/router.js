// 引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'

// 在模块化工程中 必须要用use明确安装一个路由功能
Vue.use(VueRouter)

// 实例化路由
const router = new VueRouter({
  // 规则
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

// 通过es6把router导出去
export default router
