<template>
  <!-- 修改生日 -->
  <div id="user_birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="save()"
      @confirm="save(true)"
    />
  </div>
</template>

<script>
import { setUser } from "@/apis/users";
import { Toast } from "vant";
import dayjs from "dayjs";
export default {
  name: "userBirth",
  //   传入的生日对象
  props: {
    time: { Type: [String, Number], required: true },
  },

  data() {
    return {
      // 最小选择时间
      minDate: new Date(1900, 0, 1),
      //   最大选择时间
      maxDate: new Date(),
      //   选择的时间
      currentDate: new Date(this.time) ? new Date(this.time) : new Date(),
    };
  },

  methods: {
    //   保存方法or取消
    async save(is) {
      // 获取修改的时间并格式化
      let time = dayjs(this.currentDate).format("YYYY-MM-DD");
      if (is) {
        // 保存
        Toast.loading({
          message: "保存中...",
          forbidClick: true,
          duration: 0,
        });
        await setUser({ birthday: time });
        Toast.success("保存成功");
        this.$bus.$emit("settime", time);
        return;
      }
      //   取消
      this.$bus.$emit("settime");
    },
  },
};
</script>

<style>
</style>