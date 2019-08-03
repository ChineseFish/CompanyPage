<template>
  <div style="display:flex;flex-direction:column;align-items:center;width:100%">
    <slot></slot>
    <div style="fontSize:50px;border-bottom: 1px solid #dcdfe6;width:80%;padding:20px;">
      <strong>{{previewArticle.title}}</strong>
    </div>
    <div style="display:flex;justify-content:flex-start;margin-top:20px;margin-bottom:20px;width:50%;">
      <span>摘要</span><strong>{{previewArticle.desc}}</strong>
    </div>
    
    <img style="width:80%;margin-top:20px;" :src="`/getPhoto?filename=${previewArticle.img}`">
    <template v-for="(item, index) in previewArticle.data">
      <div style="display:flex;justify-
      :flex-start;width:80%;margin-top:20px;" v-if="item.type === 'text'" :key="index">
        <span>{{item.data}}</span>
      </div>
      <div v-if="item.type === 'imgUpload'" :key="index">
        <img style="width:80%;margin-top:20px;" :src="`/getPhoto?filename=${item.data}`">
      </div>
      <div v-if="item.type === 'imgUrl'" :key="index">
        <img style="width:80%;margin-top:20px;" :src="item.data">
      </div>
      <div v-if="item.type === 'videoUrl'" :key="index">
        <video :src="item.data"  width="800px" height="600px" controls="controls">
          Your browser does not support the video tag.
        </video>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "stateArticle",
  data: function () {
    return {

    }
  },

  props: {
    previewVisible: {
      type: Boolean,
      default: false
    },

    previewArticle: {
      title: "",
      desc: "",
      img: "",
      tags: [],
      createTime: 0,
      updateTime: 0,
      data: []
    }
  }
}
</script>

<style scoped>
div{
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  font-size: 22px;
  color: #909399;
  font-weight: 400;
  line-height: 2em;
  word-break: break-all; /*支持IE，chrome，FF不支持*/
  word-wrap: break-word;/*支持IE，chrome，FF*/
  overflow: hidden;
}
</style>

