<template>
  <div>B1</div>
</template>

<script type="text/ecmascript-6">
export default {
  beforeRouteEnter(to, from, next) {
    next(component => {
      component.intervalId = setInterval(() => {
        console.log("执行B1任务");
      }, 1000);
    });
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.intervalId);
    next();
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped ></style>
