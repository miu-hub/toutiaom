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