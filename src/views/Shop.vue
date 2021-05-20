<template>
  <ShopHeader />
  <van-tabs>
    <van-tab title="点餐">
      <ShopGoods />
    </van-tab>
    <van-tab title="评论">
      <ShopRatings />
    </van-tab>
    <van-tab title="商家">
      <ShopInfor />
    </van-tab>
  </van-tabs>
</template>

<script>
import ShopHeader from "@/components/shop/ShopHeader";
import ShopGoods from "@/components/shop/ShopGoods";
import ShopRatings from "@/components/shop/ShopRatings";
import ShopInfor from "@/components/shop/ShopInfo";
export default {
  name: "shop",
  components: { ShopHeader, ShopGoods, ShopRatings, ShopInfor },
};
</script>

<style lang="less" scoped>
</style>