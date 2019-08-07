<template>
  <div class='container'>
    <div class="serviceHeaderImg">
      <span>服务项目</span>
    </div>
    <div style="width:95%;">
      <div style="width:100%:display:flex;flex-direction:column;justify-content:center;align-items:center;border-bottom: 1px solid #dcdfe6;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="headerTags" @click="subTag='serviceBusiness'">商业活动</span>
          <span class="headerTags" @click="subTag='serviceShow'">文艺演出</span>
          <span class="headerTags" @click="subTag='serviceGallery'">数字展馆</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="headerTags" @click="subTag='serviceLight'">光影亮化</span>
          <span class="headerTags" @click="subTag='serviceImmerse'">沉浸空间</span>
          <span class="headerTags" @click="subTag='serviceInteract'">创意互动</span>
        </div>
      </div>
      <div class="breviaryArticleList">
          <div
          v-for="(article, index) of articleContentTableData" 
          :key="index" 
          class="card" >
              <img :src="`/getPhoto?filename=${article.img}`" width="100%" @click="checkArticle(article)">
              <strong>{{article.title}}</strong>
              <time>{{ new Date(article.updateTime).Format("yyyy-MM-dd")}}</time>
              <p>{{article.desc}}</p>
          </div>
      </div>
      <div style="display:flex;justify-content:flex-end;">
        <el-pagination
          background
          layout="prev, pager, next"
          @size-change="sizeChange"
          @current-change="currentChange"
          @prev-click="prePage"
          @next-click="nextPage"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '../mixins';

  export default {
    name: 'service',
    mixins: [mixins],
    data () {
      return {
        subTag: 'serviceBusiness',
        articleContentTableData: []
      }
    },

    created: function () {
      this.getList(1);
    },

    watch: {
      subTag: function() {
        this.pagination.currentPage = 1;
        this.getList(1)
      }
    },

    methods: {
      checkArticle(article)
      {
        this.$router.push({
          path: `/article/${article.filename}`
        })
      },

      getList(page) {
        this.tableLoading = true
        this.$axios.get("/getBreviaryArticleList", {
          page: page,
          pageNum: this.pagination.pageSize,
          tags: JSON.stringify([this.subTag])
        }).then(({ code, data, msg }) => {
          if(code !== 0)
          {
            return this.$message.error(msg);
          }

          let tableDataTotal = [];
          for(let i = 0; i < data.data.length; i++)
          {
            let article = data.data[i];

            if(!article.tags.find(tag => tag === 'service'))
            {
              continue;
            }

            tableDataTotal.push(article)
          }

          this.articleContentTableData = tableDataTotal;

          this.pagination.total = data.total;
        }).finally(() => {
          this.tableLoading = false;
        })
      }
    },
  }
</script>

<style lang="scss" type>
@import "../assets/css/common.scss";
</style>

