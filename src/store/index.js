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
  },
  mutations: {
    // 更改用户的token
    setUser(state, value) {
      state.User = value

      // 防止刷新页面导致数据丢失-----还需要使用本地存储
      setItem(user_KEY, value)
    }
  },
  actions: {

  },
  modules: {
  }
})
