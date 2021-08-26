import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'
// 路由模块-----懒加载
// const login =() => import('@/views/login/')

Vue.use(VueRouter)
// 处理路由
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    meta: { retuired: false }
  }, {
    path: '/',
    component: () => import('@/views/layout/'),
    meta: { retuired: false },
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('@/views/index/'),
        meta: { retuired: false }
      },
      {
        path: 'faqs',
        name: 'faqs',
        component: () => import('@/views/faqs/'),
        meta: { retuired: true }
      }, {
        path: 'vid',
        name: 'vid',
        component: () => import('@/views/vid/'),
        meta: { retuired: true }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/'),
        meta: { retuired: false }
      }
    ]
  }, {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: { retuired: false }
  }, {
    path: '/article/:art_id',
    name: 'article_det',
    component: () => import('@/views/article/'),
    meta: { retuired: true }
  }, {
    path: '/userDatum',
    name: 'userDatum',
    component: () => import('@/views/user_datum/'),
    meta: { retuired: true }
  }, {
    path: '/user/chat',
    name: 'userChat',
    component: () => import('@/views/user_chat/'),
    meta: { retuired: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.retuired) {//需要权限-----

    if (store.state.User) {
      return next()
    };



    Dialog.confirm({
      title: '访问提示',
      message: '需要登录才能使用'
    }).then(() => {//需要权限-----确认
      router.replace({//去登录
        name: 'login',
        redirects: router.currentRoute.fullPath,
      })
    }).catch(() => {//取消
      // 中断导航
      next(false)
    })
  } else {//不需要权限的
    next();
  }
})

export default router
