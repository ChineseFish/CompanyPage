<template>
  <div id="app" style="display:flex;flex-direction:column;align-items:center;">
    <fixed-header></fixed-header>
    <div style="width:80%;min-width:1280px;margin-top:100px;margin-bottom:100px;">
      <navigator></navigator>
      <router-view/>
    </div>
    <fixed-footer></fixed-footer>
    <fixed-box></fixed-box>
  </div>
</template>

<script>
import fixedHeader from "./components/fixedHeader.vue"
import fixedFooter from "./components/fixedFooter.vue"
import fixedBox from "./components/fixedBox.vue"
import navigator from "./components/navigator.vue"

  export default {
    name: 'App',
    components: { fixedHeader, fixedFooter, fixedBox, navigator },
    data () {
      return {
        
      }
    },

    created () {
      
    }
  }
</script>

<style lang="scss" scoped type>
#app {
  display: flex;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #606266;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
