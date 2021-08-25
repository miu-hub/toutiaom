<template>
  <div id="userimg">
    <img :src="preImg" ref="photo" />
    <!-- 导航栏 -->
    <van-nav-bar
      left-text="取消"
      right-text="确定"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import { setPhoto } from "@/apis/users";
import { Toast } from "vant";
// 引入裁剪库
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.common";
export default {
  name: "UserImg",
  props: {
    //   预览图片
    pre_imgobj: {
      Type: Object,
      required: true,
    },
  },

  data() {
    return {
      // 预览图片
      preImg: window.URL.createObjectURL(this.pre_imgobj),
    };
  },

  mounted() {
    // 获取需要裁切图片的dom;
    // const image = this.$refs.photo;
    // new Cropper(image, {
    //   viewMode: 1,
    //   dragMode: "move",
    //   aspectRatio: 1,
    //   cropBoxMovable: false,
    //   cropBoxResizable: false,
    //   background: false,
    //   movable: true,
    // });
  },

  methods: {
    //   取消按钮
    onClickLeft() {
      this.$bus.$emit("updata_photo");
    },
    // 确认按钮
    async onClickRight() {
      Toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      //   创建formData对象
      const d = new FormData();
      //   按照接口要求传入数据
      d.append("photo", this.pre_imgobj);

      try {
        //   发送请求
        await setPhoto(d);

        Toast.success("修改成功");
        // 触发更新方法
        this.$bus.$emit("updata_photo", this.preImg);
      } catch (error) {
        Toast.fail("修改失败");
      }
    },
  },
};
</script>

 <style lang="less" scoped>
#userimg {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #000;

  img {
    width: 100%;
    display: block;
  }

  /deep/ .van-nav-bar {
    width: 100%;
    position: fixed;

    bottom: 0px;
    left: 0px;
    background-color: #000;
    .van-nav-bar__text {
      color: #fff;
    }
  }
}
</style>

