<template>
  <div>
    <div style="display:flex;justify-content:flex-end;margin-top: 20px;margin-bottom:20px;">
      <el-button type="primary" @click="showCreateCase">新增案例</el-button>
      <el-button type="primary" @click="showCreateState">新增动态</el-button>
    </div>
    <avue-crud
      :table-loading="tableLoading"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page="pagination"
      :data="mainTableData"
      :option="mainTableOption"
    >
      <template slot-scope="scope" slot="breviaryImg">
        <img :src="`/getBreviaryPhoto?width=100&height=100&filename=${scope.row.img}`">
      </template>
      <template slot-scope="scope" slot="menu">
        <div style="display:flex;justify-content:flex-end;">
          <el-button type="primary" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="primary" @click="handleDelete(scope.row)">删除</el-button>
        </div>
      </template>
    </avue-crud>
    <article-dialog v-bind:dialogVisible.sync="dialogVisible" @createArticle="createArticle">
      <template v-slot:content>
        <template v-if="stateVisible">
          <el-form-item label="content">
            <article-data-list :articleContentItemTypeArray="stateArticleContentItemTypeArray"></article-data-list>
          </el-form-item>
        </template>
        <template v-if="caseVisible">
          <el-form-item label="gallery">
            <article-data-list :articleContentItemTypeArray="caseArticleContentItemTypeArray"></article-data-list>
          </el-form-item>
          <el-form-item label="detail">
            <el-input v-model="createCaseDetail"></el-input>
          </el-form-item>
        </template>
      </template>
    </article-dialog>
  </div>
</template>

<script>
import mixins from '../mixins/index.js';
import articleDialog from './articleDialog.vue';
import articleDataList from './articleDataList.vue'

export default {
  name: 'appCase',
  mixins: [mixins],
  components: { articleDialog, articleDataList },
  data () {
    return {
      dialogVisible: false,
      caseVisible: false,
      stateVisible: false,

      createCaseDetail: "",
      createServiceDetail: "",

      mainTableData: [],
      mainTableOption: {
        header: false,
        menu: false,
        page: true,
        border: true,
        column: [
          {
            label: '封面图片',
            prop: 'breviaryImg',
            solt: true,
            align: 'center'
          }, {
            label: '文章名称',
            prop: 'title',
          }, {
            label: '文章标签',
            prop: 'tags',
            type: 'dic',
            dicData: [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
            ]
          }, {
            label: '发布人',
            prop: 'publisher'
          }, {
            label: '描述',
            prop: 'desc'
          }, {
            label: '创建时间',
            prop: 'createTime'
          }, {
            label: '修改时间',
            prop: 'updateTime'
          }, {
            label: '菜单',
            prop: 'menu',
            solt: true,
            align: 'center'
          }
        ]
      },

      stateArticleContentItemTypeArray: [{
        value: "text",
        label: "文本"
      },
      {
        value: "imgUpload",
        label: "图片上传"
      },
      {
        value: "imgUrl",
        label: "图片链接"
      },
      {
        value: "vedioUrl",
        label: "视频链接"
      }],

      serviceArticleContentItemTypeArray: [
      {
        value: "imgUpload",
        label: "图片上传"
      },
      {
        value: "imgUrl",
        label: "图片链接"
      },
      {
        value: "vedioUrl",
        label: "视频链接"
      }],

      caseArticleContentItemTypeArray: [
      {
        value: "imgUpload",
        label: "图片上传"
      },
      {
        value: "imgUrl",
        label: "图片链接"
      },
      {
        value: "vedioUrl",
        label: "视频链接"
      }]
    }
  },

  created()
  {
    this.getList(1);
  },

  watch: {
    dialogVisible: function(newValue, oldValue) {
      if(newValue === false)
      {
        this.serviceVisible = this.caseVisible = this.stateVisible = false;
      }
    }
  },

  methods: {
    showCreateCase: function() {
      this.dialogVisible = true;

      this.caseVisible = true;
    },
    showCreateState: function() {
      this.dialogVisible = true;

      this.stateVisible = true;
    },
    createArticle()
    {
      article.beginTime = Date.now();
      article.updateTime = Date.now();
      article.tags = this.articleTags;
      article.data = this.articleContentTableData;
  
      this.$axios.post("/createArticle", article).then(({ code, data, msg }) => {
        if(code !== 0)
        {
          this.$message.error(msg);
        }

        // get List
        this.getList(1);
      })
    },
   
    getList(page) {
      this.tableLoading = true
      this.$axios.get("/getBreviaryArticleList", {
        page: page,
        pageNum: 1,
        title: this.searchForm.title === "" ? undefined :  this.searchForm.title,
        tags: this.searchForm.tags === "" ? undefined : this.searchForm.tags.split(",")
      }).then(({ code, data, msg }) => {
        if(code !== 0)
        {
          this.$message.error(msg);
        }

        this.mainTableData = data.data;
        this.pagination.total = data.total;
      }).finally(() => {
        this.tableLoading = false;
      })
    }
  },
  created () {
    this.getList(1)
  },
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
