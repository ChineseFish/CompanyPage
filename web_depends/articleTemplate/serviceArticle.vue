<template>
  <div style="display:flex;flex-direction:column;align-items:center;">
    <div class="content">
      <slot></slot>
      <div class="title">
        <strong>{{previewArticle.title}}</strong>
      </div>

      <video :src="videoUrl" controls="controls" class="video">
        Your browser does not support the video tag.
      </video>

      <div class="gallery">
        <el-carousel :interval="4000" arrow="always">
          <el-carousel-item v-for="(img, index) in imgs" :key="index">
            <img v-if="img.type==='imgUpload'" :src="`/getPhoto?filename=${img.data}`" />
            <img v-if="img.type==='imgUrl'" :src="img.data" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="detail">
        <el-card shadow="always"  style="display:flex;width:100%;">
          <strong>详细信息</strong>
        </el-card>
      </div>
    
      <template v-for="(item, index) in detailData">
        <div class="text" :key="index">
          <p>&nbsp&nbsp&nbsp&nbsp{{item}}</p>
        </div>
      </template>
    </div>
    <navigator :preArticle="preArticle" :nextArticle="nextArticle" @articleNav="articleNav"></navigator>
  </div>
</template>

<script>
import navigator from "./navigator.vue"
import mixins from "./mixins.js"

export default {
  name: "serviceArticle",
  mixins: [mixins],
  components: { navigator },
  data: function() {
    return {
      videoUrl: "",
      imgs: [],
      detailData: []
    };
  },

  created: function() {
    //
    for (let ele of this.previewArticle.data) {
      if(ele.type === 'videoUrl')
      {
        this.videoUrl = ele.data;
      }
      else if ((ele.type === "imgUrl") | (ele.type === "imgUpload")) {
        this.imgs.push(ele);
      } else if (ele.type === "text") {
        this.detailData.push(ele.data);
      }
    }

    //
    this.initArticleNavigator();
  },

  methods: {
     articleNav(filename)
    {
      this.$emit('articleNav', filename);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './article.scss';
</style>

