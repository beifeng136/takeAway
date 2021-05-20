<template>
  <div class="app">
    <van-nav-bar title="我的" style="background-color: #00a67c" />
    <div class="header">
      <div>
        <van-image
          round
          width="4rem"
          height="4rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div>
        <router-link to="/login" v-if="!isShowUserInfor" tag="span">
          <h3>登录/注册</h3>
        </router-link>
        <h3 v-else v-show="isShowUserInfor">{{ name }}</h3>
        <span><i class="iconfont icon-shouji"></i> 暂无绑定手机号</span>
      </div>
      <div><van-icon name="arrow" /></div>
    </div>
    <div class="information">
      <div>
        <span>
          <h3>0.00 <i>元</i></h3>
        </span>
        <span>我的余额</span>
      </div>
      <div>
        <span>
          <h3 style="color: #ed6e50">0 <i>个</i></h3>
        </span>

        <span>我的优惠</span>
      </div>
      <div>
        <span>
          <h3 style="color: #83c041">0 <i>分</i></h3>
        </span>
        <span>我的积分</span>
      </div>
    </div>
    <div class="body">
      <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">我的订单</span>
        </template>
        <template #icon>
          <span class="iconfont icon-zhangdan2" style="color: #8bc5a9"></span>
        </template>
      </van-cell>
      <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">积分商城</span>
        </template>
        <template #icon>
          <span class="iconfont icon-jifen" style="color: #ed6d4f"></span>
        </template>
      </van-cell>
      <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">小zhang的外卖会员卡</span>
        </template>
        <template #icon>
          <span class="iconfont icon-jifen1" style="color: #f6c489"></span>
        </template>
      </van-cell>
      <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">服务中心</span>
        </template>
        <template #icon>
          <span class="iconfont icon-service" style="color: #56a980"></span>
        </template>
      </van-cell>
    </div>
    <div class="wish">
      <span> ᴸᵉᵗ ᵇʸᵍᵒⁿᵉˢ ᵇᵉ ᵇʸᵍᵒⁿᵉˢ ᵃⁿᵈ ᵍᵒ ᵗᵒ ᵗʰᵉ ᶠᵘᵗᵘʳᵉ ᵗᵒᵍᵉᵗʰᵉʳ. </span>
      <span> 往事不再过问，未来共赴前程 </span>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue";
import { localGet } from "@/utils";
export default {
  name: "mine",
  setup() {
    let state = reactive({
      name: "",
      isShowUserInfor: false,
    });
    onMounted(() => {
      if (localGet("userInformation")) {
        state.name = localGet("userInformation").name;
        state.isShowUserInfor = true;
      }
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less" scoped>
@fontColorOne: #fff;
@fontColorStar: #f19d39;
@borderColor: rgba(119, 103, 137, 0.1);
@fontColorTwo: #7c8285;
@fontSize: 12px;
a {
  color: #fff;
}
i {
  font-style: normal;
}
.van-nav-bar {
  /deep/.van-nav-bar__title {
    color: white;
  }
  /deep/.van-nav-bar__arrow {
    color: white;
  }
}
.van-image {
  /deep/img {
    border-radius: 50%;
  }
}

.header {
  // box-sizing: border-box;
  display: flex;
  height: 100px;
  background-color: #00a67c;
  color: @fontColorOne;

  > div {
    display: flex;
  }
  h3 {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 18px;
  }
  > div:nth-child(1) {
    padding: 0 5px;
    flex: 0.2;
    align-items: center;
    justify-content: flex-end;
    // background-color: darkblue;
  }
  > div:nth-child(2) {
    > * {
      margin: 3px 0;
    }
    span {
      font-size: @fontSize+1;
    }
    padding: 0 5px;
    flex: 1;
    flex-direction: column;
    justify-content: center;
  }
  > div:nth-child(3) {
    flex: 0.2;
    align-items: center;
    justify-content: center;
  }
}
.information {
  display: flex;
  height: 80px;
  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      color: @fontColorStar;
      margin: 0;
      font-size: 25px;
    }
    i {
      font-size: 14px;
      color: black;
    }
    > span:nth-child(2) {
      font-size: @fontSize;
      color: @fontColorTwo;
    }
  }
  > div:nth-child(n-2) {
    border-right: 1px solid @borderColor;
    border-bottom: 1px solid @borderColor;
  }
}
.body {
  margin-top: 10px;
  border-top: 1px solid @borderColor;
  border-bottom: 1px solid @borderColor;
  .van-cell__title {
    margin-left: 5px;
    font-weight: 550;
  }
}
.wish {
  height: 100px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > span {
    font-size: @fontSize;
  }
  > span:nth-child(1) {
    font-weight: 700;
    font-size: @fontSize+6;
  }
  > span:nth-child(2) {
    color: @fontColorTwo;
  }
}
</style>
