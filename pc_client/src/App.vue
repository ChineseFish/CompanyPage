<template>
  <div style="display:flex;flex-direction:column;align-items:center;z-index:1999;">
    <fixed-header></fixed-header>
    <div style="width:100%;min-width:1280px;margin-bottom:100px;">
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


  export default {
    name: 'App',
    components: { fixedHeader, fixedFooter, fixedBox },
    data () {
      return {
        
      }
    },

    created () {
      
    }
  }
</script>

<style lang="scss" scoped>

</style>
