<template>
  <div style="display:flex;flex-direction:column;align-items:center;z-index:1999;">
    <fixed-header v-if="ifShowFixedHeader"></fixed-header>
    <div style="width:100%;min-width:1280px;margin-bottom:100px;">
      <router-view/>
    </div>
    <fixed-footer v-if="ifShowFixedFooter"></fixed-footer>
    <leave-messages></leave-messages>
  </div>
</template>

<script>
import fixedHeader from "./components/fixedHeader.vue"
import fixedFooter from "./components/fixedFooter.vue"
import fixedBox from "./components/fixedBox.vue"
import leaveMessages from "../../web_depends/staticPages/leaveMessages.vue";

  export default {
    name: 'App',
    components: { fixedHeader, fixedFooter, fixedBox, leaveMessages },
    data () {
      return {
        ifShowFixedHeader: false,
        ifShowFixedFooter: false
      }
    },

    created () {
      if(this.$route.path === '/')
      {
        this.ifShowFixedFooter = this.ifShowFixedHeader = false;
      }
      else
      {
        this.ifShowFixedFooter = this.ifShowFixedHeader = true;
      }
    },

    watch: {
      $route: function(newValue) {
        if(this.$route.path === '/')
        {
          this.ifShowFixedFooter = this.ifShowFixedHeader = false;
        }
        else
        {
          this.ifShowFixedFooter = this.ifShowFixedHeader = true;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
