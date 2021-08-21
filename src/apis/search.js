/**
 * 搜索组件相关请求
 *
 */

import request from '@/utils/request';

// 获取用户搜索文章(联想)
export const search_associate = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params,
    })
}

// 获取文章数据（搜索）
export const search_result = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search',
        params,
    })
}