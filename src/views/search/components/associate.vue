<template>
  <div>
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, i) in this.data"
      :key="i"
      @click="Query(i)"
    />
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