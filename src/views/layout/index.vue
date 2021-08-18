<template>
  <div id="layout">
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item class="iconfont icon-zhuye" to="/">首页</van-tabbar-item>
      <van-tabbar-item class="iconfont icon-V" to="/faqs">问答</van-tabbar-item>
      <van-tabbar-item class="iconfont icon-shipin" to="/vid"
        >视频</van-tabbar-item
      >
      <van-tabbar-item class="iconfont icon-wode" to="/user"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
#layout {
  background-color: pink;
}
</style>