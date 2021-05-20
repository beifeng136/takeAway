<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="account"
      label="用户名"
      placeholder="手机/邮箱/用户名"
      autocomplete="off"
      autofocus
      border
    />
    <van-cell-group>
      <van-field
        v-show="!isShowPassword"
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        autocomplete="off"
        border
      />
      <van-field
        v-show="isShowPassword"
        v-model="password"
        name="password"
        label="密码"
        placeholder="密码"
        autocomplete="off"
        border
      />
      <!-- 使用 swith 开关控制 表单的是否显示 密码 -->
      <van-switch v-model="isShowPassword" size="24px" active-color="#4CD96F" />
    </van-cell-group>

    <van-field
      v-model="phone"
      name="name"
      label="姓名"
      placeholder="请输入您的姓名"
      autocomplete="off"
      border
    />
    <div style="margin: 16px">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        color="#4CD96F"
      >
        注册
      </van-button>
    </div>
  </van-form>
  <Notify :isShow="isShowNotify" :content="notifyContent" />
</template>

<script>
import { reactive, toRefs } from "vue";
import Notify from "@/components/notify/Notify.vue";
import axios from "@/utils/axios";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "reggisterForm",
  components: {
    Notify,
  },
  setup() {
    /* 使用 vue-router 引入userRouter 和 useRouter 相当于vue2 当中的 router 进行路由跳转 route路由的解析  */
    const router = useRouter();
    const route = useRoute();
    let state = reactive({
      username: "",
      password: "",
      phone: "",
      isShowPassword: false,
      isShowNotify: false,
      notifyContent: "",
    });

    const onSubmit = (value) => {
      let isEmpty = false;
      for (const key in value) {
        if (value[key] == "") isEmpty = true;
      }
      if (isEmpty) {
        state.notifyContent = "请填写完整注册信息";
        return notifySwitch();
      }
      sendData(value);
    };
    const sendData = async (value) => {
      const { data: res } = await axios.post("/user/register", value);
      if (res === "register fail") {
        state.notifyContent = "注册信息有误";
        notifySwitch();
      } else if (res === "register success") {
        state.notifyContent = "注册成功";
        notifySwitch(2000, () => {
          router.push("/login");
        });
      } else {
        state.notifyContent = "该用户已被注册";
        notifySwitch();
      }
    };
    const notifySwitch = (time = 2000, callBack) => {
      state.isShowNotify = true;
      setTimeout(() => {
        state.isShowNotify = false;
        state.notifyContent = "";
        if (callBack) callBack();
      }, time);
    };
    return {
      ...toRefs(state),
      onSubmit,
      sendData,
    };
  },
};
</script>

<style lang="less" scoped>
.van-form {
  margin: 0 auto;
  width: 80%;
}
.van-cell-group {
  display: flex;
  align-items: center;
}
</style>