<template>
  <div>
    <div style="display:flex;margin-top:10px;margin-bottom:10px;">
      <el-select v-model="addArticleContentItemType" style="width:100%;margin-right:10px;">
        <el-option v-for="(value, index) in articleContentItemTypeArray" :key="index" :value="value.value" :label="value.label"></el-option>
      </el-select>
      <el-button type="primary" @click="addArticleContentItem()">新增</el-button>
    </div>
    <avue-crud ref="crud" :data="articleContentTableData" :option="articleContentTableOption">
      <template slot-scope="scope" slot="data">
        <el-input v-model="articleContentTableData[scope.row.$index].data"></el-input>
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
            <el-button style="margin-right:10px;" type="primary">上传图片</el-button>
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
      
      articleContentTableData: [],
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
        ]
      }
    }
  },

  props: {
    articleContentItemTypeArray: []
  },

  methods: {
    uploadArticleContentImgSuccess({ code, data })
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
    addArticleContentItem()
    {
      this.articleContentTableData.push({
        type: this.addArticleContentItemType,
        data: ''
      });
    },
    addArticleContentItemUp(row)
    {
      this.articleContentTableData.splice(row.$index, 0, {
        type: this.addArticleContentItemType,
        data: ''
      });
    },
    addArticleContentItemNext(row)
    {
      this.articleContentTableData.splice(row.$index + 1, 0, {
        type: this.addArticleContentItemType,
        data: ''
      });
    },
    deleteArticleContentItem(row)
    {
      this.articleContentTableData.splice(row.$index, 1)
    }
  }
}
</script>

