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
              <strong style="margin-right:10px;width:200px;text-align:center;">
                {{mainTagsMap[mainTag]}}
              </strong>

              <el-dropdown style="margin-right:10px;" trigger="click" @command="selectTag">
                <el-tag style="width:200px;" :disable-transitions="false">
                  {{allTagsMap[subTag]}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-tag>
                <el-dropdown-menu style="width:200px;" slot="dropdown">
                  <el-dropdown-item v-for="(val, key) in allTagsMap" :key="'dropDown_' + key" :command="key">{{val}}</el-dropdown-item>
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
      mainTagsMap: {
        state: "动态",
        service: "服务"
      },
      mainTag: "state",

      serviceTagsMap: {
        serviceBusiness: "商业活动",
        serviceShow: "文艺演出",
        serviceGallery: "数字展馆",
        serviceLight: "光影亮化",
        serviceImmerse: "沉浸空间",
        serviceInteract: "创意互动",
      },

      stateTagsMap: {
        stateCompany: "公司动态",
        stateIndustry: "行业动态"
      },

      allTagsMap: {
        serviceBusiness: "商业活动",
        serviceShow: "文艺演出",
        serviceGallery: "数字展馆",
        serviceLight: "光影亮化",
        serviceImmerse: "沉浸空间",
        serviceInteract: "创意互动",

        stateCompany: "公司动态",
        stateIndustry: "行业动态"
      },
      subTag: "serviceBusiness"
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
      if(this.serviceTagsMap[tag])
      {
        this.mainTag = 'service';
        this.subTag = tag;

        return false;
      }

      if(this.stateTagsMap[tag])
      {
        this.mainTag = 'state'
        this.subTag = tag;

        return false;
      }

      if(this.mainTagsMap[tag])
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
        if(this.serviceTagsMap[tag])
        {
          this.mainTag = 'service';
          this.subTag = tag;

          return false;
        }

        if(this.stateTagsMap[tag])
        {
          this.mainTag = 'state'
          this.subTag = tag;

          return false;
        }

        if(this.mainTagsMap[tag])
        {
          this.mainTag = tag;
          
          return false;
        }

        return true;
      })
    },

    subTag: function(newValue) {
      if(this.serviceTagsMap[newValue])
      {
        this.mainTag = 'service';
      }
      else
      {
        this.mainTag = 'state'
      }
    }
  },

  methods: {
    selectTag(tag)
    {
      this.subTag = tag;
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
      this.article.tags.push(this.subTag);

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