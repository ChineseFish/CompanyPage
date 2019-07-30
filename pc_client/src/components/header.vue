<template>
  <div id="header" @mouseleave="clearIsSearch">
    this is header
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      
    }
  },
  methods: {

  },
  created () {
    
  }
}
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
