<template>
  <div>
    <div style="display:flex;justify-content:flex-end;margin-top: 20px;margin-bottom:20px;">
      <el-button type="primary" @click="serviceVisible=true">新增服务</el-button>
      <el-button type="primary" @click="caseVisible=true">新增案例</el-button>
      <el-button type="primary" @click="stateVisible=true">新增动态</el-button>
    </div>
    <avue-crud
      :table-loading="tableLoading"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page="pagination"
      :data="mainTableData"
      :option="mainTableOption"
    >
      <template slot-scope="scope" slot="menu">
        <div style="display:flex;justify-content:flex-end;">
          <el-button type="primary" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="primary" @click="handleDelete(scope.row)">删除</el-button>
        </div>
      </template>
    </avue-crud>
    <el-dialog title="服务" :visible.sync="serviceVisible" width="80%">
        <el-form label-width="60px">
          <el-form-item label="img">
            <el-upload
              class="upload-demo2"
              action="/uploadPhoto"
              :show-file-list="false"
              :on-success="uploadHeaderImg"
              :on-error="uploadError">
                <el-button type="primary">上传封面图片</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="title">
              <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="desc">
              <el-input v-model="article.desc"></el-input>
          </el-form-item>
          <el-form-item label="tags">
              <el-input v-model="article.tags"></el-input>
          </el-form-item>
        </el-form>
        <div style="display:flex;margin-top:10px;margin-bottom:10px;">
          <el-select v-model="itemType" style="width:100%;margin-right:10px;">
            <el-option value="text" label="文本"></el-option>
            <el-option value="imgUpload" label="图片上传"></el-option>
            <el-option value="imgUrl" label="图片链接"></el-option>
            <el-option value="vedioUrl" label="视频链接"></el-option>
          </el-select>
          <el-button type="primary" @click="addArticleItem">新增</el-button>
        </div>
        <avue-crud
          ref="crud"
          :data="articleTableData"
          :option="articleTableOption"
          v-model="formData"
          @row-update="rowUpdate"
        >
          <template slot-scope="scope" slot="menu">
            <el-button
              type="primary"
              @click="editCell(scope.row, scope.row.$index)"
              :text="scope.row.$cellEdit ? '保存' : '修改'"
              v-if="scope.row.type !== 'imgUpload'"
            ></el-button>
            <el-upload
              action="/uploadPhoto"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              v-if="scope.row.type==='img'"
            >
              <el-button type="primary" @click="uploadRowIndex(scope.row.$index)">上传图片</el-button>
            </el-upload>
            <el-button type="primary" @click="handleDelete(scope.row.$index)">删除</el-button>
          </template>
        </avue-crud>
        <span slot="footer" class="dialog-footer">
            <el-button @click="serviceVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveCreate">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import mixins from '../mixins/index.js'

export default {
  name: 'appCase',
  mixins: [mixins],
  data () {
    return {
      itemType: "",
      article: {
        filename: "",
        title: "",
        desc: "",
        createTime: "",
        updateTime: "",
        img: "",
        tags: [],
        data: []
      },
      serviceVisible: false,
      caseVisible: false,
      stateVisible: false,
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
            prop: 'tags',
            type: 'dic',
            dicData: [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
            ],
          }, {
            label: '发布人',
            prop: 'publisher',
          }, {
            label: '描述',
            prop: 'desc',
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
      },
      articleTableData: [],
      articleTableOption: {
        header: false,
        menu: false,
        page: true,
        border: true,
        column: [
          {
            label: '类型',
            prop: 'type',
          }, {
            label: 'content',
            prop: 'content'
          }, {
            label: '菜单',
            prop: 'menu',
            solt: true,
            align: 'center'
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
    addArticleItem()
    {
      this.articleTableData.push({
        type: this.itemType,
        data: ''
      });
    },

    editCell(row, index)
    {
      this.$refs.crud.rowCell(row, index)
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
    },
    uploadArticle()
    {

    },
    searchChange(params) {
      getList(page)
    },
  },
  created () {
    this.getList(1)
  },
}
</script>
