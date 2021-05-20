<template>
  <van-nav-bar>
    <template #title>
      <span style="color: #fff">搜索</span>
    </template>
  </van-nav-bar>
  <van-search v-model="inputValue" show-action placeholder="请输入搜索关键词">
    <template #action>
      <van-button type="success" size="small" @click="searchShop"
        >搜索</van-button
      >
    </template>
  </van-search>
  <router-link
    :to="{ path: '/shop', query: { id: shop.id } }"
    v-for="shop in shopList"
    :key="shop.name"
  >
    <van-card
      num="2"
      :thumb="`http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/${shop.photo}`"
    >
      <template #title>
        <div class="header">
          <van-tag type="danger" size="medium">品牌</van-tag>
          <h2>{{ shop.name }}</h2>
          <div>
            <van-tag type="danger">保</van-tag>
            <van-tag type="danger">准</van-tag>
            <van-tag type="danger">票</van-tag>
          </div>
        </div>
      </template>
      <template #desc>
        <div class="desc">
          <van-rate readonly v-model="shop.score" size="14" allow-half />
          <i>{{ shop.score }}</i>
          <span>月销量{{ shop.sales }}单</span>
          <van-tag plain type="primary">联想教育</van-tag>
        </div>
      </template>
      <template #price>
        <div>
          <span>¥{{ shop.minPrice }}起送&nbsp;/&nbsp;配送费约 ¥5</span>
        </div>
      </template>
    </van-card>
  </router-link>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import axios from "@/utils/axios";
import { Toast } from "vant";
export default {
  name: "search",
  components: { Toast },
  setup() {
    const state = reactive({
      inputValue: "",
      shopList: [],
    });
    const searchShop = async () => {
      const { data: res } = await axios.get(
        `/biz/queryAllShopsInfoByName?name=${state.inputValue}`
      );
      state.shopList = res;
    };
    const getAllShopsInfo = async () => {
      let { data: res } = await axios.get("/biz/queryAllShopsInfo");
      state.shopList = res;
    };
    onMounted(() => {
      getAllShopsInfo();
    });
    return {
      ...toRefs(state),
      searchShop,
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

.van-card {
  background-color: #fff;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 13px;
  border-bottom: 1px solid #e6e6e6;
}

.header {
  .van-tag--danger {
    background-color: #f8d959;
    color: black;
    font-weight: 700;
  }
  h2 {
    margin: 5px;
    display: inline-block;
  }
  div {
    display: inline-block;
    float: right;
    .van-tag {
      margin: 0 3px;
    }
  }
}
.desc {
  span {
    color: #f2a243;
  }
  i {
    font-style: normal;
    margin: 0 2px;
  }
  .van-tag {
    float: right;
  }
}
</style>