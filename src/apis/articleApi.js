/**
 * 处理文章相关的请求模块
 * 
 */

import request from '@/utils/request';
// 获取用户文章列表方法
export const getArticlegetChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels',
    })
}

// 获取文章信息
export const getArticleInfo = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params,
    })
}

//获取全部频道列表
export const allChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels'
    })
}


// 操作（添加）文章列表
export const addChannels = (data) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data,
    })
}

// 操作（删除）文章列表
export const delChannels = (id) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${id}`,
    })
}