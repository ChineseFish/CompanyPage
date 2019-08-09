<template>
    <div class="footer">
      <p>版权所有：增强网络科技</p>
      <a
        style="text-decoration:none;color: rgb(255, 255, 255);"
        href="http://beian.miit.gov.cn"
      >辽ICP备： 15003829号</a>
    </div>
</template>

<script>
  export default {
    name: 'fixedFooter',
    data () {
      return {
        
      }
    },

    created () {
      
    }
  }
</script>

<style lang="scss" scoped type>
.footer {
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  font-size: 15px;
  padding: 10px;
}
</style>
