<template>
  <div style="display:flex;flex-direction:column;align-items:center;">
    <fixed-header></fixed-header>
    <div>
      <router-view/>
    </div>
    <leave-messages></leave-messages>
  </div>
</template>

<script>
import fixedHeader from "./components/fixedHeader.vue"
import leaveMessages from "../../web_depends/staticPages/leaveMessages.vue";

  export default {
    name: 'App',
    components: { fixedHeader, leaveMessages },
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
