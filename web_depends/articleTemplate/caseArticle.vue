<template>
  <div style="display:flex;flex-direction:column;align-items:center;width:100%">
    <slot></slot>
    <div style="fontSize:50px;border-bottom: 1px solid #dcdfe6;width:80%;padding:20px;">
      <strong>{{previewArticle.title}}</strong>
    </div>
    
    <video :src="videoUrl"  width="800px" height="600px" controls="controls">
      Your browser does not support the video tag.
    </video>

    <template v-for="(item, index) in detailData">
      <div style="display:flex;justify-
      :flex-start;width:80%;margin-top:20px;" :key="index">
        <span>{{item}}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      videoUrl: "",
      detailData: []
    }
  },

  created: function()
  {
    for(let ele of this.previewArticle.data)
    {
      if(ele.type === 'videoUrl')
      {
        this.videoUrl = ele.data;
      }
      else if(ele.type === 'text')
      {
        detailData.push(ele.data);
      }
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

