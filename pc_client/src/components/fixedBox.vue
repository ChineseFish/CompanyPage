<template>
  <div id="fixed-box">
    this is fixed box
  </div>
</template>

<script>
export default {
  name: 'fixedBox',
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
  #fixed-box {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 50px;
    top: 50%;
    margin-top: -100px;
    right: 10px;
    z-index: 9999;
    transition: 0.5s;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
