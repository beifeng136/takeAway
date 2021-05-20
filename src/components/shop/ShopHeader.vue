<template>
  <div class="shop-deader">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="router.go(-1)"
    />
    <div class="shop-content" @click="toggleShopShow">
      <img
        style="position: absolute; z-index: 1"
        class="content-image"
        :src="`http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/${shopInfor.photo}`"
      />
      <div class="header-content">
        <h2 class="content-title">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
          <span class="content-name">{{ shopInfor.name }}</span>
          <van-icon name="play" class="content-icon" />
        </h2>
        <div class="shop-message">
          <span class="shop-message-detail">4.2</span>
          <span class="shop-message-detail">月售{{ shopInfor.sales }}单</span>
          <span class="shop-message-detail">
            联想教育
            <span>约{{ shopInfor.transportationPrice }}分钟</span>
          </span>
          <span class="shop-message-detail">距离1000米</span>
        </div>
        <!-- 优惠 -->
        <div class="shop-header-discounts" @click="toggleSupportShow">
          <div class="discounts-left">
            <div class="activity">
              <span class="content-tag">
                <span class="mini-tag">首单</span>
              </span>
              <span
                class="activity-content ellipsis"
                style="overflow: hidden; height: 16px"
                >新用户下单立减17元(不同其他活动.......</span
              >
            </div>
          </div>
          <div class="discounts-right">8个优惠</div>
        </div>
      </div>
    </div>
    <!-- 弹框遍历显示优惠活动 -->
    <van-action-sheet v-model="supportShow" cancel-text="取消" closeable>
      <template class="content">
        <van-list finished-text="没有更多了">
          <h2>优惠活动</h2>
          <van-cell v-for="item in shopDiscount" :key="item.contents">
            <template #default class="list">
              <van-tag type="danger">{{ item.tag }}</van-tag
              >&nbsp;
              <span>{{ item.contents }}</span>
            </template>
          </van-cell>
        </van-list>
      </template>
    </van-action-sheet>
  </div>
</template>
<script>
import axios from "@/utils/axios.js";
import { onMounted, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "shopHeader",
  setup() {
    const route = useRoute();
    const router = useRouter();
    let state = reactive({
      shopShow: false,
      supportShow: false,
      shopDiscount: {},
      shopInfor: {},
    });
    const onClickLeft = () => {
      console.log("dasdad");
    };
    const toggleShopShow = () => {
      console.log("dasdasd");
      state.shopShow = !state.shopShow;
    };
    const toggleSupportShow = () => {
      state.supportShow = !state.supportShow;
    };
    const getDiscount = async () => {
      const { data: res } = await axios.get(
        `/biz//querySpecialOfferByShopId?shopId=${state.shopId}`
      );
      state.shopDiscount = res;
    };
    const getShopInfor = async () => {
      const { data: res } = await axios.get(
        `/biz//queryInfoByShopId?shopId=${state.shopId}`
      );
      state.shopInfor = res;
    };
    onMounted(() => {
      state.shopId = route.query.id;
      getDiscount();
      getShopInfor();
    });
    return {
      ...toRefs(state),
      toggleShopShow,
      toggleSupportShow,
      getDiscount,
      getShopInfor,
      onClickLeft,
      router,
    };
  },
};
</script>
<style lang="less" scoped>
.van-list h2 {
  text-align: center;
}
.van-cell__value--alone {
  text-align: center;
}
.van-nav-bar {
  background-color: @themeColor;
  /deep/.van-nav-bar__arrow {
    color: #fff;
  }
  /deep/.van-nav-bar__text {
    color: #fff;
  }
}
.shop-content {
  padding: 30px 20px 5px 20px;
  position: relative;
  display: flex;
  background: #fff;
  text-align: center;
}
.shop-content img {
  box-shadow: 0 0 0.4vw 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 50%;
  width: 66px;
  height: 66px;
  border-radius: 2px;
  margin-left: -33px;
  margin-top: -40px;
}
.header-content {
  flex: 1;
  width: 72%;
}
.header-content .content-title {
  margin: 0;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  white-space: nowrap;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}
.header-content .content-tag {
  border-radius: 2px;
  background-image: linear-gradient(90deg, #fff100, #ffe339);
  width: 36px;
  height: 18px;
  margin-right: 10px;
  color: #6a3709;
  font-style: normal;
  font-weight: 700;
  position: relative;
}
.content-tag .mini-tag {
  position: absolute;
  left: 0;
  top: 0;
  right: -100%;
  bottom: -100%;
  font-size: 24px;
  font-weight: 600;
  transform: scale(0.5);
  transform-origin: 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-name {
  font-weight: 700;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content-icon {
  width: 20px;
  position: relative;
  height: 16px;
}
.shop-message {
  white-space: nowrap;
  height: 12px;
  margin-top: 8px;
  font-size: 11px;
  color: #333;
}
.shop-message-detail:not(:last-child)::after {
  content: " \B7 ";
  opacity: 0.2;
}
.shop-header-discounts {
  display: flex;
  background: #fff;
  border-radius: 1px;
  border: 1px solid #eee;
  padding: 5px 7px;
  font-size: 11px;
  color: #666;
  margin: 0 30px;
  align-items: center;
}
.shop-header-discounts .discounts-left {
  flex: 1;
  overflow: hidden;
}
.discounts-left .activity {
  display: flex;
  align-items: center;
}
.discounts-left .activity .content-tag {
  border-radius: 1px;
  width: 25px;
  height: 13px;
  margin-right: 5px;
  color: #fff;
  font-style: normal;
  font-weight: 700;
  position: relative;
  background-color: rgb(112, 188, 70);
}
.discounts-left .activity .content-tag .mini-tag {
  position: absolute;
  left: 0;
  top: 0;
  right: -100%;
  bottom: -100%;
  font-size: 18px;
  font-weight: 600;
  transform: scale(0.5);
  transform-origin: 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.discounts-right {
  width: 50px;
  flex-shrink: 0;
  position: relative;
  padding-right: 10px;
  text-align: right;
}
.discounts-right::after {
  content: "";
  display: block;
  border-style: solid;
  border-width: 4px 4px 0;
  border-color: rgba(0, 0, 0, 0.57) transparent transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
.shop-brief-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 52;
  flex-direction: column;
  color: #333;
}
.shop-brief-modal.fade-enter-active,
.shop-brief-modal.fade-leave-active {
  transition: opacity 0.5s;
}

.shop-brief-modal.fade-enter,
.shop-brief-modal.fade-leave-to {
  opacity: 0;
}
.brief-modal-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.brief-modal-content {
  position: relative;
  width: 80%;
  padding: 25px 20px;
  border-radius: 5px;
  background: #fff;
  z-index: 99;
  display: flex;
  flex-direction: column;
}
.brief-modal-content .content-title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  white-space: nowrap;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.brief-modal-content .content-title > span {
  font-weight: 600;
}
.brief-modal-content .content-title .content-tag {
  border-radius: 2px;
  background-image: linear-gradient(90deg, #fff100, #ffe339);
  width: 36px;
  height: 18px;
  margin-right: 10px;
  color: #6a3709;
  font-style: normal;
  font-weight: 700;
  position: relative;
}
.brief-modal-content .content-title .mini-tag {
  position: absolute;
  left: 0;
  top: 0;
  right: -100%;
  bottom: -100%;
  font-size: 24px;
  transform: scale(0.5);
  transform-origin: 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.brief-modal-msg {
  display: flex;
  margin: 20px -10px 0;
}
.brief-modal-msg > li {
  flex: 1;
  text-align: center;
}
.brief-modal-msg > li > h3 {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}
.brief-modal-msg > li > p {
  font-size: 12px;
  color: #999;
}
.brief-modal-title {
  position: relative;
  text-align: center;
  margin: 15px auto 15px;
  width: 85px;
  background-image: linear-gradient(90deg, #fff, #333 50%, #fff);
  background-size: 100% 1px;
  background-position: 50%;
  background-repeat: no-repeat;
}
.brief-modal-title > span {
  font-size: 12px;
  padding: 0 6px;
  color: #999;
  background-color: #fff;
}
.brief-modal-notice {
  font-size: 13px;
  line-height: 1.54;
  color: #333;
  overflow-y: auto;
}
.mask-footer {
  position: absolute;
  bottom: -60px;
  left: 50%;
  padding: 6px;
  /* border: 1px solid rgba(255, 255, 255, 0.7); */
  border-radius: 50%;
  transform: translateX(-50%);
}
.mask-footer i {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.activity-sheet {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.activity-sheet .activity-sheet-content {
  position: absolute;
  background-color: #f5f5f5;
  box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.4);
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 20px 30px;
  box-sizing: border-box;
  transition: transform 0.2s;
  will-change: transform;
  color: #333;
}
.activity-sheet-content .activity-sheet-title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
.activity-sheet-content .list {
  font-size: 16px;
  height: 160px;
  overflow-y: auto;
}
.activity-sheet-content .list .activity-item {
  margin-bottom: 12px;
  display: flex;
  font-size: 13px;
  align-items: center;
}
.content {
}
</style>
