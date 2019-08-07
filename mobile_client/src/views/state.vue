<template>
  <div class='container'>
    <div class="stateHeaderImg">
      <span>增强网络动态</span>
    </div>
    <div style="width:95%;">
      <div class="tags">
        <span class="headerTags" @click="subTag='stateCompany'">公司动态</span>
        <span class="headerTags" @click="subTag='stateIndustry'">行业动态</span>
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
    name: 'state',
    mixins: [mixins],
    data () {
      return {
        subTag: 'stateCompany',
        articleContentTableData: []
      }
    },

    created: function () {
      this.getList(1);
    },

    watch: {
      subTag: function(newValue) {
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
        
          let tableData = [];
          for(let i = 0; i < data.data.length; i++)
          {
            let article = data.data[i];
            
            if(!article.tags.find(tag => tag === 'state'))
            {
              continue;
            }

            tableData.push(article);
          }

          this.articleContentTableData = tableData;

          this.pagination.total = data.total;
        }).finally(() => {
          this.tableLoading = false;
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";
</style>

