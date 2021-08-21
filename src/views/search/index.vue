<template>
  <div id="search">
    <!-- 搜索框主体 -->
    <div id="search_main">
      <form action="/">
        <van-search
          v-model="values"
          show-action
          color="#fff"
          @search="onSearch"
          background="rgb(26, 16, 68)"
          placeholder="请输入搜索关键词"
        >
          <!-- 取消按钮 -->
          <template #action>
            <div @click.prevent="$router.back()" id="cancel">取消</div>
          </template></van-search
        >
      </form>
    </div>

    <!-- 联想模块 -->
    <Associate :data="article_lianxiang" v-if="true" />

    <!-- 搜索结果区域 -->
    <Result :article_data="article_data" />
  </div>
</template>

<script>
// 引入子组件
import associate from "./components/associate.vue";
import result from "./components/result.vue";
// 引入请求方法
import { search_associate, search_result } from "@/apis/search.js";
export default {
  name: "search",
  components: {
    Associate: associate,
    Result: result,
  },

  data() {
    return {
      // 表单数据
      values: "",

      // 搜索出的文章数据--联想数据
      article_lianxiang: [],

      // 搜索出的文章数据----结果
      article_data: [],
    };
  },

  methods: {
    // 回车搜索功能
    async onSearch(val) {
      try {
        // 获取结果的请求方法
        const res = await search_result({
          page: 1,
          per_page: 10,
          q: val,
        });
        let datas = res.data.data;
        // 将返回的数据传递给子组件
        this.article_data = datas.results;
      } catch (error) {
        console.log(error);
      }
    },

    // 联想功能
    async onchange(val) {
      try {
        // 获取联想文章数据
        const res = await search_associate({
          q: val,
        });
        let datas = res.data.data;
        // 将联想数据准备传递给联想组件
        this.article_lianxiang = datas.options;
      } catch (error) {}
    },
  },
  // 监视数据
  watch: {
    // 当values改变时触发联想请求方法
    values(newData) {
      this.onchange(newData);
    },
  },
};
</script>

<style lang="less" scoped>
#cancel {
  color: #fff;
}
</style>