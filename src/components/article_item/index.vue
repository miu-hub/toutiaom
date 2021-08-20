<template>
  <!-- 文章预览 -->
  <div id="item">
    <!-- 标题 -->
    <div id="title_item">
      <p>{{ this.items.title }}</p>
      <!-- 封面 -->
      <div id="img" v-if="this.items.cover.type === 3">
        <van-image
          class="three_img"
          v-for="(item, i) in this.items.cover.images"
          :key="i"
          :src="item"
          cover
        />
      </div>

      <!-- 单图 -->
      <div id="img" v-if="this.items.cover.type === 1">
        <van-image class="one_img" cover :src="this.items.cover.images[0]" />
      </div>

      <!-- 文章信息 -->
      <!-- 这里的类名控制不同状态下样式 -->
      <div class="info">
        <span>
          {{ this.items.aut_name }}
        </span>
        <span> {{ this.items.comm_count }}评论 </span>
        <span>
          {{ this.items.pubdate | timeout }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import "@/utils/date";
export default {
  name: "article_item",
  props: {
    //   引入频道文章信息
    items: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
#item {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0px;
  background-color: #fff;
  margin: 2px 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #ccc;

  // 内容预览
  #title_item {
    width: 350px;
    padding: 0px 10px;
    // 标题
    p {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .info {
      width: 75%;
      padding-left: 10px;
      //   作者相关信息
      span {
        font-size: 10px;
        margin-right: 15px;
        color: #666;
        // 作者
        &:first-child {
          color: red;
          font-weight: 700;
        }
      }
    }

    // img封面----三图
    #img {
      width: 100%;
      height: 80px;
      margin-bottom: 5px;
      .three_img {
        margin-right: 5px;
        width: 100px;
        height: 80px;
        border: 1px solid #666;
      }
    }

    .one_img {
      float: right;
      width: 100px;
      height: 80px;
      border: 1px solid #666;
    }
  }
}
</style>