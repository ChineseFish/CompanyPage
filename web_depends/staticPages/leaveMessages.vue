<template>
  <div class='container'>
    <div class="contractUsHeaderImg">
      <span>联系我们</span>
      <span class="">CONTRACT US</span>
      <scroll-to-read></scroll-to-read>
    </div>
  </div>
</template>

<script>
import scrollToRead from "./scrollToRead.vue"
  export default {
    name: 'leaveMessages',
    components: { scrollToRead },
    data () {
      return {
        
      }
    }
  }
</script>

<style lang="scss" type scoped>
@import "./common.scss";
</style>
