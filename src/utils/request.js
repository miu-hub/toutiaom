/**
 * 封装请求模块
 */

import axios from 'axios';

import Store from '@/store/index.js';

// 引入json-bigint包
import bigint from 'json-bigint'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',

    // axios配置----用于将响应的数据由json转换为js数据
    // 但是转换时会将某些json字符串转换后值发生改变-----传入值超出限制
    // 可以通过引入第三方库json-bigint来解决
    // 使用bigint.parse(data)将其转换为特定类型来避免出现限制
    // 转换为js时使用toString来使用数据
    transformResponse: [function (data) {

        //axios配置中可能会出现响应数据非json的情况
        try {
            // 非json会报错-----则执行catch
            return bigint.parse(data);
        } catch (error) {
            console.log('传入的不是json' + error);
            return data
        }
    }]
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