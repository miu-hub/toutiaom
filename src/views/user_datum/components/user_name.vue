<template>
  <div id="user_name">
    <!-- 头部 -->
    <van-nav-bar
      title="昵称编辑"
      left-text="返回"
      right-text="完成"
      id="title"
      left-arrow
      @click-left="back()"
      @click-right="back(true)"
    />

    <!-- 编辑区 -->
    <van-cell-group inset>
      <van-field
        v-model="username"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-cell-group>
  </div>
</template>

<script>
import { Toast } from "vant";
import { setUser } from "@/apis/users";
export default {
  name: "userName",
  props: {
    uname: {
      Type: String,
      required: true,
    },
  },

  data() {
    return {
      username: this.uname,
    };
  },
  methods: {
    //   点击导航栏返回or完成时
    back(is) {
      // 点击完成
      if (is) {
        //   处理name
        let nc = this.username.trim();
        // 判断长短
        if (nc.length < 1) {
          Toast.fail("昵称太短");
          return;
        }
        // 判断name修改
        if (nc == this.uname) {
          Toast.fail("昵称未修改");
          return;
        }
        this.setUserInfo(nc);
      }
      //   返回
      this.$bus.$emit("back");
    },

    // 修改用户资料信息
    async setUserInfo(uname) {
      Toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await setUser({
          name: uname,
        });
        Toast.success("修改成功");
        this.$bus.$emit("back", res.data.data.name);
      } catch (error) {
        //   修改用户信息失败
        Toast.fail(" 修改用户信息失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
#user_name {
  width: 100%;
  // 头部
  #title {
    background-color: rgb(26, 16, 68);
    width: 100%;
    /deep/.van-nav-bar__text,
    /deep/.van-icon,
    /deep/.van-nav-bar__title {
      color: #fff;
    }
  }

  //   编辑区
  /deep/.van-cell-group {
    margin-top: 40px;
    border: 1px solid #ccc;
  }
}
</style>