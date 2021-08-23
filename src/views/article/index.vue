<template>
  <div id="article_det">
    <!-- 顶部栏 -->
    <van-nav-bar
      title="文章详情"
      left-text="返回"
      class="header_top_nav"
      left-arrow
      @click-left="$router.back()"
    >
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>

    <!-- 标题 -->
    <div id="article_title">
      <p>{{ data.title }}</p>
    </div>

    <!-- 信息区 -->
    <div id="user_info">
      <!-- 作者信息 -->
      <div id="author">
        <!-- 头像 -->
        <div id="photo">
          <van-image
            class="user_img"
            fit="cover"
            round
            show-error
            :src="data.aut_photo"
          />
        </div>
        <!-- 昵称和时间 -->
        <div id="info">
          <p>{{ data.aut_name }}</p>
          <span>{{ data.pubdate | timeout }}</span>
        </div>
      </div>

      <!-- 关注 -->
      <div id="atten">
        <van-button
          :plain="isFoll"
          color="rgb(26, 16, 68)"
          hairline
          type="primary"
          round
          :loading="btn_loading"
          loading-text="操作中..."
          @click="add_followed(isFoll, data.aut_id)"
          >{{ isFoll ? "已关注" : "+ 关注" }}</van-button
        >
      </div>
    </div>

    <!-- 文章主体区 -->
    <div
      id="data"
      class="markdown-body"
      v-html="data.content"
      ref="art_main"
    ></div>

    <!-- 评论区--展示 -->
    <div id="comment_list">
      <van-divider :style="{ color: '#666', borderColor: '#666' }">
        正文结束
      </van-divider>

      <Comment :article_id="art_id" />
    </div>

    <!-- 评论区 -->
    <div id="comment">
      <van-button
        class="pl"
        color="rgb(26, 16, 68)"
        icon="comment-o"
        round
        plain
        hairline
        type="primary"
        >写评论</van-button
      >
      <!-- 评论数量 -->
      <i class="iconfont icon-pinglun"></i>
      <!-- 收藏 -->
      <i
        @click="like(data.is_collected)"
        :class="{
          iconfont: true,
          'icon-shoucang': !data.is_collected,
          'icon-shoucang1': data.is_collected,
        }"
      ></i>
      <!-- 点赞 -->
      <i
        @click="good(data.attitude)"
        :class="{
          iconfont: true,
          'icon-dianzan': data.attitude == -1,
          'icon-tubiaozhizuo-': data.attitude == 1,
        }"
      ></i>
      <!-- 转发 -->
      <van-icon name="share-o" size="0.5em" />
    </div>
  </div>
</template>

<script>
// vant提示
import { Toast, ImagePreview } from "vant";
// 处理时间
import "@/utils/date";
// 引入第三方库
import "./github-markdown.css";
// 引入获取文章内容方法
import { article_data } from "@/apis/articleApi";
// 添加和取消关注用户
import {
  addFollowed,
  callFollowed,
  getUser,
  artLike,
  noLike,
  noGood,
  Good,
} from "@/apis/users";
// 引入vuex库中的数据
import { mapState } from "vuex";
// 引入子组件
import comment from "./components/comments.vue";
export default {
  name: "article_det",
  components: {
    Comment: comment,
  },
  data() {
    return {
      // 文章数据
      data: {},
      //   文章id
      art_id: null,
      //   控制按钮文字状态
      isFoll: null,
      //   控制按钮禁用状态
      btn_loading: false,
      //   评论数据
      value: "",
    };
  },
  created() {
    //   获取路径参数---文章id
    let a_id = this.$route.params.art_id;
    this.art_id = a_id;
    this.getArticle(a_id);
  },

  methods: {
    //   获取文章详情方法
    async getArticle(Id) {
      try {
        //   调用请求
        const res = await article_data(Id);
        // console.log(res.data.data);
        // 将数据传递渲染模块
        this.data = res.data.data;
        this.isFoll = res.data.data.is_followed;
        // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
        this.$nextTick(() => {
          // 调用图片预览处理方法
          this.img_pre();
        });
      } catch (error) {
        console.log("获取文章失败");
      }
    },
    // 处理文章图片预览
    img_pre() {
      // 获取文章的主体内容
      let art = this.$refs["art_main"];
      //   获取主体内容中的img标签（所有）
      let imgs = art.querySelectorAll("img");
      //   调用图片预览方法
      let arr = []; //所有图片链接存放在此数组
      //   遍历img标签
      imgs.forEach((item, i) => {
        //   将遍历的链接存入数组
        arr.push(item.src);
        // 给图片注册点击事件---点击显示该图片
        item.addEventListener("click", function () {
          ImagePreview({
            images: arr, //图片链接
            startPosition: i, //预览起始位置
          });
        });
      });
    },
    // 添加---取消关注
    async add_followed(is_foll, aut_id) {
      // 开启加载
      this.btn_loading = true;
      //   用户登录才有此操作
      if (this.User) {
        //   未关注状态-- - 添加关注;
        if (!is_foll) {
          try {
            let userId = await this.getUserInfo();
            // 判断关注的是否是本人
            if (aut_id != userId) {
              // 发送关注请求
              await addFollowed({
                target: aut_id,
              });
              Toast.success("关注成功");
              // 关闭加载
              this.btn_loading = false;
              // 更改关注状态
              this.isFoll = true;
            } else {
              Toast.fail("用户不能关注自己");
              // 关闭加载
              this.btn_loading = false;
            }
          } catch (error) {
            Toast.fail("关注失败");
            // 关闭加载
            this.btn_loading = false;
            // 关闭加载
            this.btn_loading = false;
          }
        } else {
          //   关注状态-- - 取消关注;
          try {
            await callFollowed(aut_id);
            Toast.success("取消关注成功");
            // 关闭加载
            this.btn_loading = false;
            // 更改关注状态
            this.isFoll = false;
          } catch (error) {
            Toast.fail("取消关注失败");
            // 关闭加载
            this.btn_loading = false;
          }
        }
        return;
      }
      Toast.fail("请先登录");
      // 关闭加载
      this.btn_loading = false;
    },
    // 获取登录用户的id
    async getUserInfo() {
      let ID = null;
      try {
        const info = await getUser();
        ID = info.data.data.id;
      } catch {}
      return ID;
    },
    // 收藏文章or取消
    async like(is_like) {
      // 判断登录状态
      if (this.User) {
        //   判断收藏状态
        if (is_like) {
          //已收藏
          try {
            await noLike(this.art_id);
            Toast.success("取消收藏成功");
          } catch (error) {
            Toast.fail("取消收藏失败");
          }

          return;
        }
        //   未收藏
        try {
          await artLike({
            target: this.art_id,
          });
          Toast.success("收藏成功");
        } catch (error) {
          Toast.fail("收藏失败");
        }
      } else {
        Toast.fail("请先登录");
      }
    },
    // 点赞文章or取消
    async good(status) {
      // 判断登录状态
      if (this.User) {
        //   判断点赞状态
        if (status === 1) {
          //已点赞
          try {
            await noGood(this.art_id);
            Toast.success("取消点赞成功");
          } catch (error) {
            Toast.fail("取消点赞失败");
          }
          return;
        }
        //   未收藏
        try {
          await Good({
            target: this.art_id,
          });
          Toast.success("点赞成功");
        } catch (error) {
          Toast.fail("点赞失败");
        }
      } else {
        Toast.fail("请先登录");
      }
    },
  },
  computed: {
    ...mapState(["User"]),
  },
};
</script>

<style lang="less" scoped>
#article_det {
  width: 100%;
  // 标题
  #article_title {
    width: 100%;
    background-color: #fff;
    padding: 10px 20px 10px 20px;
    border-bottom: 1px solid #ccc;
    p {
      font-weight: 700;
      font-size: 24px;
    }
  }
  // 用户信息区
  #user_info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    padding: 10px;
    background-color: #fff;
    // 作者信息
    #author {
      display: flex;
      width: 200px;
      height: 60px;
      // 头像
      #photo {
        width: 60px;
        height: 60px;
        border-radius: 50%;

        .user_img {
          width: 60px;
          height: 60px;
        }
      }
      // 昵称信息
      #info {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        margin-left: 10px;
        height: 60px;
        p {
          font-size: 20px;
          font-weight: 700;
          color: #666;
        }
        //   发布时间
        span {
          text-align: center;
          font-size: 15px;
          margin-top: 10px;
          color: rgb(173, 171, 171);
        }
      }
    }
  }
  // 将全局的li标签样式覆盖
  ul li {
    list-style-type: disc;
  }
  // 内容
  #data {
    width: 100%;
    padding: 15px;
    background-color: #fff;
    border-top: 1px solid rgb(231, 229, 229);
  }
  //   评论区
  #comment_list {
    width: 100%;
    background-color: #fff;
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
      width: 180px;
      height: 30px;
      border: 1px solid rgb(26, 16, 68);
      .text {
        height: 30px;
      }
    }

    .done {
      background-color: red;
    }
  }
}
</style>