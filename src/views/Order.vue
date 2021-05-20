<template>
  <van-nav-bar>
    <template #title>
      <span style="color: #fff">订单</span>
    </template>
  </van-nav-bar>
  <van-tabs v-if="isLogin" swipeable>
    <van-tab title="外卖订单">
      <OrderDetails />
    </van-tab>
    <van-tab title="待评价"> 待评价</van-tab>
    <van-tab title="退款"> 退款 </van-tab>
    <van-tab title="请他订单"> 请他订单</van-tab>
  </van-tabs>
  <van-empty description="还没有登录" v-else>
    <van-button round type="danger" class="bottom-button" to="/login"
      >登录</van-button
    >
  </van-empty>
</template>

<script>
import OrderDetails from "@/components/order/OrderDetails.vue";
import { onMounted, reactive, toRefs } from "vue";
import { localGet } from "@/utils";
export default {
  name: "order",
  components: { OrderDetails },
  setup() {
    const state = reactive({
      isLogin: false,
    });
    onMounted(() => {
      if (localGet("userInformation")) state.isLogin = true;
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: @themeColor;
  color: #fff;
  .fontsize {
    font-size: 30px;
  }
  /deep/.van-nav-bar__right {
    > i {
      margin: 0 5px;
    }
  }
}
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>