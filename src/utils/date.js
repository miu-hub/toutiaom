/**
 * 处理文章时间
 */

import dayjs from 'dayjs';
import Vue from 'vue';

// 引入中文语言包
import 'dayjs/locale/zh-cn'
// 导入处理事件的插件
import relativeTime from 'dayjs/plugin/relativeTime';
// 使用插件
dayjs.extend(relativeTime);
// 设置语言模式
dayjs.locale('zh-cn')
// 定义一个全局过滤器处理时间
Vue.filter('timeout', value => {
    // console.log(value + "|" + dayjs().format('YYYY-MM-DD'));
    return dayjs(value).from(dayjs())
})

// 定义一个全局过滤器格式时间
Vue.filter('datatime', value => {
    // console.log(value + "|" + dayjs().format('YYYY-MM-DD'));
    return dayjs(value).format('YYYY-MM-DD HH:mm')
})