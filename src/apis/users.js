/***
 * 处理用户请求相关请求
 * 
 */

import request from '@/utils/request.js'

// 用户登录注册认证
export const userLogin = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data,
    })
}

// 获取用户验证码
export const userCode = (mobile) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}

//获取用户资料
export const getUser = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/profile'

        //用户token在请求拦截中设置了
    })
}