<template>
  <!-- 评论发布模块 -->
  <div id="post_comm">
    <van-cell-group inset>
      <van-field
        v-model="message"
        class="input"
        autosize
        type="textarea"
        maxlength="80"
        placeholder="说点什么吧...."
        show-word-limit
      />
    </van-cell-group>
    <van-button color="rgb(26,16,68)" @click="post_com">发布</van-button>
  </div>
</template>

<script>
// 引入请求
import { art_comm } from "@/apis/comment";
// 引入库
import { mapState } from "vuex";
import { Toast } from "vant";
export default {
  name: "post_comm",

  props: {
    art_id: {
      //文章id
      Type: [String, Number, Object],
      required: true,
    },
    pl_id: {
      //评论id
      Type: [String, Number, Object],
      required: false,
    },
  },

  data() {
    return {
      message: "", //处理评论输入内容
    };
  },

  methods: {
    //   方布评论
    async post_com() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      if (this.User) {
        try {
          // 请求方法
          const res = await art_comm({
            target: this.art_id.toString(),
            content: this.message.trim(" "), //评论内容
            art_id: this.pl_id ? this.pl_id.toString() : null, //评论id
          });
          this.message = "";
          Toast.success("评论成功");
          // 判断回复的是文章还是评论
          if (this.pl_id) {
            this.$bus.$emit("getList_reply", res);
            return;
          }
          // 将获取的数据交给父组件用来渲染评论列表
          this.$bus.$emit("getList", res);
        } catch (error) {
          if (this.message.trim(" ") == "") {
            //当评论为空时
            Toast.fail("评论不能为空");
            this.message = "";
            return;
          }
          Toast.fail("评论失败");
        }
        return;
      }
      Toast.fail("登录才能发表见解");
    },
  },

  computed: {
    ...mapState(["User"]),
  },
};
</script>

<style lang="less" scoped>
#post_comm {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 10px;
  .input {
    width: 240px;
  }
}
</style>