<template>
  <div id="user">
    <!-- 用户信息区 -->
    <div id="user_info">
      <!-- 顶部信息区 -->
      <div id="info_top">
        <!-- 头像 -->
        <div id="info">
          <div id="header_img">
            <van-image
              fit="cover"
              class="img"
              round
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            >
              <!-- <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
              <template v-slot:error>加载失败</template> -->
            </van-image>
          </div>
          <p>用户昵称</p>
        </div>
        <!-- 编辑用户信息按钮 -->
        <van-button plain round class="btn_edit" type="primary" size="small"
          >编辑用户信息</van-button
        >
      </div>

      <!-- 关注及粉丝区 -->
      <div id="info_bottom">
        <div class="text">
          <span>11</span>
          <p>帖子</p>
        </div>
        <div class="text">
          <span>11</span>
          <p>关注</p>
        </div>
        <div class="text">
          <span>11</span>
          <p>粉丝</p>
        </div>
        <div class="text">
          <span>11</span>
          <p>获赞</p>
        </div>
      </div>
    </div>

    <!-- 收藏和历史 -->
    <div id="Star_li">
      <van-grid :column-num="2">
        <van-grid-item icon="like-o" id="star" text="收藏" />
        <van-grid-item icon="underway-o" id="history" text="历史" />
      </van-grid>
    </div>

    <!-- 消息模块 -->
    <div id="news">
      <p>消息通知</p>
      <i class="iconfont icon-you"></i>
    </div>
    <!-- 小智同学 -->
    <div id="xiaozhi">
      <p>小智同学</p>
      <i class="iconfont icon-you"></i>
    </div>
    <!-- 退出登录 -->
    <div id="quit">
      <van-button type="danger" block size="large" round>退出登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
};
</script>

<style lang="less" scoped>
#user {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  // 上部信息
  #user_info {
    position: relative;
    padding-top: 20px;
    width: 100%;
    height: 300px;
    background-image: url("./img/user_bg.jpg");
    background-size: cover;
    border: 2px solid rgb(26, 16, 68);
    background-repeat: no-repeat;
    // 上半部信息区
    #info_top {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      height: 200px;
      // 用户
      #info {
        display: flex;
        align-items: center;
        // 头像区
        #header_img {
          width: 80px;
          height: 80px;
          // 头像
          .img {
            width: 80px;
            height: 80px;
            border: 2px solid #fff;
          }
        }
        // 昵称
        p {
          margin-left: 10px;
          font-size: 25px;
          color: #fff;
        }
      }
      // 编辑信息
      .btn_edit {
        border: 0;
        color: #fff;
        font-size: 10px;
        background-color: rgba(26, 16, 68, 0.7);
      }
    }
    // 下半部信息区
    #info_bottom {
      position: absolute;
      display: flex;
      justify-content: space-around;
      bottom: 0px;
      left: 0px;
      width: 100%;
      background-image: linear-gradient(
        to top,
        rgba(26, 16, 68, 0.8),
        rgba(26, 16, 68, 0.2)
      );
      height: 70px;

      // 用户详细行为数据
      .text {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        width: 80px;
        height: 70px;
        span {
          font-size: 20px;
          color: #fff;
          font-weight: 700;
        }

        p {
          font-size: 15px;
          color: #fff;
        }
      }
    }
  }
  // 收藏or历史
  #Star_li {
    width: 96%;
    margin: 10px 0px;
    font-weight: 700;

    #star {
      color: red;
    }

    #history {
      color: yellow;
    }
  }

  // 消息模块
  #news {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 96%;
    height: 50px;
    background-color: #fff;
    border-radius: 5px;
    padding: 0px 10px;

    p {
      font-size: 18px;
      color: #666;
    }

    i {
      color: #ccc;
    }
  }

  // 小智
  #xiaozhi {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 96%;
    height: 50px;
    background-color: #fff;
    border-radius: 5px;
    margin: 10px 0px;
    padding: 0px 10px;

    p {
      line-height: 50px;
      font-size: 18px;
      color: #666;
    }
    i {
      color: #ccc;
    }
  }

  #quit {
    width: 100%;
    padding: 0px 10px;
  }
}
</style>