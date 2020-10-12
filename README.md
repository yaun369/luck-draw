# taro 实现九宫格抽奖 demo

本项目支持动态调整奖品个数，抽奖的旋转方向以及速度。

## 如何改变抽奖旋转方向

改变抽奖旋转方向的核心就是，把奖品数据修改成链表的形式。服务端返回的奖品信息列表的一般形式。

```
// 服务端返回的奖品信息列表
const prizeList = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];
```

把数据变成链表的形式；其中 next 对应的就是下一个指向的值。

```
const rewaridList = [
  {id:1,next:prizeList[2]},
  {id:2,next:prizeList[3]},
  {id:3,next:prizeList[5]},
  {id:4,next:prizeList[1]},
  {id:5,next:prizeList[8]},
  {id:6,next:prizeList[4]},
  {id:7,next:prizeList[6]},
  {id:8,next:prizeListp[7]}
]；
```

## 使用方式

每次只需要更改 `prizeList` 和 `rotateDir`。业务相关的操作逻辑可以写在两个回调函数中。

```
// 服务端返回的奖品信息列表
const prizeList = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

// 旋转规则数组
const rotateDir = [
  { index: 0, next: 1 },
  { index: 1, next: 2 },
  { index: 2, next: 3 },
  { index: 3, next: 4 },
  { index: 4, next: 5 },
  { index: 5, next: 6 },
  { index: 6, next: 7 },
  { index: 7, next: 0 },
]

// 初始化抽奖, 3代表圈数， 8代表速度，也代表时间片的个数
const luckDrawFn = LuckDraw(prizeList, rotateDir, 3, 8);

// 中奖id，请求服务端接口拿到
const id = 7;

luckDrawFn.run(
  id, //中奖id
  params => { // 停留在当前格子的回调函数
    // 拿到当前 active 状态的 id
    this.rewardId = params.id;
  },
  params => { // 最终停止的回调函数
    //最后转盘停止的地方，可以弹出奖励弹框或其他操作
    this.rewardId = params.id;
})
```
