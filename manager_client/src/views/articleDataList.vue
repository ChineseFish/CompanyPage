<template>
  <div>
    <div style="display:flex;margin-top:10px;margin-bottom:10px;">
      <el-select v-model="addArticleContentItemType" style="width:100%;margin-right:10px;">
        <el-option v-for="(value, index) in articleContentItemTypeArray" :key="index" :value="value.value" :label="value.label"></el-option>
      </el-select>
      <el-button type="primary" @click="addArticleContentItem()">新增</el-button>
    </div>
    <avue-crud :data="articleContentTableData" :option="articleContentTableOption">
      <template slot-scope="scope" slot="data">
        <!-- 服务器上面的图片，不支持修改 -->
        <img v-if="scope.row.type === 'imgUpload' && scope.row.data !== ''" :src="`/getBreviaryPhoto?width=100&height=100&filename=${scope.row.data}`">
        <!-- 支持修改的内容 -->
        <el-input 
        :ref="'inputData' + scope.row.$index"
        v-if="scope.row.ifEditing" 
        v-model="articleContentTableData[scope.row.$index].data"
        @keyup.enter.native="scope.row.ifEditing=false"
        @blur="scope.row.ifEditing=false"></el-input>
        <div v-if="!scope.row.ifEditing">
          <!-- 图片链接 -->
          <img v-if="scope.row.type === 'imgUrl'" :src="scope.row.data">
          <!-- 视频链接 -->
          <video v-if="scope.row.type === 'vedioUrl'" :src="scope.row.data"  width="320" height="240" controls="controls">
            Your browser does not support the video tag.
          </video>
          <!-- 普通文字 -->
          <span v-if="scope.row.type === 'text'">{{scope.row.data}}</span>  
        </div>
      </template>
      <template slot-scope="scope" slot="menu">
        <div style="display:flex;width:600px;">
          <div style="display:flex;">
            <el-button
              style="margin-right:10px;"
              type="primary"
              @click="addArticleContentItemUp(scope.row)"
            >往前插入</el-button>
            <el-button
              style="margin-right:10px;"
              type="primary"
              @click="addArticleContentItemNext(scope.row)"
            >往后插入</el-button>
          </div>
          <el-button
            type="primary"
            style="margin-right:10px;"
            @click="editArticleContentItem(scope.row)"
            v-if="scope.row.type !== 'imgUpload'"
          >修改</el-button>
          <el-upload
            action="/uploadPhoto"
            :show-file-list="false"
            :on-success="uploadArticleContentImgSuccess"
            :on-error="uploadArticleContentImgError"
            v-if="scope.row.type==='imgUpload'"
          >
            <el-button style="margin-right:10px;" type="primary" @click="uploadingImgIndex=scope.row.$index">上传图片</el-button>
          </el-upload>
          <el-button
            style="margin-right:10px;"
            type="primary"
            @click="deleteArticleContentItem(scope.row)"
          >删除</el-button>
        </div>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import mixins from '../mixins/index.js';

export default {
  name: "dataList",
  mixins: [mixins],
  data() {
    return {
      addArticleContentItemType: "",
      
      articleContentTableOption: {
        header: false,
        menu: false,
        page: false,
        border: true,
        column: [
          {
            label: '类型',
            prop: 'type'
          }, {
            label: '内容',
            prop: 'data',
            solt: true
          }, {
            label: '菜单',
            prop: 'menu',
            solt: true,
            align: 'center'
          },
        ],

        uploadingImgIndex: 0
      }
    }
  },

  props: {
    articleContentTableData: {
      type: Array,
      default: []
    },
    articleContentItemTypeArray: {
      type: Array,
      default: []
    }
  },

  watch: {
    articleContentTableData: {
      handler: function(newValue, oldValue)
      {
        this.$emit("update:articleContentTableData", this.articleContentTableData)
      },
      deep: true
    }
  },

  created: function () {
    for(let ele of this.articleContentTableData)
    {
      ele.ifEditing = false;
    }
  },

  methods: {
    uploadArticleContentImgSuccess({ code, data, msg })
    {
      if (code !== 0) {
        this.$message.error(`upload article content img failed, ${msg}`)

        if(code === 7)
        {
          return this.$router.push({ path: '/login' })
        }
      }
      
      this.articleContentTableData[this.uploadingImgIndex].data = data;

      this.$message.success('upload success')
    },
    uploadArticleContentImgError()
    {
      this.$message.error(`upload article content failed, ${err}`);
    },
    addArticleContentItem()
    {
      this.articleContentTableData.push({
        type: this.addArticleContentItemType,
        data: '',
        ifEditing: this.addArticleContentItemType === 'imgUpload' ? false : true
      });

      if(this.addArticleContentItemType !== 'imgUpload')
      {
        (async () => {
          let input = this.$refs[`inputData${this.articleContentTableData.length - 1}`]
          while(input === undefined || input === null)
          {
            await new Promise(resolve => {
              setTimeout(() => {
                input = this.$refs[`inputData${this.articleContentTableData.length - 1}`];

                resolve();
              })
            })
          }
        })();
      }
    },
    addArticleContentItemUp(row)
    {
      this.articleContentTableData.splice(row.$index, 0, {
        type: this.addArticleContentItemType,
        data: '',
        ifEditing: this.addArticleContentItemType === 'imgUpload' ? false : true
      });
    },
    addArticleContentItemNext(row)
    {
      this.articleContentTableData.splice(row.$index + 1, 0, {
        type: this.addArticleContentItemType,
        data: '',
        ifEditing: this.addArticleContentItemType === 'imgUpload' ? false : true
      });
    },
    deleteArticleContentItem(row)
    {
      this.articleContentTableData.splice(row.$index, 1)
    },
    editArticleContentItem(row)
    {
      this.articleContentTableData[row.$index].ifEditing = true;
    }
  }
}
</script>


