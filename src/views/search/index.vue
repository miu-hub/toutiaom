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
          ref="sea"
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
    <Associate :data="article_lianxiang" :s_k="s_k" v-show="is_ass" />

    <!-- 搜索结果区域 -->
    <Result :article_data="article_data" v-show="isData" />

    <!-- 搜索历史 -->
    <Historys :historys="article_keywords" v-show="isHistory" />
  </div>
</template>

<script>
// 引入本地存储库
import { getItem, setItem } from "@/utils/storage";
// 引入库
import { mapState } from "vuex";
// 引入子组件
import associate from "./components/associate.vue";
import result from "./components/result.vue";
import historys from "./components/history.vue";
// 引入请求方法
import {
  search_associate,
  search_result,
  search_history,
} from "@/apis/search.js";
import { Toast } from "vant";
export default {
  name: "search",
  components: {
    Associate: associate,
    Result: result,
    Historys: historys,
  },

  data() {
    return {
      // 表单数据
      values: "",

      // 搜索出的文章数据--联想数据
      article_lianxiang: [],
      // 联想数据展示
      is_ass: false,

      // 搜索出的文章数据----结果
      article_data: [],
      // 联想时关键字
      s_k: "",
      // 用户结果展示
      isData: false,

      // 用户历史搜索
      article_keywords: [""],
      // 历史展示控制
      isHistory: true,
    };
  },
  created() {
    this.myHistory();
  },

  mounted() {
    // 接收触发点击事件的返回关键字
    this.$bus.$on("keywords", (value) => {
      this.onSearch(value);
      this.values = value;
    });
  },

  beforeDestroy() {
    this.$bus.$off("keywords");
  },
  methods: {
    // 回车搜索功能
    async onSearch(val) {
      this.is_ass = false;
      this.isData = true;
      try {
        if (!val) {
          Toast.fail("请输入搜索的关键字");
          return;
        }

        // 获取结果的请求方法
        const res = await search_result({
          page: 1,
          per_page: 50,
          q: val,
        });
        let datas = res.data.data;

        // 将返回的数据传递给子组件
        this.article_data = datas.results;
        // 遍历数组，找出相同的历史记录并移除
        this.article_keywords.forEach((item, i) => {
          if (item === val) {
            this.article_keywords.splice(i, 1);
            return;
          }
        });

        // 将新的记录存储到本地
        this.article_keywords.unshift(val);
        setItem("search_history", this.article_keywords);
      } catch (error) {
        console.log(error);
      }
    },

    // 联想功能
    async onchange(val) {
      // 处理模块状态
      this.isData = false;
      this.isHistory = false;
      this.is_ass = true;
      // 将联想的关键字传递给组件处理---高亮
      this.s_k = val;
      // 当改变的内容为空时不发送请求
      if (!val) {
        this.is_ass = false;
        this.isHistory = true;
        return;
      }
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

    // 获取历史搜索功能
    async myHistory() {
      // 登录状态下的历史记录获取
      if (this.User) {
        try {
          const res = await search_history();
          // // 未登录状态时获取本地的历史记录
          this.article_keywords = res.data.data.keywords;
        } catch (error) {
          console.log("获取失败");
        }
      } else {
        // 未登录状态时获取本地的历史记录
        let is_null = getItem("search_history");
        // 判断本地存储是否为空
        if (is_null === null) {
          // 为空时将其转换为数组类型
          is_null = [];
        }
        //  不为空则直接获取历史记录
        this.article_keywords = is_null;
      }
    },
  },
  // 监视数据
  watch: {
    // 当values改变时触发联想请求方法
    values(newData) {
      this.onchange(newData);
    },
  },
  computed: {
    ...mapState(["User"]),
  },
};
</script>

<style lang="less" scoped>
#cancel {
  color: #fff;
}
</style>