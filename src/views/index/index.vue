<template>
  <!-- 首页 -->
  <div id="index">
    <!-- 头部 -->
    <div class="header_top_nav in">
      <van-button
        icon="search"
        color="rgba(255, 255, 255,.1)"
        type="primary"
        size="small"
        round
        id="btn_sea"
        >点击搜索</van-button
      >
    </div>
    <!-- 导航区 -->
    <van-tabs
      v-model="active"
      title-active-color="rgb(26, 16, 68)"
      color="rgb(26, 16, 68)"
      title-inactive-color="#666"
      :swipeable="true"
    >
      <van-tab :title="item.name" v-for="(item, i) in art_channels" :key="i">
        <!-- 文章列表 -->
        <!-- 每个频道都创建一个组件 -->
        <!-- 将每个频道数据分别传入对应的组件 -->
        <articleList :item="item" />
      </van-tab>
      <!-- 占据切换栏的位置，避免因为切换到蓝底而导致的按钮遮挡栏 -->
      <div slot="nav-right" id="codd"></div>

      <!-- 弹出层按钮 -->
      <div slot="nav-right" id="right_nav" @click="top_cen">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道弹出层 -->
    <van-popup
      v-model="show"
      closeable
      get-container="body"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Channels :userChannels="art_channels" :active="this.active" />
    </van-popup>
  </div>
</template>

<script>
// 导入请求
import { getArticlegetChannels } from "@/apis/articleApi";
// 引入子组件
import articleList from "./components/article_list.vue";
// 引入频道组件
import channels from "@/components/pd_pull/";
// 引入vuex
import { mapState } from "vuex";
// 引入store封装的方法
import { getItem } from "@/utils/storage";
import { Toast } from "vant";
export default {
  name: "index",
  // 注册子组件
  components: {
    articleList: articleList,

    Channels: channels,
  },
  created() {
    // 刷新页面加载
    this.get_art_channels();
  },
  mounted() {
    // 注册全局事件
    this.$bus.$on("chext", (value, del) => {
      if (del) {
        this.active = value;
        return;
      }

      // 接收出发后隐藏频道列表
      this.show = false;
      //  跳转到切换的页面
      this.active = value;
    });
  },
  // 组件销毁前卸载全局事件总线
  beforeDestroy() {
    this.$bus.$off("chext");
  },

  data() {
    return {
      // 导航栏当前栏
      active: 0,
      // 文章列表信息
      art_channels: {},
      // 控制频道弹出层
      show: false,
    };
  },

  methods: {
    // 异步请求----获取文章频道
    async get_art_channels() {
      // 判断登录状态决定列表数据的获取方法
      if (this.User) {
        try {
          const res = await getArticlegetChannels();
          // 将返回的值渲染给组件
          this.art_channels = res.data.data.channels;
        } catch (error) {
          Toast.fail("获取失败");
        }
        return;
      }
      // 获取本地数据-----没有登录的请求下
      let los = getItem("user_channels");
      // 判断用户是否有本地数据
      if (los) {
        //有
        // 将本地存储的数据渲染在列表上
        this.art_channels = los;
        return;
      }
      // 若是用户没有本地存储---则请求默认接口数据列表
      try {
        const res = await getArticlegetChannels();
        this.art_channels = res.data.data.channels;
      } catch (error) {
        Toast.fail("获取失败");
      }
    },
    // 当点击按钮时更新弹层
    top_cen() {
      this.show = true;
      // 触发更新事件
      this.$bus.$emit("change");
    },
  },

  computed: {
    // 将vuex中的数据映射
    ...mapState(["User"]),
  },
};
</script>

<style lang="less" scoped>
#index {
  .in {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    position: relative;
    background-color: rgb(26, 16, 68);

    #btn_sea {
      width: 200px;
      border: 0px;
    }
  }
  // 折叠导航栏按钮
  #right_nav {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0px;
    width: 40px;
    height: 45px;
    background-color: rgb(210, 224, 226);
  }
  // 占位box
  #codd {
    width: 40px;
    flex-shrink: 0;
  }

  /deep/.van-tab {
    border-right: 1px solid rgb(238, 236, 236);
    padding: 0px 20px;
  }
}
</style>