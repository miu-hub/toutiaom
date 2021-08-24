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
// 对评论或评论回复点赞
export const likings = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comment/likings',
        data,
    })
}
// 对评论或评论回复取消点赞
export const nolikings = (target) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/comment/likings/${target}`
    })
}

// 对文章进行评论
export const art_comm = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comments',
        data,
    })
}