<template>
  <div style="display:flex;flex-direction:column;align-items:center;">
    <fixed-header></fixed-header>
    <div style="position:absolute;z-index:-99;width:100%;top:0px;">
      <router-view/>
    </div>
  </div>
</template>

<script>
import fixedHeader from "./components/fixedHeader.vue"

  export default {
    name: 'App',
    components: { fixedHeader },
    data () {
      return {
        
      }
    },

    created () {
      
    }
  }
</script>

<style lang="scss">

::selection {
    background: #b3d4fc;
    text-shadow: none;
}

</style>
