<template>
  <div style="display:flex;flex-direction:column;align-items:center;">
    <div class="content">
      <slot></slot>
      <div class="title">
        <strong>{{previewArticle.title}}</strong>
      </div>
      
      <div class="desc">
        <el-card shadow="always" style="width:100%;">
          <strong>摘要</strong>
          <p>{{previewArticle.desc}}</p>
        </el-card>
      </div>

      <img class="img" :src="`/getPhoto?filename=${previewArticle.img}`" />
      <template v-for="(item, index) in previewArticle.data">
        <div
          class="text"
          v-if="item.type === 'text'"
          :key="index"
        >
          <p>&nbsp&nbsp&nbsp&nbsp{{item.data}}</p>
        </div>
        <img v-if="item.type === 'imgUrl'" :key="index" class="img" :src="`/getPhoto?filename=${item.data}`" />
        <img v-if="item.type === 'imgUrl'" :key="index" class="img" :src="item.data" />
        <video
          v-if="item.type === 'videoUrl'" :key="index"
          :src="item.data"
          controls="controls"
          class="video"
        >Your browser does not support the video tag.</video>
      </template>
    </div>
    <navigator :preArticle="preArticle" :nextArticle="nextArticle"  @articleNav="articleNav"></navigator>
  </div>
</template>

<script>
import navigator from "./navigator.vue"
import mixins from "./mixins.js"

export default {
  name: "stateArticle",
  mixins: [mixins],
  components: { navigator },
  data: function() {
    return {

    }
  },

  created() {
    this.initArticleNavigator();
  }
};
</script>

<style lang="scss" scoped>
@import './article.scss';
</style>

