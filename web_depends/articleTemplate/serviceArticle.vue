<template>
  <div class="content">
    <slot></slot>
    <div class="title">
      <strong>{{previewArticle.title}}</strong>
    </div>

    <video :src="videoUrl" controls="controls" class="video">
      Your browser does not support the video tag.
    </video>

    <div style="width:80%;border-top: 1px solid #dcdfe6;border-bottom: 1px solid #dcdfe6;margin-top:80px;padding-top:80px;padding-bottom:80px;">
      <el-carousel :interval="4000" type="card">
        <el-carousel-item v-for="(img, index) in imgs" :key="index">
          <img v-if="img.type==='imgUpload'" style="width:100%" :src="`/getPhoto?filename=${img.data}`" />
          <img v-if="img.type==='imgUrl'" style="width:100%" :src="img.data" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="detail">
      <el-card shadow="always"  style="display:flex;width:100%;">
        <strong>详细信息</strong>
      </el-card>
    </div>
   
    <template v-for="(item, index) in detailData">
      <div class="text" :key="index">
        <p>&nbsp&nbsp&nbsp&nbsp{{item}}</p>
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

<style lang="scss" scoped>
@import './article.scss';

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
</style>

