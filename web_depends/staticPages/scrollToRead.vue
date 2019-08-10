<template>
  <div style="display:flex;flex-direction:column;justify-content:flex-end;align-items:center;width:100%;height:100%;padding:20px;">
    <span style="color: rgb(255,255,255);">SCROLL DOWN TO READ</span>
    <div class="arrow">
      <i class="el-icon-arrow-down" style="color: rgb(255,255,255);"></i>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

.arrow {
  display: block;
  position: relative;
  z-index: 1;
  transform: translate(-10px, 0);
  animation: moveArrow .6s linear infinite;
  animation-direction: alternate;
}

@keyframes moveArrow {
  0% {
      transform: translate(0, 0);
  }
  100% {
      transform: translate(0, 20px);
  }
}
</style>
