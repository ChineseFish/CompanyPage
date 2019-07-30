<template>
  <div id="container">
    <el-header class="header-bar">后台管理中心</el-header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "manager",
  data () {
    return {
      activeIndex: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  height: 100vh;
  width: 100%;
}
.header-bar {
  text-align: center;
  color: #000000;
  line-height: 60px;
  font-size: 25px;
  background: #eeeeee;
}
</style>

