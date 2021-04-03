// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import AFTableColumn from 'af-table-column'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'

//css样式初始化
import 'normalize.css/normalize.css'

//导入icon样式
import './styles/icon/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(AFTableColumn)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
