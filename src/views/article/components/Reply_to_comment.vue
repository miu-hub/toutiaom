<template>
  <div id="main">
    <van-nav-bar :title="`已有${replays.reply_count}条评论`" />
    <!-- Reply-to——comment:回复评论 -->
    <!-- 评论区 -->
    <div id="reply">
      <!-- 头像 -->
      <div id="photo">
        <van-image fit="cover" class="img" round :src="replays.aut_photo" />
      </div>

      <!-- 信息 -->
      <div id="info">
        <!-- 昵称 -->
        <div id="info_top">
          <p>{{ replays.aut_name }}</p>
          <div id="good">
            <span>{{ replays.like_count }}</span
            ><i
              @click="add_like(replays.com_id)"
              :class="{
                iconfont: true,
                'icon-dianzan': !replays.is_liking,
                'icon-tubiaozhizuo-': replays.is_liking,
              }"
            ></i>
          </div>
        </div>
        <!-- 评论信息 -->
        <div id="info_c">
          <p>{{ replays.content }}</p>
        </div>
        <!-- 底部信息 -->
        <div id="info_bottom">
          <span id="time">{{ replays.pubdate | datatime }}</span>
        </div>
      </div>
    </div>
    <!-- 回复评论模块 -->
    <CommentReply
      :article_id="art_id"
      :list="pl_list_reply"
      :content="replays.content"
      :com_id="replays.com_id"
    />
    <!-- 点击发布回复 -->
    <div id="comment">
      <!-- @click="" -->
      <van-button
        @click="reply_case = true"
        class="pl"
        icon="comment-o"
        plain
        hairline
        type="primary"
        >写评论</van-button
      >
    </div>

    <!-- 评论框 -->
    <van-popup v-model="reply_case" position="bottom">
      <PostComm :art_id="replays.com_id" :pl_id="a_id" />
    </van-popup>
  </div>
</template>

<script>
import comment from "./comments.vue";
import post_comm from "./post_comment.vue";
export default {
  name: "Replycomm",
  components: {
    CommentReply: comment,
    PostComm: post_comm,
  },

  props: {
    // 评论文章id
    art_id: {
      Type: [Object, Number, String],
      required: true,
    },
    // 评论评论用户回复数据
    replay: {
      Type: Object,
      required: true,
    },
  },

  mounted() {
    this.$bus.$on("getList_reply", (value) => {
      this.reply_case = false;
      // 将评论数据渲染至回复评论列表
      this.pl_list_reply.unshift(value.data.data.new_obj);
    });
  },

  data() {
    return {
      // 评论用户的数据
      replays: this.replay,
      // 评论文章的id
      a_id: this.art_id,
      // 控制回复输入框显示
      reply_case: false,
      // 回复评论列表
      pl_list_reply: [],
    };
  },
  // 监视replay
  watch: {
    // 此处监听props属性变化
    replay: {
      handler(newData) {
        this.replays = newData;
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
#main {
  #reply {
    display: flex;
    width: 100%;
    padding: 10px;
    background-color: #fff;
    border: 1px solid rgb(235, 229, 229);
    border-right: 0px;
    border-left: 0px;
    // 头像
    #photo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      .img {
        width: 39px;
        height: 39px;
      }
    }
    //   右侧信息区
    #info {
      margin-left: 10px;
      padding-top: 5px;
      padding-left: 5px;
      width: 300px;
      // 头部昵称
      #info_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 30px;
        //   昵称
        p {
          font-size: 16px;
          line-height: 30px;
          font-weight: 700;
          color: rgb(92, 92, 197);
        }

        #good {
          //   点赞数
          span {
            font-size: 14px;
            margin-right: 5px;
          }
        }
      }
      //   评论主体
      #info_c {
        width: 100%;
        min-height: 40px;
        p {
          width: 100%;
          word-wrap: break-word;
          word-break: break-all;
          font-size: 18px;
          padding: 10px;
        }
      }

      //   底部信息
      #info_bottom {
        display: flex;
        justify-content: left;
        align-items: center;
        margin-top: 10px;
        width: 100%;
        height: 30px;

        #time {
          color: #666;
          font-size: 14px;
          margin-right: 20px;
        }

        .btn {
          width: 60px;
        }
      }
    }
  }

  // 评论栏
  #comment {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    border: 1px solid #ccc;
    background-color: #fff;

    .pl {
      width: 300px;
    }
  }
}
</style>