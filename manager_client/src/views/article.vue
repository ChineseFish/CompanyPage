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
    <el-dialog title="服务" :visible.sync="serviceVisible" width="80%">
        <el-form label-width="60px">
          <el-form-item label="img">
            <el-upload
              action="/uploadPhoto"
              :show-file-list="false"
              :on-success="uploadHeaderImgSuccess"
              :on-error="uploadHeaderImgError">
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
            <div>
              <el-tag
                :key="tag"
                v-for="tag in articleTags"
                closable
                :disable-transitions="false"
                @close="closeTag(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="addTagVisible"
                v-model="tagValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="comfirmAddTag"
                @blur="comfirmAddTag"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="editAddTag">+ New Tag</el-button>
            </div>
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
          :option="articleContentTableOption"
          v-model="articleContentTableData"
        >
          <template slot-scope="scope" slot="menu">
            <el-button
              type="primary"
              @click="articleContentEdit(scope.row)"
              v-if="scope.row.type !== 'imgUpload'"
            >{{scope.row.$cellEdit ? '保存' : '修改'}}</el-button>
            <el-upload
              action="/uploadPhoto"
              :show-file-list="false"
              :on-success="uploadArticleContentImgSuccess(scope.row)"
              :on-error="uploadArticleContentImgError"
              v-if="scope.row.type==='imgUpload'"
            >
              <el-button type="primary">上传图片</el-button>
            </el-upload>
            <el-button type="primary" @click="deleteArticleContent(scope.row)">删除</el-button>
          </template>
        </avue-crud>
        <span slot="footer" class="dialog-footer">
            <el-button @click="serviceVisible = false">取 消</el-button>
            <el-button type="primary" @click="createArticle">确 定</el-button>
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
            label: '封面图片',
            prop: 'breviaryImg',
            slot: true,
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
          },
        ]
      },
      articleContentTableData: [],
      articleContentTableOption: {
        header: false,
        menu: false,
        page: true,
        border: true,
        column: [
          {
            label: '类型',
            prop: 'type',
          }, {
            label: '内容',
            prop: 'content'
          }, {
            label: '菜单',
            prop: 'menu',
            solt: true,
            align: 'center'
          },
        ]
      },
      articleTags: ['', '标签二', '标签三'],
      addTagVisible: false,
      tagValue: ''
    }
  },

  created()
  {
    this.getList(1);
  },

  methods: {
    uploadArticleContentImgSuccess(row)
    {
      if (code !== 0) {
        this.$message.error(`upload article content img failed, ${msg}`)

        if(code === 7)
        {
          return this.$router.push({ path: '/login' })
        }
      }
      
      this.articleContentTableData[row.$index].content = data;

      this.$message.success('upload success')
    },
    uploadArticleContentImgError()
    {
      this.$message.error(`upload article content failed, ${err}`);
    },
    deleteArticleContent(row)
    {
      this.articleContentTableData.splice(row.$index, 1)
    },
    createArticle()
    {
      article.beginTime = Date.now();
      article.updateTime = Date.now();
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
    addArticleItem()
    {
      this.articleContentTableData.push({
        type: this.itemType,
        data: ''
      });
    },
    articleContentEdit(row)
    {
      // open row cell
      this.$refs.crud.rowCell(row, row.$index)
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

    uploadHeaderImgSuccess({ code, msg, data })
    {
      if (code !== 0) {
        this.$message.error(`upload header img failed, ${msg}`)

        if(code === 7)
        {
          return this.$router.push({ path: '/login' })
        }
      }

      this.article.img = data;
      
      this.$message.success('upload success')
    },

    uploadHeaderImgError(err)
    {
      this.$message.error(`upload header img failed, ${err}`);
    },

    closeTag(tag) {
      this.articleTags.splice(this.articleTags.indexOf(tag), 1);
    },

    editAddTag() {
      this.addTagVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    comfirmAddTag() {
      let tagValue = this.tagValue;
      if (tagValue) {
        this.articleTags.push(tagValue);
      }
      this.addTagVisible = false;
      this.tagValue = '';
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
</style>
