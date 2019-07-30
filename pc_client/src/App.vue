<template>
  <div id="app">
    <fixed-box></fixed-box>
    <header-layout></header-layout>
    <router-view/>
    <footer-layout></footer-layout>
  </div>
</template>

<script>
import headerLayout from "@/components/header.vue";
import footerLayout from "@/components/footer.vue";
import fixedBox from "@/components/fixedBox.vue";

export default {
  name: "app",
  components: { headerLayout, footerLayout, fixedBox }
}
</script>

<style lang="scss" type scoped>
body {
  margin: 0;
  padding: 0;
  min-width: 1080px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
