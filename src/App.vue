<template>
  <!-- 使用router-view 进行路由视图的渲染 -->
  <router-view />
  <Foot v-show="routeMetaShowFoot" />
</template>

<script>
import Foot from "@/components/Foot/Foot.vue";
import { reactive, ref, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "app",
  components: { Foot },
  setup() {
    let route = useRoute();
    let router = useRouter();
    let state = reactive({
      routeMetaShowFoot: false,
    });
    /* 使用 watch 监听路由的变化 从而获取meta参数 */
    watch(
      () => route.path,
      () => {
        state.routeMetaShowFoot = route.meta.showFooter; // 将meta信息赋值到数据上
      }
    );
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style>
#app {
  font-family: "Microsoft YaHei", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.body {
  background-color: #eee;
  font-size: 14px;
  font-family: ”Microsoft YaHei”, "simsun", Arial, Helvetica, sans-serif, ”宋体”;
}
</style>
