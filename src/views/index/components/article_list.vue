<template>
  <div id="list">
    <!-- 文章展示 -->
    <van-list
      class="loading_list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 下拉刷新的组件 -->
      <van-pull-refresh v-model="isloading" @refresh="onRefresh">
        <!-- 包裹文章内容 -->
        <ArticleItem v-for="(items, i) in list" :key="i" :items="items" />
      </van-pull-refresh>
    </van-list>
  </div>
</template>

<script>
import { Toast } from "vant";
// 导入获取文章信息的请求接口方法
import { getArticleInfo } from "@/apis/articleApi";
// 引入公共组件toutiao-m\src\components
import article_item from "@/components/article_item/";
export default {
  name: "articleList",
  props: {
    // 从父组件传入的某个频道的数据
    item: {
      // 数据类型为对象
      type: Object,
      // 必须有
      required: true,
    },
  },

  components: {
    // 注册公共组件
    ArticleItem: article_item,
  },

  data() {
    return {
      list: [], //获取的用户数据列表
      loading: false, //加载的触发----页面占满元素时触发------false为暂时停止加载
      finished: false, //结束控件-----为true时停止加载数据
      time_stop: null, //获取当前事件戳来更新数据---获取不同页码的数据
      isloading: false, //下拉的状态
    };
  },

  methods: {
    // 加载文章列表方法
    async onLoad() {
      // 异步
      try {
        // 接收返回值
        const res = await getArticleInfo({
          // 获取文章的频道id-----展示对应的频道文章数据
          channel_id: this.item.id,
          // 时间戳------this.time_stop时间戳，若没有则获取最新的时间戳
          timestamp: this.time_stop || Date.now(),
          // 1--展示置顶文章   0------不展示置顶文章
          with_top: 1,
        });
        // 获取文章信息
        let datas = res.data.data.results;
        // 使用扩展运算符将新获得的数据添加入list渲染数组
        this.list.push(...datas);
        // 加载状态结束-------加载新数据完成
        this.loading = false;
        // 数据全部加载完成-----判断数据是否全部加载完
        // datas.length----获取的新数据的长度为0时即没有数据
        if (datas.length) {
          //还有新数据
          // 将返回的旧的时间戳返回给加载请求---获取旧数据
          this.time_stop = res.data.data.pre_timestamp;
        } else {
          // 没有新数据-----停止加载并显示‘没有更多了’
          this.finished = true;
        }
      } catch (error) {
        console.log("加载错误");
      }
    },
    // 下拉时触发的事件
    async onRefresh() {
      // 异步
      try {
        // 接收返回值
        const res = await getArticleInfo({
          // 获取文章的频道id-----展示对应的频道文章数据
          channel_id: this.item.id,
          // 时间戳------this.time_stop时间戳，若没有则获取最新的时间戳
          timestamp: Date.now(),
          // 1--展示置顶文章   0------不展示置顶文章
          with_top: 1,
        });
        // 获取文章信息
        let datas = res.data.data.results;
        // 使用扩展运算符将新获得的数据添加入list渲染数组------从顶部
        this.list.unshift(...datas);
        // 加载状态结束-------加载新数据完成
        this.loading = false;
        // 关闭下拉
        this.isloading = false;
        // 判断没有最新数据
        if (datas.length) {
          //还有新数据
          // 将返回的旧的时间戳返回给加载请求---获取旧数据
          this.time_stop = res.data.data.pre_timestamp;
          // 提示
          Toast("刷新成功");
        } else {
          this.finished = true;
          // 提示
          Toast("没有最新数据了");
        }
      } catch (error) {
        console.log("加载错误");
      }
    },
  },
};
</script>


<style lang="less" scoped>
#list {
  padding: 0px 10px;
  .loading_list {
    overflow-y: auto;
    width: 355px;
    position: fixed;
    top: 100px;
    // left: 0;
    // right: 0;
    bottom: 50px;
  }
}
</style>