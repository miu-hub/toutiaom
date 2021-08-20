<template>
  <div id="pd_pull">
    <!-- 我的频道 -->
    <div id="my_channels">
      <!-- 顶部 -->
      <div id="my_top">
        <p>我的频道</p>
        <span id="tip">点击进入频道</span>
        <van-button id="del_btn" type="danger" round>编辑</van-button>
      </div>

      <!-- 模块区 -->
      <div id="model_channels">
        <span v-for="(item, i) in this.userChannels" :key="i"
          ><p>{{ item.name }}</p></span
        >
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
        <!-- 遍历用户为关注的频道 -->
        <span v-for="(recom, index) in recommchannels" :key="index"
          ><p>{{ recom.name }}</p></span
        >
      </div>
    </div>
  </div>
</template>

<script>
// 获取全部频道
import { allChannels } from "@/apis/articleApi";
export default {
  name: "channel",
  props: {
    //   用户的频道数据
    userChannels: {
      Type: Array,
      required: true,
    },
  },

  data() {
    return {
      // 全部的频道数据列表
      comChammel: [],
    };
  },

  created() {
    this.all_channel();
  },

  methods: {
    //   获取全部频道数据
    async all_channel() {
      try {
        const res = await allChannels();
        // 全部频道的请求数据
        // console.log(res.data.data.channels);
        this.comChammel = res.data.data.channels;
      } catch (error) {}
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

      span {
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