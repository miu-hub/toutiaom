<template>
  <div id="pd_pull">
    <!-- 我的频道 -->
    <div id="my_channels">
      <!-- 顶部 -->
      <div id="my_top">
        <p>我的频道</p>
        <span id="tip">点击进入频道</span>
        <van-button
          id="del_btn"
          type="danger"
          @click="edit_is = !edit_is"
          round
          >{{ edit_is ? "确定" : "编辑" }}</van-button
        >
      </div>

      <!-- 模块区 -->
      <div id="model_channels">
        <span
          v-for="(item, i) in this.userChannels"
          :key="i"
          :class="{ lig: is_click == i }"
          @click="remove(item.id, i)"
          ><p>{{ item.name }}</p>
          <!-- 展示删除状态---v-show="i != 0 && edit_is"-----推荐不能展示删除 -->
          <i class="iconfont icon-guanbi" v-show="i != 0 && edit_is"></i>
        </span>
      </div>
    </div>
    <!-- 推荐频道 -->
    <div id="recom_channels">
      <!-- 顶部 -->
      <div id="com_top">
        <p>推荐频道</p>
        <span>点击添加频道</span>
      </div>

      <!-- 模块区 -->
      <div id="com_channels">
        <!-- 遍历用户未关注的频道 -->
        <span
          @click="add_channels(recom)"
          v-for="(recom, index) in recommchannels"
          :key="index"
          ><p>{{ recom.name }}</p></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
// 获取全部频道
import { allChannels, addChannels, delChannels } from "@/apis/articleApi";
//获取本地存储
import { setItem } from "@/utils/storage";
export default {
  name: "channel",
  props: {
    //   用户的频道数据
    userChannels: {
      Type: Array,
      required: true,
    },
    // 用户当前页面信息
    active: {
      Type: Number,
      required: true,
    },
  },
  data() {
    return {
      // 全部的频道数据列表
      comChammel: [],

      // 控制编辑按钮的显示与隐藏
      edit_is: false,

      // 显示当前页面的样式效果
      is_click: this.active,
    };
  },
  created() {
    this.all_channel();
  },
  mounted() {
    // 处理从tab跳转过来是对应模块的高亮---使用计算属性是为了检测数据变化
    this.$bus.$on("change", () => {
      this.is_click = this.active;
    });
  },
  beforeDestroy() {
    this.$bus.$off("change");
  },

  methods: {
    //   获取全部频道数据
    async all_channel() {
      try {
        const res = await allChannels();
        // 全部频道的请求数据
        this.comChammel = res.data.data.channels;
      } catch (error) {}
    },
    // 添加入我的频道
    async add_channels(item) {
      //  在我的频道数组中添加新的频道元素
      if (this.User) {
        //添加线上
        let length = this.userChannels.length;
        try {
          await addChannels({
            // 按照接口要求更改参数
            channels: [
              {
                id: item.id,
                seq: length,
              },
            ],
          });
          // 将新的模块添加
          this.userChannels.push(item);
        } catch (error) {
          Toast.fail("添加失败" + error.message);
        }
      } else {
        // 添加线下
        this.userChannels.push(item);
        // 将添加后的数据存入本地存储
        setItem("user_channels", this.userChannels);
      }
    },
    // 移除我的频道
    async remove(id, i) {
      // 判断有无删除标
      // 有则删除----推荐（下标0的不能删）
      // 无则实现切换频道
      if (this.edit_is && i != 0) {
        if (i <= this.active) {
          // 删除指定下标的元素splice-----从数组i下表开始---删除1个元素
          this.is_click--;

          // 删除频道不改变原模块---不退出弹窗
          this.$bus.$emit("chext", this.is_click, true);
        }
        // 删除指定下标的元素splice-----从数组i下表开始---删除1个元素
        this.userChannels.splice(i, 1);
        // 判断用户是否时登录状态
        if (this.User) {
          try {
            // 删除频道方法
            await delChannels(id);
          } catch (error) {
            Toast.fail("删除失败");
          }
          return;
        }
        // 删除线下
        // 将添加后的数据存入本地存储
        setItem("user_channels", this.userChannels);
      } else {
        // 触发全局事件总线---切换频道
        this.is_click = i;
        this.$bus.$emit("chext", i);
      }
    },
  },

  computed: {
    //   利用计算属性获取用户为关注的频道
    recommchannels() {
      // filter用来过滤符合条件的数组元素----返回新数组---true通过--false去除
      return this.comChammel.filter((item) => {
        //   find用来遍历数组中的元素---符合条件的返回一个true---不符合返回false
        return !this.userChannels.find((chal) => {
          // 判断两个数据的id是否相同---若相同则返回true---但是外部返回的是取反的

          // 也就是相同情况下返回给fitlter的是false--不被加入新数组
          //   反之不相同返回给fitlter的是true---被加入新数组
          return item.id === chal.id;
        });
      });
    },

    ...mapState(["User"]),
  },
};
</script>

<style lang="less" scoped>
#pd_pull {
  width: 100%;
  height: 100%;
  padding: 50px 10px 0px 10px;

  //   我的频道
  #my_channels {
    width: 100%;

    #my_top {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 60px;

      p {
        margin-left: 30px;
        width: 100px;
        font-size: 20px;
        font-weight: 700;
        color: #666;
      }

      #tip {
        position: absolute;
        font-size: 12px;
        left: 120px;
        top: 26px;
        color: red;
      }

      #del_btn {
        margin-right: 50px;
        width: 60px;
        height: 30px;
        color: red;
        background-color: #fff;
      }
    }

    // 模块展示区
    #model_channels {
      display: flex;
      flex-flow: row wrap;
      justify-content: left;
      align-content: top;
      width: 100%;
      padding: 0px 20px;

      .lig {
        border-color: red;
        p {
          color: red;
        }
      }

      span {
        position: relative;
        margin: 15px;
        width: 70px;
        height: 40px;
        background-color: rgba(238, 238, 238, 0.514);
        border-radius: 5px;
        border: 1px solid rgb(163, 159, 179);

        p {
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          color: #555;
        }
      }
    }
  }

  //   推荐频道
  #recom_channels {
    margin-top: 50px;
    width: 100%;

    #com_top {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 60px;
      span {
        position: absolute;
        font-size: 12px;
        left: 120px;
        top: 26px;
        color: red;
      }
      p {
        width: 100px;
        color: #666;
        font-size: 20px;
        font-weight: 700;
        margin-left: 30px;
      }
    }

    // 模块展示区
    #com_channels {
      display: flex;
      flex-flow: row wrap;
      justify-content: left;
      align-content: top;
      width: 100%;
      padding: 0px 20px;

      span {
        margin: 15px;
        width: 70px;
        height: 40px;
        background-color: rgba(238, 238, 238, 0.514);
        border-radius: 5px;
        border: 1px solid rgb(163, 159, 179);

        p {
          font-size: 12px;
          text-align: center;
          line-height: 40px;
          color: #555;
        }
      }
    }
  }
}
</style>