<template>
  <div class='container'>
    <div class="serviceHeaderImg">
      <span>服务项目</span>
    </div>
    <div style="width:80%;">
      <div style="display:flex;">
        <span class="headerTags" @click="subTag='serviceBusiness'">商业活动</span>
        <span class="headerTags" @click="subTag='serviceShow'">文艺演出</span>
        <span class="headerTags" @click="subTag='serviceGallery'">数字展馆</span>
        <span class="headerTags" @click="subTag='serviceLight'">光影亮化</span>
        <span class="headerTags" @click="subTag='serviceImmerse'">沉浸空间</span>
        <span class="headerTags" @click="subTag='serviceInteract'">创意互动</span>
      </div>
      <div style="width:100%;dispaly:flex;">
        <el-row v-for="(articleSet, index) in articleContentTableData" :key="index">
          <el-col :span="8" v-for="(article, index) in articleSet" :key="index">
            <el-card class="card" :body-style="{ padding: '0px' }" shadow="hover">
              <img :src="`/getBreviaryPhoto?width=250&height=200&filename=${article.img}`" class="image" @click="checkArticle(article)">
              <div style="display:flex;flex-direction:column;align-items:center;padding: 14px;background-color: rgba(0, 0, 0, 0.12);">
                <span style="font-size:30px;">{{article.title}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ new Date(article.updateTime).Format("yyyy-MM-dd")}}</time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
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

          let tableData = [];
          for(let i = 0; i < tableDataTotal.length; i++)
          {
            let article = tableDataTotal[i];

            const index = Math.floor(i / 3);

            if(i % 3 === 0)
            {
              tableData[index] = [ article ];
            }
            else if(i % 3 === 1)
            {
              tableData[index].push(article);
            }
            else
            {
              tableData[index].push(article)
            }
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

<style lang="scss" type scoped>
@import "../assets/css/common.scss";
</style>

<style scoped>
  .image {
    width: 100%;
    display: block;
  }

  .card {
    cursor: pointer;
    width: 400px;
    height: 350px;
    margin: 40px;
  }
  img {
    width: 400px;
    height: 250px;
  }
</style>

