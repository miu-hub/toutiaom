<template>
  <div id="login">
    <!-- @click-left="onClickLeft" -->
    <!-- @click-right="onClickRight" -->
    <!-- 登录头部 -->
    <van-nav-bar
      title="登录 / 注册"
      left-text="返回"
      class="header_top_nav"
      left-arrow
      @click-left="skip"
    />

    <!-- 登陆数据 -->
    <div id="from">
      <van-form
        inset
        :submit-on-enter="true"
        :show-error="true"
        :show-error-message="false"
        validate-first
        @submit="onLogin"
        @failed="ver_err"
        ref="forms"
      >
        <van-field
          maxlength="11"
          class="iconfont icon-shouji"
          v-model="userInfo.mobile"
          :rules="Rules.mobile"
          name="mobile"
          placeholder="请输入手机号"
        />
        <van-field
          clearable
          :center="true"
          maxlength="6"
          v-model="userInfo.code"
          :rules="Rules.code"
          class="iconfont icon-yanzhengma"
          placeholder="请输入验证码"
          ><template #button>
            <!-- 倒计时控件 -->
            <van-count-down
              @finish="time_btn = false"
              v-if="time_btn"
              :time="1000 * 60"
              format="ss s"
            />
            <!-- 发送验证码 -->
            <van-button
              v-else
              :disabled="time_btn"
              size="small"
              round
              @click.prevent="getCode"
            >
              发送验证码</van-button
            >
          </template></van-field
        >
        <!-- 登录按钮 -->
        <div id="btn">
          <van-button
            id="su_btn"
            :disabled="isLoading"
            :loading="isLoading"
            loading-text="登录中..."
            block
            round
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <!-- 底部文本 -->
    <div id="text">
      <p>账号：13911111111 密码：246810</p>
      <p>如果手机收不到验证码 密码：246810</p>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { userLogin, userCode } from "@/apis/users.js";
export default {
  name: "login",
  data() {
    return {
      // 用户信息
      userInfo: { mobile: "", code: "" },
      // 控制登录加载按钮
      isLoading: false,
      // 表单校验规则
      Rules: {
        mobile: [
          { required: true, message: "输入不能为空" },
          {
            pattern: /^1[3|5|7|8][1|2|3|4|5|6|7|8|9]\d{8}$/,
            message: "电话号格式错误",
          },
        ],
        code: [
          { required: true, message: "输入不能为空" },
          { pattern: /^\d{6}$/, message: "输入6位数字的验证码" },
        ],
      },

      // 验证码按钮禁用
      time_btn: false,
    };
  },
  methods: {
    // 登录
    async onLogin() {
      // 点击登录显示登录中
      this.isLoading = true;

      try {
        const res = await userLogin(this.userInfo);
        // 登录成功
        let datas = res.data.data;
        // 将用户token存入VueX
        this.$store.commit("setUser", datas);
        // 加载提示
        Toast.success("登录成功");
        // 关闭登录显示登录中
        this.isLoading = false;
        // 跳转
        this.$router.push("/user");
      } catch (error) {
        // 登录失败
        console.log(error);
        // 加载提示
        Toast.fail("登录失败");
        // 关闭登录显示登录中
        this.isLoading = false;
      }
    },
    // 验证不通过时
    ver_err(e) {
      // 验证提示信息
      if (e.errors[0]) {
        Toast.fail(e.errors[0].message);
        return;
      }
      Toast.fail(e.errors[1].message);
    },
    // 获取手机验证码
    async getCode() {
      // 单独进行表单验证
      try {
        // 验证
        await this.$refs["forms"].validate("mobile");
        // 发送验证码
        // 禁用btn
        this.time_btn = true;
        await userCode(this.userInfo.mobile);
        // 提示信息
        Toast.success("验证码发送成功");
      } catch (error) {
        Toast.fail(error.message);
        // 开启btn
        this.time_btn = false;
      }
    },

    // 跳转方法
    skip() {
      this.$router.push("/user");
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  #from {
    padding: 25px 10px 0px 10px;
    .van-field__button {
      height: 24px;
      .van-button {
        background-color: rgb(26, 16, 68);
        color: #fff;
        font-size: 10px;
      }
    }
    // 提交按钮
    #btn {
      padding: 25px 15px;
      #su_btn {
        color: #fff;
        background-color: rgb(26, 16, 68);
      }
    }
  }

  // 底部文本
  #text {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    p {
      margin: 10px;
      color: #666;
      font-size: 10px;
    }
  }
}
</style>