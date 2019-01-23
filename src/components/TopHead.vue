<template>
  <div class="tophead">
    <div class="th-l">
      <!--这里是引用图片-->
      <i class="iconfont icon-back"></i>
    </div>
    <div class="th-title">{{title}}</div>
    <div class="thr">
      <slot name="r"></slot>
    </div>
  </div>

</template>

<script>
  export default {
    name: "TopHead",
    props:["title","backurl"],
    data() {
      return {};
    }
  }
</script>

<style scoped>
  .tophead{
    /* 弹性布局 */
    display: flex;
    justify-content: space-between;
    height: 300px;
    line-height: 50px;
    color: #9a6e3a;

  }

</style>
