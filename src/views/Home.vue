<template>
  <van-nav-bar title="标题" left-arrow>
    <template #left>
      <router-link to="/search">
        <span class="iconfont icon-sousuo3 fontsize"></span>
      </router-link>
    </template>
    <template #title>
      <span style="color: #fff">正在定位</span>
    </template>
    <template #right class="navRight">
      <router-link to="/login">
        <span style="color: #fff">登录</span>
      </router-link>
      <i>|</i>
      <router-link to="/login">
        <span style="color: #fff">注册</span>
      </router-link>
    </template>
  </van-nav-bar>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="index in 2" :key="index">
      <van-grid :column-num="4">
        <van-grid-item
          v-for="Category in bigCategoryList"
          :key="Category.name"
          :icon="
            'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/' +
            Category.photo
          "
          :text="Category.name"
        />
      </van-grid>
    </van-swipe-item>
  </van-swipe>
  <van-divider :style="{ color: 'black' }"> 店铺 </van-divider>
  <van-cell title="附近商家" icon="wap-nav" />
  <AllGoods />
</template>

<script>
import axios from "@/utils/axios";
import { reactive, onMounted, toRefs } from "vue";
import AllGoods from "@/components/home/Allgoods.vue";
export default {
  name: "home",
  components: {
    AllGoods,
  },
  setup() {
    let state = reactive({
      bigCategoryList: null,
    });
    const getBigCategory = async () => {
      const { data: res } = await axios.get("/biz/queryBigCategory");
      state.bigCategoryList = res;
    };
    onMounted(() => {
      getBigCategory();
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
.van-divider {
  margin: 10px;
}
.van-cell::after {
  border: none;
}
</style>