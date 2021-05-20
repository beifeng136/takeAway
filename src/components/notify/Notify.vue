<template>
  <van-notify v-model:show="isShow" type="success" background="#02a774">
    <van-icon name="bell" style="margin-right: 4px" />
    <span>{{ content }}</span>
  </van-notify>
</template>

<script>
export default {
  name: "notify",
  props: { content: String, isShow: Boolean },
  setup(props) {},
};
</script>

<style lang="less" scoped>
</style>