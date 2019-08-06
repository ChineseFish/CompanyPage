<template>
  <div style="display:flex;flex-direction:column;align-items:center;">
    <fixed-header></fixed-header>
    <div style="position:absolute;z-index:-1;width:100%;top:0px;margin-bottom:100px;">
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

<style lang="scss" scoped type>

</style>
