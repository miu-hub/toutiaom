<template>
  <div id="userChat">
    <van-nav-bar
      title="小智"
      left-text="返回"
      class="header_top_nav"
      left-arrow
      @click-left="$router.push('/user')"
    />

    <!-- 消息展示 -->
    <van-cell-group id="mess">
      <van-cell
        title="单元格"
        value="内容"
        v-for="(item, i) in show_mes"
        :key="i"
      />
    </van-cell-group>
    <!-- 消息发送 -->
    <van-cell-group inset id="push">
      <van-field v-model="sms" center placeholder="说点什么吧">
        <template #button>
          <van-button size="small" type="primary" @click="push"
            >发送</van-button
          >
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script >
// 引入socket.io库;
import io from "socket.io-client";
export default {
  name: "userChat",
  data() {
    return {
      // 消息内容
      sms: "",
      //   socket对象
      ws: null,

      show_mes: [],
    };
  },
  methods: {
    push() {
      // 发布消息
      this.ws.emit("message", {
        msg: this.sms,
        timestamp: Date().now,
      });
      // 将发布的消息添加到数据展示
      this.show_mes.push(this.sms);
      this.sms = "";
    },
  },
  created() {
    // //   建立链接
    // const ws = io("http://192.168.1.3:8080/app/socket.io/");
    // ws.on("connect", () => {
    //   console.log("建立连接成功了");
    // });
    // ws.on("disconnect", () => {
    //   console.log("断开连接了");
    // });
    // // 监听message事件，收取消息
    // ws.on("message", (data) => {
    //   // 将收到的消息添加到数据展示
    //   this.show_mes.push(data);
    // });
    // this.ws = ws;
  },
};
</script>

<style lang="less" scoped>
#userChat {
  width: 100%;
  height: 100%;

  #mess {
    width: 100%;
    position: fixed;
    top: 50px;
    bottom: 54px;
    overflow-y: auto;
  }

  #push {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    margin: 0px;

    .van-button--primary {
      background-color: rgb(26, 16, 68);
      border: 0px;
    }
  }
}
</style>