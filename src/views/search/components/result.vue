<template>
  <div>
    <!-- 返回的文章展示模块 -->
    <van-cell
      title="暂无更多的结果"
      class="title-style"
      v-if="!this.article_data.length > 0"
    />
    <van-cell
      v-else
      :title="item.title"
      v-for="(item, i) in this.article_data"
      :key="i"
      @click="Query(i)"
    />
  </div>
</template>

<script>
export default {
  name: "result",
  props: {
    article_data: {
      Type: Array,
      required: true,
    },
  },

  methods: {
    Query(i) {
      // 点击后跳转到相应的页面上
      let id = this.article_data[i].art_id;
      this.$router.push(`/article/${id}`);
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