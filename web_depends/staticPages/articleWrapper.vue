<template>
  <div style="display:flex;flex-direction:column;align-items:center;">
    <div :class="whichArticleToShow === 'service' ? 'serviceHeaderImg' : 'stateHeaderImg'">
      <span v-if="whichArticleToShow === 'service'">增强网络动态</span>
      <span v-else>服务项目</span>
      <span class="staticHeaderHeader1" v-if="whichArticleToShow === 'service'">STATE</span>
      <span class="staticHeaderHeader1" v-else>SERVICE</span>
      <scroll-to-read></scroll-to-read>
    </div>
    <div class="articleWrap">
      <service-article
        v-if="whichArticleToShow === 'service'"
        :previewVisible="true"
        :previewArticle="article"
        @articleNav="articleNav"
      ></service-article>
      <state-article 
      v-if="whichArticleToShow === 'state'" 
      :previewVisible="true" 
      :previewArticle="article"
      @articleNav="articleNav"></state-article>
    </div>
  </div>
</template>

<script>
import serviceArticle from "../articleTemplate/serviceArticle.vue";
import stateArticle from "../articleTemplate/stateArticle.vue";
import scrollToRead from "./scrollToRead.vue"
export default {
  name: "articleWrapper",
  components: { serviceArticle, stateArticle, scrollToRead },
  data: function() {
    return {
      article: {},

      whichArticleToShow: "",
    };
  },

  created: function() {
    this.getArticleDetail(this.$route.params.filename)
  },

  methods: {
    articleNav: function(filename) {
      this.whichArticleToShow = "";
      setTimeout(() => {
        this.getArticleDetail(filename);
      });
    },

    getArticleDetail: function(filename) {
      this.$axios
      .get("/getArticle", {
        filename: filename
      })
      .then(({ code, data, msg }) => {
        if (code !== 0) {
          return this.$message.error(msg);
        }

        this.article = data;

        if (this.article.tags.find(tag => tag === "service")) {
          this.whichArticleToShow = "service";
        } else {
          this.whichArticleToShow = "state";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./common.scss";

.articleWrap {
  width:80%;
  
  @media screen and (max-width: 480px) {
    width:100%;
  }
}
</style>

