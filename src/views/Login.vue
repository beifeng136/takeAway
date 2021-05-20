<template>
  <!-- vue3 组件的元素不必一定要包到一个根组件当中 -->
  <van-nav-bar left-text="返回" left-arrow @click-left="router.push('/home')" />
  <h2>硅谷外卖</h2>
  <van-tabs v-model:active="currentTab" color="#02a774">
    <van-tab title="登录">
      <LoginForm />
    </van-tab>
    <van-tab title="注册">
      <RegisterForm />
    </van-tab>
  </van-tabs>
</template>
<script>
import LoginForm from "../components/login/loginForm.vue";
import RegisterForm from "../components/login/RegisterForm.vue";
import { useRoute, useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
export default {
  name: "hello world",
  setup() {
    let route = useRoute();
    let router = useRouter();
    let state = reactive({
      currentTab: 2,
    });
    const onClickLeft = () => {
      console.log("点击了箭头");
    };
    return {
      ...toRefs(state),
      onClickLeft,
      router,
    };
  },
  components: {
    LoginForm,
    RegisterForm,
  },
};
</script>
<style lang="less" scoped>
.van-nav-bar {
  /deep/.van-icon,
  /deep/.van-nav-bar__text {
    color: #02a774;
  }
}
h2 {
  margin-top: 50px;
  font-size: 40px;
  color: #02a774;
  text-align: center;
}
.van-tabs {
  /deep/.van-tabs__nav {
    justify-content: center;
    .van-tab {
      flex: 0.3;
      & {
        justify-content: center;
      }
    }
  }
  /deep/.van-tabs__wrap {
    margin-bottom: 10px;
  }
}
</style>