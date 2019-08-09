<template>
  <div style="display:flex;flex-direction:column;align-items:center;">
    <div :class="whichArticleToShow === 'service' ? 'serviceHeaderImg' : 'stateHeaderImg'">
      <span v-if="whichArticleToShow === 'service'">增强网络动态</span>
      <span v-else>服务项目</span>
    </div>
    <div style="width:100%;">
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
import serviceArticle from "../../../web_depends/articleTemplate/serviceArticle.vue";
import stateArticle from "../../../web_depends/articleTemplate/stateArticle.vue";

export default {
  name: "articleWrapper",
  components: { serviceArticle, stateArticle },
  data: function() {
    return {
      article: {},

      whichArticleToShow: ""
    };
  },

  created: function() {
    this.getArticleDetail(this.$route.params.filename);
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
@import "../assets/css/common.scss";
</style>

