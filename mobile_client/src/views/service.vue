<template>
  <div class='container'>
    <div class="serviceHeaderImg">
      <span>服务项目</span>
    </div>
    <div style="width:100%;">
      <div style="display:flex;">
        <span class="headerTags">商业活动</span>
        <span class="headerTags">文艺演出</span>
        <span class="headerTags">数字展馆</span>
        <span class="headerTags">光影亮化</span>
        <span class="headerTags">沉浸空间</span>
        <span class="headerTags">创意互动</span>
      </div>
      <div style="width:100%;dispaly:flex;flex-direction:column;">
        <el-card v-for="(article, index) in articleContentTableData" :key="index" class="card" :body-style="{ padding: '0px' }" shadow="hover" @click="checkArticle(article)">
          <div style="display:flex;align-items:center;">
            <img :src="`/getBreviaryPhoto?width=125&height=100&filename=${article.img}`" style="width:125px;height:100px;">
            <div style="padding:14px;">
              <span>{{article.title}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ new Date(article.updateTime).Format("yyyy-MM-dd")}}</time>
              </div>
            </div>
          </div>
        </el-card>
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
        articleContentTableData: []
      }
    },

    created: function () {
      this.getList(1);
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
          pageNum: this.pagination.pageSize
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

<style lang="scss" type scoped>
@import "../assets/css/common.scss";
</style>

<style>
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  
  .clearfix:after {
    clear: both
  }
  .card {
    cursor: pointer;
    width: 100%;
    height: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>

