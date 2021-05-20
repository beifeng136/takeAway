<template>
  <div class="app">
    <div class="infor">
      <h3>配送信息</h3>
      <span
        ><van-tag color="#7232dd">联想外卖</van-tag>由商家配送提供配送,约{{
          shopInfor.deliveryTime
        }}分钟送达,距离{{ shopInfor.distance }}m</span
      >

      <span>配送费￥{{ shopInfor.transportationPrice }}</span>
    </div>
    <div class="service">
      <h3>活动与服务</h3>
      <span v-for="item in shopDiscount" :key="item.contents">
        <van-tag color="#7232dd">{{ item.tag }}</van-tag>
        <i>{{ item.contents }}</i>
      </span>
    </div>
    <div class="Augmented">
      <h3>商家实景</h3>
      <span>
        <van-image fit="contain" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <van-image fit="contain" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <van-image fit="contain" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
      </span>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "shopInfor",
  setup() {
    let route = useRoute();
    let router = useRouter();
    let state = reactive({
      shopInfor: {},
      shopDiscount: {},
      shopId: "",
    });
    const getShopInfor = async () => {
      const { data: res } = await axios.get(
        `/biz//queryInfoByShopId?shopId=${state.shopId}`
      );
      state.shopInfor = res;
    };
    const getDiscount = async () => {
      const { data: res } = await axios.get(
        `/biz//querySpecialOfferByShopId?shopId=${state.shopId}`
      );
      state.shopDiscount = res;
    };
    onMounted(() => {
      state.shopId = route.query.id;
      getShopInfor();
      getDiscount();
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less" scoped>
@fontColor: #7c8285;
@fontColorStar: #f19d39;
@fontSize: 13px;
.app {
  background-color: #f4f5f7;
}
.app {
  font-size: @fontSize;
  > div {
    box-sizing: border-box;
    background-color: #fff;
    padding: 8px;
    margin-bottom: 10px;
  }
  h3 {
    margin: 5px 0;
    font-size: @fontSize+5;
  }
  i {
    font-style: normal;
  }
  .van-tag {
    margin-right: 5px;
  }
}
.infor {
  display: flex;
  height: 105px;
  width: 100%;
  flex-direction: column;
  border: 1px solid rgba(119, 103, 137, 0.1);
  font-size: @fontSize;
  color: @fontColor;
  h3 {
    color: black;
  }
  > * {
    margin: 5px 0;
  }
}
.service {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 5px;
  border: 1px solid rgba(119, 103, 137, 0.1);
  > * {
    margin: 5px 0;
  }
}
.Augmented {
  display: flex;
  // width: 100%;
  padding: 5px;
  flex-direction: column;
  border: 1px solid rgba(119, 103, 137, 0.1);
  > span {
    width: 100%;
    justify-content: space-around;
    display: flex;
    .van-image {
      flex: 1;
      height: 4rem;
    }
  }
}
</style>
