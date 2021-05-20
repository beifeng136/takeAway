<template>
  <div class="app">
    <div class="header">
      <div v-if="shopInfor">
        <h2>{{ shopInfor.score }}</h2>
        <p>综合评分</p>
        <p>高于周边商家99%</p>
      </div>
      <div>
        <span>
          <van-rate readonly v-model="shopInfor.serviceScore" allow-half />
          <span
            >服务评分 <i style="color: #f19d39">{{ shopInfor.serviceScore }}</i>
          </span>
        </span>
        <span>
          <van-rate readonly v-model="shopInfor.goodsScore" allow-half />
          <span
            >商品评分
            <i style="color: #f19d39">{{ shopInfor.goodsScore }}</i></span
          >
        </span>
        <span>
          送达时间
          <i style="margin-left: 8px">{{ shopInfor.deliveryTime }}分钟</i>
        </span>
      </div>
    </div>
    <div class="rating">
      <div>
        <span>
          <van-button
            type="default"
            style="background-color: #4aa478; color: #fff"
            >全部{{ allRatNum }}</van-button
          >
          <van-button type="default" style="background-color: #dcddde"
            >满意{{ goodRat }}</van-button
          >
          <van-button type="default" style="background-color: #dcddde"
            >不满意{{ badRat }}</van-button
          >
        </span>
        <span>
          <van-icon name="checked" />
          <span>只看有内容的评论</span>
        </span>
      </div>
      <div class="content" v-for="item in shopRat" :key="item.count">
        <div class="img">
          <van-image
            round
            width="30px"
            height="30px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="right">
          <span>
            <i>{{ formatCount(item.account) }}</i>
            <span>{{ item.oederTime }}</span>
          </span>
          <van-rate
            readonly
            v-model="item.score"
            allow-half
            size="15px"
            void-icon="star"
            void-color="#f19d39"
          />
          <span>{{ item.comments }}</span>
          <div class="tag">
            <van-icon name="good-job" color="#f19d39" />
            <van-tag color="#ffe1e1" text-color="#ad0000">南瓜粥</van-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "ratings",
  setup() {
    let route = useRoute();
    let router = useRouter();
    let state = reactive({
      shopId: 0,
      shopInfor: {},
      shopRat: {},
      goodRat: 0,
      badRat: 0,
      allRatNum: 0,
    });
    const getShopInfor = async () => {
      // 商家信息
      const { data: res } = await axios.get(
        `/biz//queryInfoByShopId?shopId=${state.shopId}`
      );
      state.shopInfor = res;
      // console.log(state.shopInfor);
    };
    const getShopRat = async () => {
      // 获取评论
      const { data: res } = await axios.get(
        `/biz//queryCommentByShopId?shopId=${state.shopId}`
      );
      state.shopRat = res;
      state.shopRat.forEach((element) =>
        element.isGood ? state.state++ : state.badRat++
      );
      state.allRatNum = state.shopRat.length;
    };
    // 使用方法的形式 代替过滤器
    const formatCount = (value) => {
      let text =
        value[0] + "*".repeat(value.length - 2) + value[value.length - 1];
      return text;
    };
    onMounted(() => {
      state.shopId = route.query.id;
      getShopInfor();
      getShopRat();
    });
    return {
      ...toRefs(state),
      formatCount,
    };
  },
};
</script>
<style lang="less" scoped>
@fontColor: #7c8285;
@fontColorStar: #f19d39;
@fontSize: 12px;
div {
  box-sizing: border-box;
}
.app {
  background-color: #f4f5f7;
}
.header {
  display: flex;
  height: 90px;
  width: 100%;
  border: 1px solid rgba(119, 103, 137, 0.1);
  > div {
    height: 100%;
  }
  background-color: #fff;
  > div:nth-child(1) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1.3;
    p {
      font-size: @fontSize;
      margin: 0;
    }
    > p:nth-child(2) {
      font-weight: 700;
    }
    > p:nth-child(3) {
      color: @fontColor;
    }
    h2 {
      color: #f19d39;
      margin: 0;
    }
  }
  > div:nth-child(1)::after {
    content: "";
    position: absolute;
    height: 80%;
    right: 0;
    top: 50%;
    width: 1px;
    transform: translateY(-50%);
    background-color: rgba(119, 103, 137, 0.43);
  }
  > div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // background-color: darkgoldenrod;
    flex: 2;
    /deep/ .van-rate__icon {
      font-size: @fontSize+4;
    }
    > span {
      box-sizing: border-box;
      padding: 4px 10px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: @fontSize;
      font-weight: 700;
      i {
        font-weight: normal;
        color: @fontColor;

        font-style: normal;
      }
    }
    > span:nth-child(3) {
      justify-content: start;
      text-align: left;
    }
  }
}
.rating {
  margin-top: 15px;
  > div:nth-child(1) {
    display: flex;
    height: 100px;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    background-color: #fff;
    > span {
      font-size: @fontSize;
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
    > span:nth-child(1) {
      .van-button {
        height: 38px;
        padding: 0 14px;
        font-size: @fontSize;
        margin-left: 10px;
        border-radius: 0;
      }
    }
    > span:nth-child(2) {
      color: @fontColor;
      .van-icon {
        font-size: 20px;
        margin: 0 5px;
        color: #4da379;
      }
    }
  }
}
.content {
  display: flex;
  .img {
    display: flex;
    justify-content: flex-end;
    flex: 0.15;
    height: 100%;
    // background-color: darkcyan;
  }
  .right {
    i {
      font-style: normal;
    }
    font-size: @fontSize+2;
    display: flex;
    padding: 0 5px;
    flex-direction: column;
    flex: 0.95;
    height: 100%;
    > * {
      padding: 3px 0;
    }
    .tag {
      flex-wrap: wrap;
      display: flex;
      align-items: center;
      .van-tag {
        padding: 3px 5px;
        margin: 0 3px;
      }
    }
    span:nth-child(1) {
      display: flex;
      justify-content: space-between;
      span {
        color: @fontColor;
      }
    }
  }
  background-color: #fff;
  padding: 5px;
  border-top: 1px solid rgba(119, 103, 137, 0.1);
  border-bottom: 1px solid rgba(119, 103, 137, 0.1);
}
</style>

