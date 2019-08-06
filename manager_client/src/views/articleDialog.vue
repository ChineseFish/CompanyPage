<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="80%" @close="closeDialog">
        <el-form label-width="60px">
          <el-form-item label="img">
            <div style="display:flex;justify-content:center;">
              <img style="width=200px;height:200px;" v-show="article.img !== ''" :src="`/getPhoto?filename=${article.img}`">
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
            <div style="display:flex;justify-content:flex-start;align-items:center;">
              <el-dropdown style="margin-right:10px;" trigger="click" @command="selectMainTag">
                <el-tag style="width:200px;" :disable-transitions="false">
                  {{tagsMap[mainTag]}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-tag>
                <el-dropdown-menu style="width:200px;" slot="dropdown">
                  <el-dropdown-item v-for="(val, key) in tagsMap" :key="'dropDown_' + key" :command="key">{{val}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown v-if="mainTag === 'service'" style="margin-right:10px;" trigger="click" @command="selectServiceSubTag">
                <el-tag style="width:200px;" :disable-transitions="false">
                  {{serviceTagsMap[serviceSubTag]}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-tag>
                <el-dropdown-menu style="width:200px;" slot="dropdown">
                  <el-dropdown-item v-for="(val, key) in serviceTagsMap" :key="'dropDown_' + key" :command="key">{{val}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown v-else style="margin-right:10px;" trigger="click" @command="selectStateSubTag">
                <el-tag style="width:200px;" :disable-transitions="false">
                  {{stateTagsMap[stateSubTag]}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-tag>
                <el-dropdown-menu style="width:200px;" slot="dropdown">
                  <el-dropdown-item v-for="(val, key) in stateTagsMap" :key="'dropDown_' + key" :command="key">{{val}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-tag
                style="margin-right:10px;"
                :key="index"
                v-for="(tag, index) in article.tags"
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
          <el-button type="primary" @click="preview">预 览</el-button>
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
      // if open add tag
      addTagVisible: false,
      addTagValue: '',
      
      // tags map
      tagsMap: {
        state: "动态",
        service: "服务"
      },
      mainTag: "state",

      serviceTagsMap: {
        one: "测试1",
        two: "测试1"
      },
      serviceSubTag: "one",

      stateTagsMap: {
        one: "测试2",
        two: "测试2"
      },
      stateSubTag: "one",
    }
  },

  props: {
    dialogTitle: {
      type: String,
      default: ""
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    article: {
      title: "",
      desc: "",
      img: "",
      tags: []
    }
  },

  created()
  {
    // handle tags
    this.article.tags = this.article.tags.filter(tag => {
      if(this.tagsMap[tag])
      {
        this.mainTag = tag;

        return false;
      }

      return true;
    })
  },

  watch: {
    article: {
      handler: function (newValue, oldValue) {
        this.$emit('update:article', this.article);
      },
      deep: true
    },

    dialogVisible: function(newValue, oldValue) {
      if(newValue === false)
      {
        return;
      }

      // handle tags
      this.article.tags = this.article.tags.filter(tag => {
        if(this.tagsMap[tag])
        {
          this.mainTag = tag;

          return false;
        }

        return true;
      })
    }
  },

  methods: {
    selectServiceSubTag()
    {

    },
    selectStateSubTag()
    {

    },
    preview()
    {
      this.$emit("preview", this.mainTag);
    },
    closeDialog()
    {
      this.$emit('update:dialogVisible', this.dialogVisible);
    },

    articleOptFinish()
    {
      // record mainTag
      this.article.tags.push(this.mainTag);

      this.$emit('articleOptFinish')
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

<style lang="scss" scoped>
img {
  cursor: pointer;
  transition: all 0.6s;
  &:hover {
    transform: scale(1.5);
  }
}

</style>