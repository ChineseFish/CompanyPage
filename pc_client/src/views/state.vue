<template>
  <div class='container'>
    <div class="stateHeaderImg">
      <span>增强网络动态</span>
    </div>
    <div style="display:flex;">
      <span class="headerTags">公司动态</span>
      <span class="headerTags">行业动态</span>
    </div>
    <avue-crud 
    style="width:100%;height:100%;"
    :table-loading="tableLoading"
    :page="pagination"
    :data="articleContentTableData" 
    :option="articleContentTableOption"
    @size-change="sizeChange"
    @current-change="currentChange">
      <template slot-scope="scope" slot="article">
         <el-card class="card" :body-style="{ padding: '0px' }" shadow="hover">
            <div style="display: flex;flex-direction: row;" @click="checkArticle(scope.row.article)">
                <img :src="`/getBreviaryPhoto?width=250&height=200&filename=${scope.row.article.img}`" class="image">
                <div style="display:flex;flex-direction:column;padding: 14px;">
                    <span>{{scope.row.article.title}}</span>
                    <div class="clearfix">
                        <time>{{ new Date(scope.row.article.updateTime).Format("yyyy-MM-dd")}}</time>
                    </div>
                    <span>{{scope.row.article.desc}}</span>
                </div>
            </div>
        </el-card>
      </template>
    </avue-crud >
  </div>
</template>

<script>
import mixins from '../mixins';

  export default {
    name: 'state',
    mixins: [mixins],
    data () {
      return {
        articleContentTableData: [],
        articleContentTableOption: {
          border: false,
          menu: false,
          showHeader: false,
          page: true,
          sortable: true,
          addBtn: false,
          columnBtn: false,
          refreshBtn: false,
          column: [{
              label: 'content',
              prop: 'article',
              solt: true
            }
          ]
        }
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
        
          let tableData = [];
          for(let i = 0; i < data.data.length; i++)
          {
            let article = data.data[i];
            
            if(!article.tags.find(tag => tag === 'state'))
            {
              continue;
            }

            tableData.push({
                article: article
            });
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

<style lang="scss" scoped>
  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 400px;
    display: block;
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
    height: 250px;
  }
  img {
    width: 400px;
    height: 250px;
  }
  div{
      font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
    font-size: 18px;
    color: #909399;
    font-weight: 400;
    line-height: 2em;
    word-break: break-all; /*支持IE，chrome，FF不支持*/
    word-wrap: break-word; /*支持IE，chrome，FF*/
    overflow: hidden;
  }
</style>

