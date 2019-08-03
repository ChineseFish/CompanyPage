<template>
  <div style="display:flex;flex-direction:column;align-items:center;width:100%">
    <slot></slot>
    <div style="fontSize:50px;border-bottom: 1px solid #dcdfe6;width:80%;padding:20px;">
      <strong>{{previewArticle.title}}</strong>
    </div>

    <div style="margin-top:20px;margin-bottom:20px;border-bottom: 1px solid #dcdfe6;width:80%;padding:20px;">
      <video :src="videoUrl" controls="controls">
        Your browser does not support the video tag.
      </video>
    </div>
    
    <div style="width:50%;border-bottom: 1px solid #dcdfe6;padding:20px;">
      <el-carousel :interval="4000" type="card" width="100%">
        <el-carousel-item v-for="(img, index) in imgs" :key="index">
          <img v-if="img.type==='imgUpload'" style :src="`/getPhoto?filename=${img.data}`" />
          <img v-if="img.type==='imgUrl'" style :src="img.data" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div style="display:flex;justify-content:flex-start;width:80%;font-size:40px;margin-bottom:20px">
      <strong>详细信息</strong>
    </div>

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
  data: function() {
    return {
      videoUrl: "",
      imgs: [],
      detailData: []
    };
  },

  created: function() {
    for (let ele of this.previewArticle.data) {
      if(ele.type === 'videoUrl')
      {
        this.videoUrl = ele.data;
      }
      else if ((ele.type === "imgUrl") | (ele.type === "imgUpload")) {
        this.imgs.push(ele);
      } else if (ele.type === "text") {
        this.detailData.push(ele.data);
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
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

div {
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  font-size: 22px;
  color: #909399;
  font-weight: 400;
  line-height: 2em;
  word-break: break-all; /*支持IE，chrome，FF不支持*/
  word-wrap: break-word; /*支持IE，chrome，FF*/
  overflow: hidden;
}
</style>

