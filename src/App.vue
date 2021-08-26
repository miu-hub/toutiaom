<template>
  <div id="app">
    <!-- 路由视口出口 -->
    <keep-alive :include="Incluede">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed:{
    ...mapState(['Incluede'])
  }
};
</script>
<style lang="less">
</style>
