import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入less
import '../src/styles/index.css'
// 引入此包来进行rem适配
import 'amfe-flexible';

// 引入字体图标资源
import './styles/font/iconfont.css'

// 引入vant
import vant from 'vant';
// 引入vant 组件库样式
import '../node_modules/vant/lib/index.css'
// 使用vant组件库
Vue.use(vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // 构建全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
