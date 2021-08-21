<template>
  <div>
    <van-cell
      :title="item.title"
      icon="search"
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
      console.log(i);
    },
  },
};
</script>

<style>
</style>