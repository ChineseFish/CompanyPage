<template>
  <div id="app">
    <header></header>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <footer></footer>
    <fixedBox></fixedBox>
  </div>
</template>

<script>
import header from "./components/header.vue"
import footer from "./components/footer.vue"
import fixedBox from "./components/fixedBox.vue"

  export default {
    name: 'App',
    components: { header, footer, fixedBox },
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
