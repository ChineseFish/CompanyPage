<template>
    <el-container id="container">
    <el-header class="header-bar">后台管理中心</el-header>
    <el-container>
      <el-aside width="200px" class="aside-bar">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
        >
          <router-link :to="{name: 'article'}">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">文章管理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "manager",
  data () {
    return {
      activeIndex: '1'
    }
  },
  watch: {
    $route () {
      var routeInfo = this.$route.fullPath

      if (routeInfo.indexOf('article') > -1) {
        this.activeIndex = '1'
        this.getFAQList()
      } else if (routeInfo.indexOf('appCaseManage') > -1) {
        this.activeIndex = '2'
        this.getWikiList()
      } else if (routeInfo.indexOf('vedioManage') > -1) {
        this.activeIndex = '3'
        this.getVedioList()
      } else if (routeInfo.indexOf('bannerManage') > -1) {
        this.activeIndex = '4'
        this.getPaperList()
      }
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
.aside-bar {
  border-right: 1px solid #eeeeee;
  height: 100%;
  > .el-menu {
    border-right: none;
  }
}
</style>

