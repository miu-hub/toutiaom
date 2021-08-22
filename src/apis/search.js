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

// 获取用户搜索历史
export const search_history = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search/histories'
    })
}

// 删除用户的搜索历史
export const del_search = () => {
    return request({
        method: 'DELETE',
        url: '/app/v1_0/search/histories'
    })
}