<template>
  <div id="comment_list">
    <div id="all">
      <p>全部评论</p>
      <!-- 评论加载 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <CommentItem v-for="(item, i) in this.list" :key="i" :item="item" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getComment } from "@/apis/comment";
import commentItem from "./comment_item.vue";
export default {
  name: "comment",
  components: {
    CommentItem: commentItem,
  },
  props: {
    article_id: {
      Type: Number,
      required: true,
    },
    list: {
      // 评论数据
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      // 文章id
      a_id: this.article_id,
      offset: null, //偏移
      limit: 10, // 每页数据
      loading: false, //控制加载状态
      finished: false, //是否停止加载
    };
  },

  methods: {
    async onLoad() {
      // 获取文章id
      let ID = parseInt(this.a_id);
      try {
        // 请求数据-----   // 异步更新数据
        const res = await getComment({
          // 请求类型---a:对文章----b:对评论
          type: "a",
          // 文章id
          source: ID,
          // 页数偏移-----页码
          offset: this.offset,
          // 每页数据
          limit: this.limit,
        });
        let datas = res.data.data.results;
        // 将返回的评论数据添加给渲染数组
        this.list.push(...datas);
        // 将评论总数传递给父组件
        let total = res.data.data.total_count;
        this.$bus.$emit("pl_num", total);
        // 更改加载状态
        this.loading = false;
        // 判断还有无新增数据
        if (datas.length) {
          //有
          // 将此次获取的lastid赋值---重新请求
          this.offset = res.data.data.last_id;
        } else {
          //无
          // 关闭加载
          this.finished = true;
        }
      } catch {
        Toast.fail("获取评论数据失败");
        // 关闭加载
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#comment_list {
  width: 100%;
  padding: 0px 10px;
  #all {
    width: 100%;
    height: 600px;
    p {
      height: 60px;
      font-weight: 700;
      line-height: 60px;
      font-size: 18px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }

    /deep/ .van-list__placeholder {
      width: 100%;
      height: 60px;
    }
  }
}
</style>