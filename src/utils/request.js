/**
 * 封装请求模块
 */

import axios from 'axios';

import Store from '@/store/index.js';

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})

// 设置请求拦截器
request.interceptors.request.use((config) => {
    // 若是发送的请求没有用户登录数据则直接通过---无需添加token
    if (Store.state.User) {
        config.headers.Authorization = `Bearer ${Store.state.User.token}`
    }
    return config;
}, (err) => {
    return promise.reject(err)
})


export default request;