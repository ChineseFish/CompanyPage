<template>
  <div class="nav">
    <div class="navLeft" @click="pre">
      <i class="el-icon-arrow-left navIcon"></i>
      <p>{{preTitle}}</p>
    </div>
    <div class="navRight" @click="next">
      <p>{{nextTitle}}</p>
      <i class="el-icon-arrow-right navIcon"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },

  props: {
    preArticle: {
      title: "没有啦"
    },
    nextArticle: {
      title: "没有啦"
    }
  },

  computed: {
    preTitle: function() {
      let title = this.preArticle ? this.preArticle.title : '没有啦 !';
      if(title.length > 6)
      {
        return title.substring(0, 5) + '...'
      }
      
      return title;
    },

    nextTitle: function() {
      let title = this.nextArticle ? this.nextArticle.title : '没有啦 !';
      if(title.length > 6)
      {
        return title.substring(0, 5) + '...'
      }

      return title;
    }
  },

  methods: {
    pre: function() {
      if(this.preArticle)
      {
        return this.$emit('articleNav', this.preArticle.filename);
      }
    },

    next: function() {
      if(this.nextArticle)
      {
        return this.$emit('articleNav', this.nextArticle.filename);
      }
    }
  }
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
  cursor: pointer;

  @media screen and (max-width: 480px) {
    
    width: 50%;
    height: 50px;
  }
}

.navRight {
  @extend .nav;

  align-items: center;
  cursor: pointer;

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
