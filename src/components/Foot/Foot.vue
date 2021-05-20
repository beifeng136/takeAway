<template>
  <van-tabbar v-model="active" route placeholder>
    <van-tabbar-item replace icon="home-o" to="/home">外卖</van-tabbar-item>
    <van-tabbar-item replace icon="search" to="/search">搜索</van-tabbar-item>
    <van-tabbar-item replace icon="friends-o" to="/order">订单</van-tabbar-item>
    <van-tabbar-item replace icon="setting-o" to="/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref } from "vue";
export default {
  name: "foot",
  setup() {
    const active = ref(0);
    return { active };
  },
};
</script>

<style lang="less" scoped>
.van-tabbar__placeholder {
  height: 50px;
}
</style>