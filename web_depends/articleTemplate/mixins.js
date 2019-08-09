export default {
  data() {
    return {
      preArticle: {
        title: ""
      },
      nextArticle: {
        title: ""
      }
    }
  },
  props:
  {
    previewVisible: {
      type: Boolean,
      default: false
    },

    previewArticle: {
      filename: "",
      title: "",
      desc: "",
      img: "",
      tags: [],
      createTime: 0,
      updateTime: 0,
      data: []
    }
  },
  methods: {
    initArticleNavigator() {
      this.$axios.get("/getPreAndNextBreviaryArticle", {
        filename: this.previewArticle.filename,
        tags: JSON.stringify(this.previewArticle.tags.slice(0, 2))
      }).then(({ code, data, msg }) => {
        if (code !== 0) {
          return this.$message.error(msg);
        }

        this.preArticle = data.pre;
        this.nextArticle = data.next;
      });
    },

    articleNav(filename)
    {
      this.$emit('articleNav', filename);
    }
  }
}
