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
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}