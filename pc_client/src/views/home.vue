<template>
  <div class='container'>
    this is home
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        
      }
    }
  }
</script>

<style lang="scss" type scoped>
.container
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  line-height: 50px;
}

.border
{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
}
</style>
