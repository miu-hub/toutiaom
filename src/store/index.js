import Vue from 'vue'
import Vuex from 'vuex'

// 引入本地存储的插件
import { getItem, setItem, removeItem } from '@/utils/storage'


Vue.use(Vuex);
// 定义一个常量来控本地存储的值----避免出现开发时名称错误
export const user_KEY = 'user';//用户token

export default new Vuex.Store({
  state: {
    User: getItem(user_KEY),
    Incluede: ['layout'],//组件缓存的数据
  },
  mutations: {
    // 更改用户的token
    setUser(state, value) {
      state.User = value

      // 防止刷新页面导致数据丢失-----还需要使用本地存储
      setItem(user_KEY, value)
    },
    // 添加组件缓存
    addInclude(state, value) {
      // 判断是否有要添加的组件缓存
      if (!state.Incluede.includes(value)) {
        state.Incluede.push(value)
      }
    },
    // 删除组件缓存
    removeInclude(state, value) {
      // 判断是否有要删除的组件缓存
      let i = state.Incluede.indexOf(value)
      if (i != -1) {
        state.Incluede.splice(i, 1);
      }
    },
  },
  actions: {

  },
  modules: {
  }
})
