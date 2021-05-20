import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
import "@/assets/font/iconfont.js" // 使用带颜色的图标
import "@/assets/font/iconfont.css" // 使用 font-class 方式
import "@/assets/css/Common.css"// 引入全局的样式
import 'default-passive-events' // https://blog.csdn.net/qq_39025670/article/details/103146707 页面优化 具体没看懂
let app = createApp(App)
app.use(store)
app.use(router)
app.use(Vant)
app.mount("#app")
