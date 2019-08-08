<template>
  <div class="nav">
    <div class="navLeft">
      <i class="el-icon-arrow-left navIcon"></i>
      <p>前面的文章</p>
    </div>
    <div class="navRight">
      <p>后面的文章</p>
      <i class="el-icon-arrow-right navIcon"></i>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

.nav {
  display: flex;
  word-break: normal;
  /*支持IE，chrome，FF不支持*/
  word-wrap: normal;
  background-color: rgba(248,248,248,1);
  
  @media screen and (max-width: 480px) {
     width: 100%;
  }
}

.navLeft {
  @extend .nav;

  align-items: center;

  @media screen and (max-width: 480px) {
    
    width: 50%;
    height: 50px;
  }
}

.navRight {
  @extend .nav;

  align-items: center;

  @media screen and (max-width: 480px) {
    width: 50%;
    height: 50px;
   
    justify-content: flex-end;
  }
}

.navIcon {
  @media screen and (max-width: 480px) {
     padding: 10px;
  }
}


</style>
