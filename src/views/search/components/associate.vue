<template>
  <div>
    <!-- 联想数据的展示 -->
    <!-- 无数据 -->
    <van-cell
      class="title-style"
      title="暂无联想的数据"
      v-if="!this.data.length > 0"
    >
    </van-cell>
    <!-- 有数据 -->
    <van-cell
      v-else
      icon="search"
      v-for="(item, i) in this.data"
      :key="i"
      @click="Query(i)"
    >
      <div slot="title" v-html="hignligh(item)"></div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "associate",
  props: {
    data: {
      Type: Array,
      required: true,
    },

    // 输入时动态的关键字
    s_k: {
      Type: String,
      required: true,
    },
  },
  methods: {
    // 点击联想
    Query(i) {
      this.$bus.$emit("keywords", this.data[i]);
    },
    // 联想出来的代码块高亮显示
    hignligh(str) {
      // 使用正则来处理需要高亮的数据
      // 使用new的方法来映入变量
      let reg = new RegExp(this.s_k, "i");
      // 替换
      let newstr = str.replace(
        reg,
        `<span style='color:red'>${this.s_k}</span>`
      );
      return newstr;
    },
  },
};
</script>

<style lang="less" scoped>
.title-style {
  text-align: center;
  margin-top: 10px;
}
</style>