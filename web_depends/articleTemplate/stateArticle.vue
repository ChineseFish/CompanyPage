<template>
  <div style="display:flex;flex-direction:column;align-items:center;">
    <slot></slot>
    <strong>{{previewArticle.title}}</strong>
    <strong>{{new Date(previewArticle.createTime).Format("yyyy-MM-dd hh:mm")}}</strong>
    <strong>{{new Date(previewArticle.updateTime).Format("yyyy-MM-dd hh:mm")}}</strong>
    <strong>{{previewArticle.desc}}</strong>
    <strong>{{previewArticle.tags}}</strong>
    <img style="width:50%;margin-top:20px;margin-bottom:20px;" :src="`/getPhoto?filename=${previewArticle.img}`">
    <template v-for="(item, index) in previewArticle.data">
      <div v-if="item.type === 'text'" :key="index">
        <span>{{item.data}}</span>
      </div>
      <div v-if="item.type === 'imgUpload'" :key="index">
        <img style="width:50%;margin-top:20px;margin-bottom:20px;" :src="`/getPhoto?filename=${item.data}`">
      </div>
      <div v-if="item.type === 'imgUrl'" :key="index">
        <img style="width:50%;margin-top:20px;margin-bottom:20px;" :src="item.data">
      </div>
      <div v-if="item.type === 'videoUrl'" :key="index">
        <video :src="item.data"  width="50%" height="50%" controls="controls">
          Your browser does not support the video tag.
        </video>
      </div>
    </template>
  </div>
</template>

<script>
export default {
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

<style>

</style>

