<template>
  <div class="container">
    <el-header class="headerBar">后台管理中心</el-header>
    <div style="width:80%;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "manager",
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.headerBar {
  width: 100%;
  text-align: center;
  line-height: 60px;
  font-size: 40px;
  padding: 40px;
  margin-bottom: 40px;
}
</style>

