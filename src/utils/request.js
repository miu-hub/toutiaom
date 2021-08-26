/**
 * 封装请求模块
 */

import axios from 'axios';
import router from '@/router/'
import Store from '@/store/index.js';
import { setItem } from '@/utils/storage'
import { Toast } from 'vant';
// 引入json-bigint包
import bigint from 'json-bigint'
const resf_token = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})
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
// 响应拦截器
request.interceptors.response.use((res) => {

    return res;
}, async (err) => {

    // 获取错误状态码
    const status = err.response.status;
    // 用户token过期
    if (status === 401) {
        // 获取vuex库的User数据
        let User = Store.state.User;
        // User无数据或无token
        if (!User.token) {
            Toast.fail('用户已过期,请重新登录');
            // 跳登录
            replay();
        };

        try {
            // 更新token-----使用单独的请求设置
            const res = await resf_token({
                method: 'PUT',
                url: '/app/v1_0/authorizations',
                headers: {
                    Authorization: `Bearer ${User.refresh_token}`
                }
            })

            // 将新的token添加到vuex中
            User.token = res.data.data.token;
            setItem('User', User)
            // 把失败的请求重新发送出去
            return request(error.config)
        } catch (error) {
            Toast.fail('用户已过期,请重新登录');
            replay();
        }

    } else if (status === 400) {
        Toast.fail('客户端错误')
    } else if (status === 403) {
        Toast.fail('用户无权限')
    } else if (status >= 500) {
        Toast.fail('服务器错误')
    }

    return promise.reject(err)
})

// 跳转方法
function replay() {
    router.replace({
        name: 'login',
        query: {
            redirects: router.currentRoute.fullPath
        }
    });
};

export default request;