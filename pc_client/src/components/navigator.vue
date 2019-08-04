<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/">网站首页</el-menu-item>
        <el-menu-item index="/about">关于倾影</el-menu-item>
        <el-submenu index="/service">
          <template slot="title">服务项目</template>
          <el-menu-item index="/service/1">商业活动</el-menu-item>
          <el-menu-item index="/service/2">文艺演出</el-menu-item>
          <el-menu-item index="/service/3">数字展馆</el-menu-item>
          <el-menu-item index="/service/4">光影亮化</el-menu-item>
          <el-menu-item index="/service/5">沉浸空间</el-menu-item>
          <el-menu-item index="/service/6">创意互动</el-menu-item>
        </el-submenu>
        <el-menu-item index="/state">倾影动态</el-menu-item>
      </el-menu>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            activeIndex: "home",
        }
    }
}
</script>

