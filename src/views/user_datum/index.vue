<template>
  <!-- 编辑用户资料 -->
  <div id="user_datum">
    <!-- 头部导航 -->
    <van-nav-bar
      title="资料编辑"
      left-text="返回"
      id="title"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 用户信息区 -->
    <van-cell class="cell" title="头像" is-link>
      <van-image
        width="30"
        height="30"
        fit="cover"
        center
        round
        :src="info.photo"
      />
    </van-cell>
    <van-cell
      class="cell"
      title="昵称"
      @click="show_name = true"
      is-link
      :value="info.name"
    />
    <van-cell
      @click="show_genter = true"
      class="cell"
      title="性别"
      is-link
      :value="info.gender == 0 ? '男' : '女'"
    />
    <van-cell
      @click="show_bir = true"
      class="cell"
      title="生日"
      is-link
      :value="info.birthday"
    />
    <!-- 弹出层 -->
    <!-- name -->
    <van-popup
      v-model="show_name"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UserName :uname="info.name" v-if="show_name" />
    </van-popup>
    <!-- 性别-->
    <van-popup v-model="show_genter" position="bottom">
      <UserGenter :genter="info.gender" v-if="show_genter" />
    </van-popup>
    <!-- 生日 -->
    <van-popup v-model="show_bir" position="bottom">
      <UserBirthday v-if="show_bir" :time="info.birthday" />
    </van-popup>
  </div>
</template>

<script>
import { getUser } from "@/apis/users";
import { Toast } from "vant";
import userName from "./components/user_name.vue";
import userGenter from "./components/user_genter.vue";
import userBirth from "./components/user_birthday.vue";
export default {
  name: "userDatum",
  components: {
    UserName: userName,
    UserGenter: userGenter,
    UserBirthday: userBirth,
  },

  data() {
    return {
      // 控制弹框
      show_name: false,
      show_genter: false,
      show_bir: false,
      //   用户信息
      info: {},
    };
  },

  created() {
    this.getUserInfo();
  },
  mounted() {
    //   触发的更新昵称事件
    this.$bus.$on("back", (newName) => {
      // 判断有无参数------即是取消操作还是确定操作
      //   下同
      if (newName != null) {
        this.info.name = newName;
      }
      this.show_name = false;
    });
    // 触发的更新性别事件
    this.$bus.$on("back_gender", (newGen) => {
      if (newGen != null) {
        this.info.gender = newGen;
      }
      this.show_genter = false;
    });
    // 触发的更新生日事件
    this.$bus.$on("settime", (newtime) => {
      if (newtime != null) {
        this.info.birthday = newtime;
      }
      this.show_bir = false;
    });
  },
  beforeDestroy() {
    //   组件卸载时销毁全局事件
    this.$bus.$off("back");
    this.$bus.$off("back_gender");
  },

  methods: {
    //   获取用户信息
    async getUserInfo() {
      try {
        const res = await getUser();
        this.info = res.data.data;
      } catch (error) {
        Toast.fail("获取用户信息失败");
      }
    },
  },
};
</script>
<style lang="less" scoped>
#user_datum {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  #title {
    background-color: rgb(26, 16, 68);
    width: 100%;
    /deep/.van-nav-bar__text,
    /deep/.van-icon,
    /deep/.van-nav-bar__title {
      color: #fff;
    }
  }

  .cell {
    margin-top: 10px;
    width: 96%;
    border-radius: 10px;
  }
}
</style>