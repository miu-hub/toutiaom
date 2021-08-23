/**
 * 评论相关的请求方法
 */

import request from '@/utils/request';
// 获取评论或评论回复
export const getComment = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/comments',
        params,
    })
}