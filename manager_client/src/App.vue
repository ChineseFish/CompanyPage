<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  },
  created: function()
  {
    
  }
}
</script>

<style lang="scss">
body div {
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  font-size: 21px;
  color: #909399;
  font-weight: 400;
  line-height: 2em;
  word-break: break-all; /*支持IE，chrome，FF不支持*/
  word-wrap: break-word; /*支持IE，chrome，FF*/
  overflow: hidden;
}
</style>
