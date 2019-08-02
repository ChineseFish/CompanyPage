<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="80%" @close="closeDialog">
        <el-form label-width="60px">
          <el-form-item label="img">
            <div style="display:flex;justify-content:center;">
              <img v-show="article.img !== ''" :src="`/getBreviaryPhoto?width=100&height=100&filename=${article.img}`">
              <el-upload
                action="/uploadPhoto"
                :show-file-list="false"
                :on-success="uploadHeaderImgSuccess"
                :on-error="uploadHeaderImgError">
                  <el-button type="primary">上传封面图片</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="title">
              <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="desc">
              <el-input v-model="article.desc"></el-input>
          </el-form-item>
          <el-form-item label="tags">
            <div style="display:flex;justify-content:flex-start;">
              <el-dropdown style="margin-left:10px" trigger="click" @command="selectMainTag">
                <el-tag style="width:200px;" :disable-transitions="false">
                  {{mainTag}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-tag>
                <el-dropdown-menu style="width:200px;" slot="dropdown">
                  <el-dropdown-item command="state">动态</el-dropdown-item>
                  <el-dropdown-item command="service">服务</el-dropdown-item>
                  <el-dropdown-item command="case">案例</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-tag
                :key="tag"
                v-for="tag in article.tags"
                closable
                :disable-transitions="false"
                @close="closeTag(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="addTagVisible"
                v-model="addTagValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="addTag"
                @blur="addTag"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="editTag">+ New Tag</el-button>
            </div>
          </el-form-item>
          <slot name="content"></slot>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false;">取 消</el-button>
          <el-button type="primary" @click="articleOptFinish">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'articleDialog',
  data () {
    return {
      article: {
        title: "",
        desc: "",
        img: "",
        tags: []
      },

      addTagVisible: false,
      addTagValue: '',
      mainTag: "text"
    }
  },

  props: {
    title: {
      type: String,
      default: ""
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },

  created()
  {
    
  },

  methods: {
    closeDialog()
    {
      this.$emit('update:dialogVisible', this.dialogVisible);
    },

    articleOptFinish()
    {
      this.$emit('articleOptFinish', this.article)
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

    selectMainTag(tag)
    {
      this.mainTag = tag;
    },

    addTag() {
      let addTagValue = this.addTagValue;
      if (addTagValue) {
        this.article.tags.push(addTagValue);
      }
      this.addTagVisible = false;
      this.addTagValue = '';
    },

    editTag() {
      this.addTagVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    closeTag(tag) {
      this.article.tags.splice(this.article.tags.indexOf(tag), 1);
    }
  }
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