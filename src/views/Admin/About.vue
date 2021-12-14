<template>
  <div>
      <Editor></Editor>
  </div>
</template>
<script>
import Editor from '../../components/Editor.vue'
export default {
  data() {
    return {
      
    };
  },
  components:{Editor},
  methods: {
    next() { // 往下切换
      let len = 4; // 页面的个数
      if (this.fullpage.current + 1 <= len) { // 如果当前页面编号+1 小于总个数，则可以执行向下滑动
        this.fullpage.current += 1; // 页面+1
        this.move(this.fullpage.current); // 执行切换
      }
    },
    pre() {// 往上切换
      if (this.fullpage.current - 1 > 0) {  // 如果当前页面编号-1 大于0，则可以执行向下滑动
        this.fullpage.current -= 1;// 页面+1
        this.move(this.fullpage.current);// 执行切换
      }
    },
    move(index) {
      this.fullpage.isScrolling = true; // 为了防止滚动多页，需要通过一个变量来控制是否滚动
      this.directToMove(index); //执行滚动
      setTimeout(() => {       //这里的动画是1s执行完，使用setTimeout延迟1s后解锁
        this.fullpage.isScrolling = false;
      }, 1010);
    },
    directToMove(index) {
      let height = this.$refs["fullPage"].clientHeight;  //获取屏幕的宽度
      let scrollPage = this.$refs["fullPageContainer"];    // 获取执行tarnsform的元素
      let scrollHeight; // 计算滚动的告诉，是往上滚还往下滚
      scrollHeight= -(index - 1) * height + "px";
      scrollPage.style.transform = `translateY(${scrollHeight})`;
      this.fullpage.current = index;
    },
    mouseWheelHandle(event) { // 监听鼠标监听
      // 添加冒泡阻止
      let evt = event || window.event;
      if (evt.stopPropagation) {
        evt.stopPropagation();
      } else {
        evt.returnValue = false;
      }
      if (this.fullpage.isScrolling) { // 判断是否可以滚动
        return false;
      }
      let e = event.originalEvent || event;
      this.fullpage.deltaY = e.deltaY || e.detail; // Firefox使用detail
      if (this.fullpage.deltaY > 0) {
        this.next();
      } else if (this.fullpage.deltaY < 0) {
        this.pre();
      }
    }
  }
};
</script>
<style scoped>
.fullPage{
  height: 1000px;
  overflow: hidden;
  background-color: rgb(189, 211, 186);
}
.fullPageContainer{
  width: 100%;
  height: 1000px;
  transition: all linear 0.5s;
}
.section {
  width: 100%;
  height: 1000px;
  background-position: center center;
  background-repeat: no-repeat;
}
.section1 {
  background-color: rgb(189, 211, 186);
  background: url("../../assets/images/bg.png");
}
.section1 .secction1-content {
  color: #fff;
  text-align: center;
  position: absolute;
  top: 40%;
  right: 0;
  left: 0;
}
.secction1-content h1 {
  font-size: 40px;
  padding-bottom: 30px;
}
.secction1-content p {
  font-size: 20px;
}
.section2 {
  background-color: rgb(44, 48, 43);
}
.section3 {
  background-color: rgb(116, 104, 109);
}
.section4 {
  background-color: rgb(201, 202, 157);
}
</style>