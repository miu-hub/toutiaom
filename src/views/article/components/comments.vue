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
    // 文章id
    article_id: {
      Type: Number,
      required: true,
    },
    // 列表----文章评论or评论评论列表
    list: {
      // 评论数据
      type: Array,
      required: true,
    },
    // 评论id
    com_id: {
      Type: [Object, String],
      required: false,
    },
    // 评论内容
    content: {
      Type: String,
      required: false,
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
      r_id: this.com_id, //评论评论的id
      r_const: this.content, //评论评论的内容
    };
  },

  methods: {
    async onLoad() {
      // 获取文章id
      let ID = parseInt(this.a_id);
      try {
        // 请求数据-----   // 异步更新数据
        const res = await getComment(
          {
            // 请求类型---a:对文章----b:对评论
            type: this.com_id ? "c" : "a",
            // 文章id
            source: ID,
            // 页数偏移-----页码
            offset: this.offset,
            // 每页数据
            limit: this.limit,
          },
          {
            // 针对评论的评论id
            target: this.r_id,
            // 针对评论的评论内容
            content: this.r_const,
          }
        );
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

  watch: {
    // 检测评论id的变化
    com_id: {
      handler(newId) {
        this.r_id = newId;
        this.onLoad();
      },
    },
    content: {
      // 检测评论内容的变化
      handler(newId) {
        this.r_const = newId;
        // this.onLoad();
      },
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