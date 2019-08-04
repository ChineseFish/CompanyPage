<template>
  <div class='container'>
    <avue-crud 
    style="width:100%;"
    :table-loading="tableLoading"
    :page="pagination"
    :data="articleContentTableData" 
    :option="articleContentTableOption"
    @size-change="sizeChange"
    @current-change="currentChange">
      <template slot-scope="scope" slot="articleOne">
         <el-card class="card" v-if="scope.row.articleOne" :body-style="{ padding: '0px' }" shadow="hover">
          <img :src="`/getBreviaryPhoto?width=250&height=200&filename=${scope.row.articleOne.img}`" class="image" @click="checkArticle(scope.row.articleOne)">
          <div style="padding: 14px;">
            <span>{{scope.row.articleOne.title}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ new Date(scope.row.articleOne.updateTime).Format("yyyy-MM-dd")}}</time>
            </div>
          </div>
        </el-card>
      </template>
      <template slot-scope="scope" slot="articleTwo">
         <el-card class="card" v-if="scope.row.articleTwo" :body-style="{ padding: '0px' }" shadow="hover">
          <img :src="`/getBreviaryPhoto?width=250&height=200&filename=${scope.row.articleTwo.img}`" class="image" @click="checkArticle(scope.row.articleTwo)">
          <div style="padding: 14px;">
            <span>{{scope.row.articleTwo.title}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ new Date(scope.row.articleTwo.updateTime).Format("yyyy-MM-dd")}}</time>
            </div>
          </div>
        </el-card>
      </template>
      <template slot-scope="scope" slot="articleThree">
         <el-card class="card" v-if="scope.row.articleThree" :body-style="{ padding: '0px' }" shadow="hover">
          <img :src="`/getBreviaryPhoto?width=250&height=200&filename=${scope.row.articleThree.img}`" class="image" @click="checkArticle(scope.row.articleThree)">
          <div style="padding: 14px;">
            <span>{{scope.row.articleThree.title}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ new Date(scope.row.articleThree.updateTime).Format("yyyy-MM-dd")}}</time>
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
    name: 'service',
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
              prop: 'articleOne',
              solt: true
            },
            {
              label: 'content',
              prop: 'articleTwo',
              solt: true
            },
            {
              label: 'content',
              prop: 'articleThree',
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
              tableData[index] = {
                articleOne: article
              }
            }
            else if(i % 3 === 1)
            {
              tableData[index].articleTwo = article
            }
            else
            {
              tableData[index].articleThree = article
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
.container
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

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

  .image {
    width: 100%;
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
    width: 400px;
    height: 350px;
  }
  img {
    width: 400px;
    height: 250px;
  }
</style>

