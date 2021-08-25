<template>
  <div id="user_genter">
    <van-picker
      show-toolbar
      title="性别"
      :default-index="num"
      confirm-button-text="确定"
      cancel-button-text="取消"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { setUser } from "@/apis/users";
import { Toast } from "vant";
export default {
  name: "userGenter",

  props: {
    genter: {
      Type: Number,
      required: true,
    },
  },

  created() {
    this.num = this.genter;
  },

  data() {
    return {
      columns: ["男", "女"],
      num: null,
    };
  },

  methods: {
    async onConfirm(value, i) {
      Toast.loading({
        message: "保存中...",
        forbidClick: true,
      });
      this.num = i;
      await setUser({ gender: this.num });
      this.$bus.$emit("back_gender", i);
      Toast.success("保存成功");
    },
    onCancel() {
      this.$bus.$emit("back_gender");
    },
  },
};
</script>

<style>
</style>