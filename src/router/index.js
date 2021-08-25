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
  }, {
    path: '/',
    component: () => import('@/views/layout/'),
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
  }, {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  }, {
    path: '/article/:art_id',
    name: 'article_det',
    component: () => import('@/views/article/')
  }, {
    path: '/userDatum',
    name: 'userDatum',
    component: () => import('@/views/user_datum/'),
  }
]

const router = new VueRouter({
  routes
})

export default router
