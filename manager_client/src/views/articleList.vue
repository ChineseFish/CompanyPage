<template>
  <div>
    <div v-show="previewServiceVisible === false && previewStateVisible === false">
      <div style="display:flex;justify-content:flex-end;margin-top: 20px;margin-bottom:20px;">
        <el-button type="primary" @click="showCreateService">新增服务</el-button>
        <el-button type="primary" @click="showCreateState">新增动态</el-button>
      </div>
      <el-table 
      :data="mainTableData"
      :border="true"
      style="width:100%;">
        <el-table-column label="封面图片">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:center;align-items:center;width:200px;height:120px;">
              <img :src="`/getPhoto?width=200&height=120&filename=${scope.row.img}`" width="200px" height="120px"/>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="title" label="标题"></el-table-column>

        <el-table-column prop="desc" label="描述"></el-table-column>

        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.createTime).Format("yyyy-MM-dd hh:mm")}}</span>
          </template>
        </el-table-column>

        <el-table-column label="更新时间">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.updateTime).Format("yyyy-MM-dd hh:mm")}}</span>
          </template>
        </el-table-column>

        <el-table-column label="菜单栏">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:flex-start;">
              <el-button type="primary" @click="updateArticle(scope.$index, scope.row)">修改</el-button>
              <el-button type="primary" @click="deleteArticle(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="display:flex;justify-content:flex-end;margin-top:50px;">
        <el-pagination
          background
          layout="prev, pager, next"
          @size-change="sizeChange"
          @current-change="currentChange"
          @prev-click="prePage"
          @next-click="nextPage"
          :total="pagination.total"
        ></el-pagination>
      </div>
      <article-dialog
        v-bind:dialogVisible.sync="dialogVisible"
        v-bind:article.sync="article"
        @articleOptFinish="articleOptFinish"
        @preview="preview"
      >
        <template v-slot:content>
          <template v-if="stateVisible">
            <el-form-item label="content">
              <article-data-list
                v-bind:articleContentTableData.sync="articleContentTableData"
                :articleContentItemTypeArray="stateArticleContentItemTypeArray"
              ></article-data-list>
            </el-form-item>
          </template>
          <template v-if="serviceVisible">
            <el-form-item label="detail">
              <article-data-list
                v-bind:articleContentTableData.sync="articleContentTableData"
                :articleContentItemTypeArray="serviceArticleContentItemTypeArray"
              ></article-data-list>
            </el-form-item>
          </template>
        </template>
      </article-dialog>
    </div>
    <div v-show="previewServiceVisible === true || previewStateVisible === true">
      <service-article
        v-if="previewServiceVisible === true"
        :previewVisible="previewServiceVisible"
        :previewArticle="previewArticle"
      >
        <el-button type="primary" @click="previewServiceVisible = false">返 回</el-button>
      </service-article>

      <state-article
        v-if="previewStateVisible === true"
        :previewVisible="previewStateVisible"
        :previewArticle="previewArticle"
      >
        <el-button type="primary" @click="previewStateVisible = false">返 回</el-button>
      </state-article>
    </div>
  </div>
</template>

<script>
import mixins from "../mixins/index.js";
import articleDialog from "./articleDialog.vue";
import articleDataList from "./articleDataList.vue";

import serviceArticle from "../../../web_depends/articleTemplate/serviceArticle.vue";
import stateArticle from "../../../web_depends/articleTemplate/stateArticle.vue";

export default {
  name: "articleList",
  mixins: [mixins],
  components: { articleDialog, articleDataList, serviceArticle, stateArticle },
  data() {
    return {
      // remark update ro create action
      articleOptType: "",

      //
      updatingFileName: "",

      // if show preview
      previewServiceVisible: false,
      previewStateVisible: false,

      //
      previewArticle: {
        title: "",
        desc: "",
        img: "",
        tags: [],
        createTime: 0,
        updateTime: 0,
        data: []
      },

      // if show main dialog
      dialogVisible: false,

      // if show data list
      serviceVisible: false,
      stateVisible: false,

      // article common item
      article: {
        title: "",
        desc: "",
        img: "",
        tags: [],
        createTime: 0,
        updateTime: 0
      },
      // article data list
      articleContentTableData: [],

      // breviary article list
      mainTableData: [],
      mainTableOption: {
        header: false,
        menu: false,
        page: true,
        border: true,
        column: [
          {
            label: "封面图片",
            prop: "img",
            solt: true,
            align: "center"
          },
          {
            label: "文章名称",
            prop: "title"
          },
          {
            label: "文章标签",
            prop: "tags",
            type: "dic",
            dicData: [{ label: "a", value: "a" }, { label: "b", value: "b" }]
          },
          {
            label: "发布人",
            prop: "publisher"
          },
          {
            label: "描述",
            prop: "desc"
          },
          {
            label: "创建时间",
            prop: "createTime",
            solt: true
          },
          {
            label: "修改时间",
            prop: "updateTime",
            solt: true
          },
          {
            label: "菜单",
            prop: "menu",
            solt: true,
            align: "center"
          }
        ]
      },

      // data list items
      stateArticleContentItemTypeArray: [
        {
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
          value: "videoUrl",
          label: "视频链接"
        }
      ],

      // data list items
      serviceArticleContentItemTypeArray: [
        {
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
          value: "videoUrl",
          label: "视频链接"
        }
      ]
    };
  },

  created() {
    this.getList(1);
  },

  watch: {
    dialogVisible: function(newValue, oldValue) {
      if (newValue === false) {
        this.serviceVisible = this.stateVisible = false;
      }
    }
  },

  methods: {
    preview: function(mainTag) {
      this.previewArticle.title = this.article.title;
      this.previewArticle.desc = this.article.desc;
      this.previewArticle.img = this.article.img;
      this.previewArticle.tags = this.article.tags;
      this.previewArticle.createTime = Date.now();
      this.previewArticle.updateTime = Date.now();
      this.previewArticle.data = this.articleContentTableData.map(item => {
        return {
          type: item.type,
          data: item.data
        };
      });

      switch (mainTag) {
        case "state":
          {
            this.previewStateVisible = true;
          }
          break;
        case "service":
          {
            this.previewServiceVisible = true;
          }
          break;
      }
    },
    articleOptFinish: function() {
      switch (this.articleOptType) {
        case "create":
          {
            this.commitCreateArticle();
          }
          break;
        case "update":
          {
            this.commitUpdateArticle();
          }
          break;
      }
    },
    commitCreateArticle() {
      this.$axios
        .post("/uploadArticle", {
          title: this.article.title,
          desc: this.article.desc,
          img: this.article.img,
          tags: this.article.tags,
          createTime: Date.now(),
          updateTime: Date.now(),
          data: this.articleContentTableData.map(item => {
            return {
              type: item.type,
              data: item.data
            };
          })
        })
        .then(({ code, data, msg }) => {
          if (code !== 0) {
            return this.$message.error(msg);
          }

          this.dialogVisible = false;

          //
          this.$message.success("创建成功");

          // get List
          this.getList(1);
        });
    },
    commitUpdateArticle() {
      this.$axios
        .post("/updateArticle", {
          filename: this.updatingFileName,
          title: this.article.title,
          desc: this.article.desc,
          img: this.article.img,
          tags: this.article.tags,
          createTime: this.article.createTime,
          updateTime: Date.now(),
          data: this.articleContentTableData.map(item => {
            return {
              type: item.type,
              data: item.data
            };
          })
        })
        .then(({ code, data, msg }) => {
          if (code !== 0) {
            return this.$message.error(msg);
          }

          this.dialogVisible = false;

          //
          this.$message.success("修改成功");

          // get List
          this.getList(1);
        });
    },
    updateArticle: function(index, row) {
      this.updatingFileName = row.filename;

      this.$axios
        .get("/getArticle", {
          filename: row.filename
        })
        .then(({ code, data, msg }) => {
          if (code !== 0) {
            return this.$message.error(msg);
          }

          // init article
          this.article = {
            title: data.title,
            desc: data.desc,
            img: data.img,
            tags: data.tags,
            createTime: data.createTime,
            updateTime: data.updateTime
          };

          // init data list
          this.articleContentTableData = data.data;

          // show
          this.dialogVisible = true;

          if (
            this.mainTableData[index].tags.find(tag => tag === "state")
          ) {
            this.stateVisible = true;
          } else {
            this.serviceVisible = true;
          }

          //
          this.articleOptType = "update";
        });
    },
    deleteArticle: function(row) {
      this.$axios
        .post("/delArticle", {
          filename: row.filename
        })
        .then(({ code, data, msg }) => {
          if (code !== 0) {
            return this.$message.error(msg);
          }

          this.getList(1);

          this.$message.success("delete success");
        });
    },
    showCreateService: function() {
      this.dialogVisible = true;

      this.serviceVisible = true;

      this.articleOptType = "create";
    },
    showCreateState: function() {
      this.dialogVisible = true;

      this.stateVisible = true;

      this.articleOptType = "create";
    },

    getList(page) {
      this.$axios
        .get("/getBreviaryArticleList", {
          page: page,
          pageNum: this.pagination.pageSize
        })
        .then(({ code, data, msg }) => {
          if (code !== 0) {
            return this.$message.error(msg);
          }

          this.mainTableData = data.data;
          this.pagination.total = data.total;
        })
        .finally(() => {});
    }
  },
  created() {
    this.getList(1);
  }
};
</script>

<style scoped>
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
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<style lang="scss" scoped>
img {
  cursor: pointer;
  transition: all 0.6s;
  &:hover {
    transform: scale(1.5);
  }
}
</style>