<template>
  <div id="pl_item">
    <!-- 头像 -->
    <div id="photo">
      <van-image fit="cover" class="img" round :src="item.aut_photo" />
    </div>

    <!-- 信息 -->
    <div id="info">
      <!-- 昵称和点赞 -->
      <div id="info_top">
        <p>{{ item.aut_name }}</p>
        <div id="good"><span>2</span><i class="iconfont icon-dianzan"></i></div>
      </div>
      <!-- 评论信息 -->
      <div id="info_c">
        <p>{{ item.content }}</p>
      </div>
      <!-- 底部信息 -->
      <div id="info_bottom">
        <span id="time">{{ item.pubdate }}</span>
        <van-button class="btn" size="mini" color="rgb(26, 16, 68)" round
          >12252回复</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentItem",
  props: {
    item: {
      Type: Object,
      required: true,
    },
  },
};
</script>
<style lang="less">
#pl_item {
  display: flex;
  width: 100%;
  margin-top: 10px;
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
    border: 1px solid #666;
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