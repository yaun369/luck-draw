<template>
  <view class="container">
    <view class="list">
      <view
        v-for="(item, index) in prizeList"
        :key="index"
        class="item"
        :class="{'selected':item.id===rewardId}"
      >
        {{ item.id }}
      </view>
    </view>
    <view
      class="button"
      :class="{'loading':loading}"
      @tap="handleClickDraw"
    >
      {{ loading ? '抽奖中...' : '开始抽奖' }}
    </view>
  </view>
</template>

<script>
import "./index.scss";
import LuckDraw from "../../../utils/luck-draw.js";
export default {
  data() {
    return {
      prizeList: [
        // 奖品信息列表
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
      ],
      rotateDir: [
        // 旋转规则数组
        { index: 0, next: 1 },
        { index: 1, next: 2 },
        { index: 2, next: 3 },
        { index: 3, next: 4 },
        { index: 4, next: 5 },
        { index: 5, next: 6 },
        { index: 6, next: 7 },
        { index: 7, next: 8 },
        { index: 8, next: 0 },
      ],
      rewardId: 0, // 当前 active 状态的 id
      id: 0, // 中奖id
      loading: false
    };
  },
  methods: {
    handleClickDraw() {
      if(this.loading) return;
      this.loading = true;
      // 初始化抽奖, 3代表圈数， 8代表速度，也代表时间片的个数
      const luckDrawFn = new LuckDraw(this.prizeList, this.rotateDir, 3, 7);
      this.id = 7;
      luckDrawFn.run(
        this.id, //中奖id
        (params) => {
          // 停留在当前格子的回调函数
          // 拿到当前 active 状态的 id
          this.rewardId = params.id;
        },
        (params) => {
          // 最终停止的回调函数
          //最后转盘停止的地方，可以弹出奖励弹框或其他操作
          this.rewardId = params.id;
          this.loading = false;
          console.log(`抽中 ${params.id} `);
        }
      );
    },
  },
};
</script>
