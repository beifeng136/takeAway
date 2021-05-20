import { createStore } from "vuex";

export default createStore({
  state: {
    cartFoods: {
      "userId": 1,
      "shopId": 1,
      "foodNums": 0,
      "list": []
    }
  },
  mutations: {
    addFoods(state, food)
    {
      let flag = state.cartFoods.list.every(item => item.foodId != food.id)
      if (flag) {
        state.cartFoods.list.push({
          foodId: food.id,
          buyCount: 1,
          name: food.name,
          price: 9
        })
      } else {
        /* 加数量 */
        state.cartFoods.list.forEach(item =>
        {
          if (item.foodId == food.id) {
            item.buyCount++;
            item.price = item.buyCount * 9
          }
        })
      }
      state.cartFoods.foodNums = state.cartFoods.list.reduce((total, item) => total += item.buyCount, 0)
    },
    deleteFoods(state, id)
    {
      /* 减数量 */
      state.cartFoods.list.forEach(item =>
      {
        if (item.foodId == id) {
          (item.buyCount--) && (item.price = item.buyCount * 9)
        }
      })
      state.cartFoods.foodNums = state.cartFoods.list.reduce((total, item) => total += item.buyCount, 0)
    },
    setUser(state, id)
    {
      state.cartFoods.userId = id
    },
    setShop(state, id)
    {
      state.cartFoods.shopId = id
    },
    clearCart(state, id)
    {
      state.cartFoods = {
        "userId": 1,
        "shopId": 1,
        "foodNums": 0,
        "list": []
      }
    }
  },
  actions: {},
  modules: {},
});
