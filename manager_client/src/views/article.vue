<template>
  <div>
    <el-button type="primary" @click="uploadArticle">新增案例</el-button>
    <avue-crud
      :table-loading="tableLoading"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page="pagination"
      :data="mainTableData"
      :option="mainTableOption"
    >
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <gov-button type="text" @click="handleUpdate(scope.row)" text="修改"></gov-button>
          <gov-button type="text" @click="handleDelete(scope.row)" text="删除"></gov-button>
        </div>
      </template>
    </avue-crud>
    
  </div>
</template>

<script>
import mixins from '../mixins/index.js'

export default {
  name: 'appCase',
  mixins: [mixins],
  data () {
    return {
      mainTableData: [],
      mainTableOption: {
        header: false,
        menu: false,
        page: true,
        border: true,
        column: [
          {
            label: '文章名称',
            prop: 'title',
          }, {
            label: '文章标签',
            prop: 'tips',
            type: 'dic',
            dicData: [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
            ],
          }, {
            label: '创建时间',
            prop: 'createTime',
          }, {
            label: '修改时间',
            prop: 'updateTime',
          }, {
            label: '菜单',
            prop: 'menu',
            solt: true,
            align: 'center',
          },
        ]
      }
    }
  },

  created()
  {
    this.getList(1);
  },

  methods: {
    getList(page) {
      this.tableLoading = true
      this.$axios.get("/getBreviaryArticleList", {
        page: page,
        pageNum: 1
      }).then(({ code, msg }) => {
        if(code !== 0)
        {
          this.$message.error(msg);
        }
      }).finnaly(() => {
        this.tableLoading = false;
      })
    },
    uploadArticle()
    {

    }
  },
  created () {
    this.getList()
  },
}
</script>
