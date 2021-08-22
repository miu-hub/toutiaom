<template>
  <div>
    <!-- 历史记录头部文本 -->
    <van-cell title="历史记录" v-show="this.historys.length > 0">
      <div>
        <van-icon name="delete-o" v-if="del" @click="dele" />
        <div v-else id="del_all">
          <span @click="del_all">全部删除</span>
          <span @click="complete">完成</span>
        </div>
      </div>
    </van-cell>

    <!-- 渲染的结果 -->
    <van-cell
      class="title-style"
      title="暂无搜索的历史记录"
      v-if="!this.historys.length > 0"
    >
    </van-cell>

    <!-- 记录 -->
    <van-cell
      v-else
      :title="item"
      icon="clock-o"
      v-for="(item, i) in this.historys"
      :key="i"
      @click.stop="Query(i)"
    >
      <div>
        <van-icon name="clear" v-show="!del" />
      </div>
    </van-cell>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { del_search } from "@/apis/search";
import { remove_Item, setItem } from "@/utils/storage";
import { mapState } from "vuex";
export default {
  name: "historys",
  props: {
    historys: {
      Type: Array,
      required: true,
    },
  },

  data() {
    return {
      // 特定按钮的显示与隐藏
      del: true,
    };
  },

  methods: {
    //   查询事件or 删除单个数据----没有线上删除单个数据的接口---只能处理线下了
    Query(i) {
      // 判断删除的显示状态---true-----单个删除按钮不显示---进入搜索
      if (this.del) {
        // 触发搜索方法
        this.$bus.$emit("keywords", this.historys[i]);
        return;
      }
      // 否则进入单个删除页面
      // 删除相应数据
      this.historys.splice(i, 1);
      // 把删除后的数据给到本地
      setItem("search_history", this.historys);
    },
    // 点击删除图标
    dele() {
      this.del = false;
    },
    // 全部删除
    async del_all() {
      // 全部删除确认框
      Dialog.confirm({
        message: "确定要删除所有历史记录吗？",
      })
        .then(() => {
          try {
            // 判断删除的登陆状态
            if (this.User) {
              // 调用删除方法
              del_search();
              this.del = true;
              // 刷新页面
              this.$router.go();
            } else {
              // 未登录状态删除全部数据
              remove_Item("search_history");
              this.del = true;
              // 刷新页面
              this.$router.go();
            }
          } catch (error) {
            Toast.fail("删除记录失败");
          }
        })
        .catch(() => {
          this.del = true;
        });
    },

    // 点击完成按钮
    complete() {
      console.log("删除完成");
      this.del = true;
    },
  },

  computed: {
    ...mapState(["User"]),
  },
};
</script>

<style lang="less" scoped>
#del_all {
  span {
    margin-left: 10px;
    font-size: 12px;
  }
}

.title-style {
  text-align: center;
  margin-top: 10px;
}
</style>