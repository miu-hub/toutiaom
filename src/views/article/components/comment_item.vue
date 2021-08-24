<template>
  <!-- 评论区 -->
  <div id="pl_item">
    <!-- 头像 -->
    <div id="photo">
      <van-image fit="cover" class="img" round :src="datas.aut_photo" />
    </div>

    <!-- 信息 -->
    <div id="info">
      <!-- 昵称和点赞 -->
      <div id="info_top">
        <p>{{ datas.aut_name }}</p>
        <div id="good">
          <span>{{ datas.like_count }}</span
          ><i
            @click="add_like(datas.com_id)"
            :class="{
              iconfont: true,
              'icon-dianzan': !datas.is_liking,
              'icon-tubiaozhizuo-': datas.is_liking,
            }"
          ></i>
        </div>
      </div>
      <!-- 评论信息 -->
      <div id="info_c">
        <p>{{ datas.content }}</p>
      </div>
      <!-- 底部信息 -->
      <div id="info_bottom">
        <span id="time">{{ datas.pubdate | datatime }}</span>
        <van-button class="btn" size="mini" color="rgb(26, 16, 68)" round
          >{{ datas.reply_count }}回复</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { likings, nolikings } from "@/apis/comment";
import { Toast } from "vant";
import { mapState } from "vuex";
export default {
  name: "commentItem",
  props: {
    item: {
      Type: Object,
      required: true,
    },
  },

  data() {
    return {
      // 评论数据
      data: [],
    };
  },

  methods: {
    async add_like(c_id) {
      if (this.User) {
        if (this.item.is_liking) {
          //取消点赞
          await nolikings(c_id);
          this.data.is_liking = false;
          this.data.like_count -= 1;
        } else {
          //点赞
          await likings({
            target: c_id,
          });
          // 更改状态
          this.data.is_liking = true;
          this.data.like_count += 1;
        }
        return;
      }
      Toast.fail("登录才能点赞信息");
    },
  },

  computed: {
    ...mapState(["User"]),
    datas() {
      this.data = this.item;
      return this.data;
    },
  },
};
</script>
<style lang="less">
#pl_item {
  display: flex;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid rgb(235, 229, 229);
  border-top: 0px;
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
</style>