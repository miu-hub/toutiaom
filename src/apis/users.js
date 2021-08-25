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
// 编辑用户资料
export const setUser = (data) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/profile',
        data,
    })
}
// 编辑用户照片资料
export const setPhoto = (data) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/photo',
        data,
    })
}
// 关注其他用户
export const addFollowed = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/user/followings',
        data
    })
}
// 取消关注其他用户
export const callFollowed = (aut_id) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${aut_id}`,
    })
}
// 收藏文章
export const artLike = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/collections',
        data,
    })
}
// 取消收藏文章
export const noLike = (target) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/${target}`,
    })
}
// 点赞文章
export const Good = (data) => {
    return request({
        method: 'POST',
        url: `/app/v1_0/article/likings`,
        data
    })
}
// 取消点赞文章
export const noGood = (target) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/likings/${target}`,
    })
}