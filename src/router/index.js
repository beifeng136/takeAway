import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: "login",
      meta: {
        showFooter: false // 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
      },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/home',
      name: "home",
      meta: {
        showFooter: true
      },
      component: () => import('../views/Home.vue')
    },
    {
      path: '/search',
      name: "search",
      meta: {
        showFooter: true
      },
      component: () => import('../views/Search.vue')
    },
    {
      path: '/order',
      name: "order",
      meta: {
        showFooter: true
      },
      component: () => import('../views/Order.vue')
    },
    {
      path: '/mine',
      name: "mine",
      meta: {
        showFooter: true
      },
      component: () => import('../views/Mine.vue')
    },
    {
      path: '/shop',
      name: "shop",
      meta: {
        showFooter: false
      },
      component: () => import('../views/Shop.vue')
    },
  ]
})
/* 在这里进行 异步导入vue组件 只用在使用的时候才会加载相应的组件 这样就可以提升页面的运行速度 提升用户体验 */
export default router