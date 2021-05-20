<template>
  <van-tabbar placeholder z-index="100">
    <div class="cart">
      <div @click="showPicker = true">
        <span>
          <van-tag round type="primary">{{ sendCartList.foodNums }}</van-tag>
          <span>
            <van-icon name="cart" />
          </span>
        </span>
      </div>
      <div>
        <span>￥{{ sendCartList.foodNums * 9 }}</span>
        <span>配送费0元</span>
      </div>
      <div @click="insertOrder">结算</div>
    </div>
  </van-tabbar>
  <van-popup
    v-model:show="showPicker"
    z-index="0"
    position="bottom"
    :style="{ height: '40%' }"
  >
    <div class="header">
      <span>购物车</span>
      <span @click="clearCart">清空</span>
    </div>
    <div class="cartbody">
      <van-list>
        <van-cell v-for="item in sendCartList.list" :key="item.name">
          <template #default class="content">
            <span>{{ item.name }}</span>
            <span>
              <span>￥{{ item.price }}</span>
              <van-stepper
                @plus="addNum(item)"
                @minus="reduceNum(item)"
                v-model="item.buyCount"
                theme="round"
                button-size="18"
                disable-input
              />
            </span>
          </template>
        </van-cell>
      </van-list>
    </div>
  </van-popup>
</template>
<script>
import { localGet, localSet, localRemove } from "@/utils";
import { onMounted, reactive, toRefs, unref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "shopCart",
  components: { Toast },
  setup() {
    let route = useRoute();
    let store = useStore();
    let state = reactive({
      showPicker: false,
      sendCartList: {},
      userInformation: {},
      shopId: 0,
    });
    const addNum = (item) => {
      item.id = item.foodId;
      store.commit("addFoods", item);
    };
    const reduceNum = (item) => {
      item.id = item.foodId;
      store.commit("deleteFoods", item.id);
    };
    const insertOrder = async () => {
      store.commit("setUser", state.userInformation.id);
      store.commit("setShop", route.query.id);
      /* 数据处理 */
      let sendData = {
        userId: state.sendCartList.userId,
        shopId: state.sendCartList.shopId,
        list: [],
      };
      sendData.list = state.sendCartList.list.map((element) => {
        let data = {
          foodId: element.foodId,
          buyCount: element.buyCount,
        };
        return data;
      });
      const { data: res } = await axios.post("/biz/insertOrder", sendData);
      console.log(res);
      if (res == 0) {
        Toast.fail("添加失败");
      } else {
        Toast.success("添加成功");
      }
      store.commit("clearCart", null);
    };
    onMounted(() => {
      state.sendCartList = store.state.cartFoods;
      state.userInformation = localGet("userInformation");
      state.shopId = route.query.id;
    });
    /* 监听cartFoods的变化 */
    watch(
      () => store.state.cartFoods.foodNums,
      (val, old) => {
        state.sendCartList = store.state.cartFoods;
      }
    );
    return {
      ...toRefs(state),
      addNum,
      reduceNum,
      insertOrder,
    };
  },
};
</script>
<style lang="less" scoped>
@fontColorOne: #fff;
@fontColorStar: #f19d39;
@borderColor: rgba(119, 103, 137, 0.1);
@fontColorTwo: #7c8285;
@fontSize: 12px;
.cart {
  // z-index: 0;
  display: flex;
  height: 100%;
  width: 100%;
  // background-color: #161d26;
  > div {
    display: flex;
    height: 100%;
    flex: 1;
    background-color: #161d26;
    color: #fff;
  }
  > div:nth-child(1) {
    position: relative;
    display: flex;
    height: 100%;
    flex: 0.6;
    display: flex;
    justify-content: flex-end;
    background-color: #161d26;
    > span {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      // justify-content: flex-end;
      align-items: center;
      z-index: 2;
      width: 60px;
      height: 126%;
      // margin-bottom: 20px;
      padding-top: 5px;
      position: absolute;
      top: -26%;
      border-radius: 50% 50% 0 0;
      background-color: #161d26;
      > .van-tag {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0 8px;
      }
      > span:nth-child(2) {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #4aa478;
        height: 80%;
        width: 80%;
        > i {
          color: #fff;
          font-size: 30px;
        }
      }
    }
  }
  > div:nth-child(2) {
    flex-direction: column;
    justify-content: center;
    > span:nth-child(2) {
      font-size: 10px;
    }
    > span:nth-child(1) {
      font-size: @fontSize+8;
    }
  }
  > div:nth-child(3) {
    flex: 0.8;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #51b14d;
  }
}
.van-popup {
  font-family: "HelveticaNeue" !important;
  margin-bottom: 50px;
  .header {
    display: flex;
    box-sizing: border-box;
    padding: 0 10px;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    background-color: #f4f5f7;
  }
  .cartbody {
    /deep/.van-cell__value {
      display: flex;
      justify-content: space-between;
      > span:nth-child(2) {
        display: flex;
        > span:nth-child(1) {
          margin-right: 8px;
        }
        /deep/.van-stepper__minus {
          border: 2px solid #4aa478;
          color: #4aa478;
          // border: 1px solid #8ac3a8;
        }
        /deep/.van-stepper__plus {
          background-color: #4aa478;
          // border: 1px solid #8ac3a8;
        }
      }
    }
  }
}
</style>
