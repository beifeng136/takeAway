<template>
  <van-tree-select
    v-model:main-active-index="FoodActiveIndex"
    height="55vw"
    :items="FoodCategoryText"
    @click-nav="onFoodCategoryClick"
  >
    <template #content>
      <span class="currentCategory">{{ FoodActiveName }}</span>
      <van-card
        v-for="food in currentFoods"
        :key="food.name"
        :thumb="
          'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/' + food.photo
        "
      >
        <template #title>
          <span style="font-weight: 700; font-size: 14px">{{ food.name }}</span>
        </template>
        <template #desc>
          <div>{{ food.info }}</div>
        </template>
        <template #tags>
          <div>月销售量86份 好评率100%</div>
        </template>
        <template #price>
          <div class="price">
            <span>￥</span>
            <span>9.00</span>
          </div>
        </template>
        <template #num>
          <van-icon
            name="add"
            color="#02A774"
            size="20px"
            @click="addFoods(food)"
          />
        </template>
      </van-card>
    </template>
  </van-tree-select>
  <ShopCart />
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import ShopCart from "./ShopCart";
import { useStore } from "vuex";
export default {
  name: "ShopGoods",
  components: { ShopCart },
  setup() {
    let store = useStore();
    let route = useRoute();
    let router = useRouter();
    let state = reactive({
      FoodCategory: [], // 全部的食物类型数据
      FoodCategoryText: [], // 全部的食物类型name
      FoodActiveIndex: 0, // 当前的食物分类
      FoodActiveName: "", // 当前的食物分类名字
      currentFoods: [], // 当前显示的食物数据
      shopId: 0,
    });
    /* 向购物车添加数据 */
    const addFoods = (food) => {
      store.commit("addFoods", food);
    };
    /* 分类被点击 */
    const onFoodCategoryClick = () => {
      state.FoodActiveName = state.FoodCategory[state.FoodActiveIndex].name;
      // console.log(state.FoodActiveIndex);
      getGoodsByCategoryId(); //获取第一个分类
    };
    /* 获取食物分类 */
    const getFoodCategory = async () => {
      const { data: res } = await axios.get(
        `/biz/queryFoodCategory?id=${state.shopId}`
      );
      state.FoodCategory = res;
      state.FoodCategoryText = res.map((item) => {
        return { text: item.name };
      });
      state.FoodActiveName = state.FoodCategory[state.FoodActiveIndex].name;
    };
    // 获取对应分类的数据
    const getGoodsByCategoryId = async () => {
      const { data: res } = await axios.get(
        `biz/queryFoodinfoByShopIdAndFoodCategoryId?shopId=${state.shopId}&foodcategoryId=${state.FoodActiveIndex}`
      );
      // console.log(res);
      state.currentFoods = res;
    };
    onMounted(() => {
      state.shopId = route.query.id;
      getFoodCategory(); //获取食物的分类
      getGoodsByCategoryId(); // 获取第一个分类
    });
    return {
      ...toRefs(state),
      onFoodCategoryClick,
      addFoods,
      // FoodActiveName,
    };
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.van-tree-select {
  height: 70vh !important;
  /deep/.van-tree-select__nav {
    flex: 0.6;
  }
  .currentCategory {
    display: flex;
    height: 40px;
    width: 100%;
    background-color: #eef0f5;
    align-items: center;
    padding-left: 15px;
  }
  /deep/.van-card__thumb {
    width: 70px;
    height: 70px;
  }
  /deep/.van-image {
    width: 100% !important;
    height: 100% !important;
  }
  /deep/.van-card__content {
    > div:nth-child(1) {
      > div {
        margin: 2px 0;
      }
    }
  }
}
.price {
  > span {
    color: @fontColorStar;
  }
  > span:nth-child(1) {
    font-size: 16px;
  }
  > span:nth-child(2) {
    font-weight: 700;
    font-size: 13px;
  }
}
</style>