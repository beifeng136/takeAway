<template>
  <van-card
    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
    v-for="(item, index) in allOrders"
    :key="item.shopName"
    thumb-class="height:137%"
  >
    <template #title>
      <h3>{{ item.shopName }} ></h3>
    </template>
    <template #tags>
      <span>{{ item.orderTime }}</span>
    </template>
    <template #bottom>
      <span v-if="item.list[0]"
        >{{ item.list[0].foodName }}等{{ item.foodNum }}件商品</span
      >
    </template>
    <template #footer>
      <van-button plain round size="mini" @click="deleteOrder(item)"
        >删除订单</van-button
      >
      <van-button plain round size="mini" type="primary" @click="repeate(item)"
        >再来一单</van-button
      >
    </template>
  </van-card>
</template>

<script>
import axios from "@/utils/axios";
import { onMounted, reactive, toRefs } from "vue";
import { localGet } from "@/utils";
import { Toast } from "vant";
export default {
  name: "orderDetails",
  components: { Toast },
  setup() {
    const state = reactive({
      allOrders: null,
      userId: "",
    });
    /* 再来一单 */
    const repeate = async (item) => {
      const { data: res } = await axios.post("/biz/insertOrder", item);
      if (res == 1) {
        Toast.success("添加成功");
      } else {
        Toast.fail("服务器繁忙，请稍后再试！");
      }
      getAllOrders();
    };
    const getAllOrders = async () => {
      const { data: res } = await axios.get(
        `/biz/queryOrdersByUserId?userId=${state.userId}`
      );
      state.allOrders = res;
      state.allOrders.forEach((element) => {
        element.foodNum = element.list.length;
      });
    };
    const deleteOrder = async (item) => {
      const { data: res } = await axios.get(
        `/biz/deleteOrderByOid?orderId=${item.id}`
      );
      if (res > 0) {
        Toast.success("删除成功");
      } else {
        Toast.fail("服务器繁忙，请稍后再试！");
      }
      getAllOrders();
    };
    onMounted(() => {
      if (localGet("userInformation"))
        state.userId = localGet("userInformation").id;
      getAllOrders();
    });
    return {
      ...toRefs(state),
      repeate,
      deleteOrder,
    };
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  /deep/.van-nav-bar__title {
    color: white;
  }
  /deep/.van-nav-bar__arrow {
    color: white;
  }
}
.custom-class {
  padding: 5px 0;
}
.bottom-button {
  border-radius: 5px;
  padding: 10px 20px;
  background: #02a774;
}
.thumb-class {
  border-radius: 5px;
}
.van-card__thumb img {
  height: 137% !important;
}
</style>