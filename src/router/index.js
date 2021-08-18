import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由模块-----懒加载
// const login =() => import('@/views/login/')

Vue.use(VueRouter)
// 处理路由
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('../views/layout/'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('@/views/index/')
      },
      {
        path: 'faqs',
        name: 'faqs',
        component: () => import('@/views/faqs/')
      }, {
        path: 'vid',
        name: 'vid',
        component: () => import('@/views/vid/')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
