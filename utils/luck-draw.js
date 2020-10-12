class LuckDraw {
  constructor(DataArr, RotateDir, cycleNumber, minSpeed) {
    this.DataArr = JSON.parse(JSON.stringify(DataArr));

    // 最大速度
    this.maxSpeed = 4;
    // 全速
    this.cycleNumber = cycleNumber || 2;
    this.myReq;
    // 最小速度
    this.defaultSpeed = minSpeed || 15;

    for (let i = 0; i < RotateDir.length; i++) {
      let { index, next } = RotateDir[i];
      if (typeof this.DataArr[index].next !== "undefined") {
        console.error(`RotateDir is error`);
        return;
      }
      this.DataArr[index].next = this.DataArr[next]
    }
  }

  run(id, running, runend) {
    let counter = 0; // 计数器
    let current = 0; // 当前数字值
    let n = 0;
    let currentObj = this.DataArr[0];
    let tem = this.DataArr[0];
    while (true) {
      if (n > this.DataArr.length) {
        console.error(`${id}不存在`);
        return;
      }
      if (tem.id == id) {
        break;
      }
      tem = tem.next;
      n++;
    }
    let allCount = this.cycleNumber * this.DataArr.length + n;
    // 加速区间
    let addSpeed = this.defaultSpeed - this.maxSpeed;
    // 减速区间
    let reduceSpeed = allCount - (this.defaultSpeed - this.maxSpeed);
    this.running = running;
    this.runend = runend;
    const _this = this;
    this.running(currentObj);
    this.myReq = requestAnimationFrame(step);
    function step() {
      // current++;
      // 加速环节
      if (counter < addSpeed) {
        if (current < Math.pow(_this.defaultSpeed - counter, 2)) {
          current = current + _this.defaultSpeed / 2;
        } else {
          current = 0;
          // 往前移动一个；
          counter++;
          currentObj = currentObj.next;
          _this.running(currentObj);
        }
      }
      // 匀速环节
      if (counter >= addSpeed && counter < reduceSpeed) {
        if (current < _this.maxSpeed) {
          current++;
        } else {
          // 计数清零
          current = 0;
          // 往前移动一个；
          counter++;
          currentObj = currentObj.next;
          _this.running(currentObj);
        }
      }
      // 减速环节
      if (counter >= reduceSpeed && counter < allCount) {
        if (Math.sqrt(current) <= (_this.defaultSpeed - (allCount - counter))) {
          current = current + 2;
        } else {
          // 计数清零
          current = 0;
          // 往前移动一个；
          counter++;
          currentObj = currentObj.next;
          _this.running(currentObj);
        }
      }
      // 停止
      if (counter >= allCount) {
        _this.runend(currentObj);
        cancelAnimationFrame(_this.myReq);
        return;
      }
      _this.myReq = requestAnimationFrame(step);
    }
  }
}