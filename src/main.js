// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import AFTableColumn from 'af-table-column'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'

//css样式初始化
import 'normalize.css/normalize.css'

//导入icon样式
import './styles/icon/iconfont.css'

//导入animate动画库
// import 'animate.css'
import animated from 'animate.css'
import axios from "axios";

//导入codemirror
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.use(AFTableColumn)
Vue.use(animated)
Vue.use(codemirror)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
