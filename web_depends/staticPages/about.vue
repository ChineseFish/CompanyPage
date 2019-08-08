<template>
  <div class="container">
    <div class="aboutHeaderImg">
      <p>关于增强</p>
      <span class="staticHeaderHeader1">ABOUT US</span>
      <scroll-to-read></scroll-to-read>
    </div>
    <div style="display:flex;justify-content:center;">
      <div class="numberShow">
        <div class="numberShow1">
          <p class="numberShow1-1">{{number1}}</p>
          <span class="numberShow1-2">家</span>
        </div>
        <p class="numberShow2">分公司</p>
      </div>

      <div class="numberShow">
        <div class="numberShow1">
          <p class="numberShow1-1">{{number2}}</p>
          <span class="numberShow1-2">+</span>
        </div>
        <p class="numberShow2">加盟商</p>
      </div>

      <div class="numberShow" >
        <div class="numberShow1">
          <p class="numberShow1-1">{{number3}}</p>
          <span class="numberShow1-2">+</span>
        </div>
        <p class="numberShow2">拥有1000+公司员工</p>
      </div>

      <div class="numberShow">
        <div class="numberShow1">
          <p class="numberShow1-1">{{number4}}</p>
          <span class="numberShow1-2">+</span>
        </div>
        <p class="numberShow2">服务客户5000+</p>
      </div>

      <div class="numberShow">
        <div class="numberShow1">
          <p class="numberShow1-1">{{number5}}</p>
          <span class="numberShow1-2">千万+</span>
        </div>
        <p class="numberShow2">创造5千万+效益</p>
      </div>
    </div>
    <div class="aboutPart1">
      <div class="aboutPart1-1">
        <strong class="aboutPart1-1-1">关于增强</strong>
        <p>&nbsp&nbsp&nbsp&nbsp增强网络科技是中国智慧城市全息投影工程专家团队，致力于探索全息科技与空间展示的创新结合。</p>
        <p>
          &nbsp&nbsp&nbsp&nbsp增强网络全息投影工程专家团队将全息投影、幻影成像、交互工程等前沿科技应用在不同场景的展示工程领域，与全国各地区展馆、景区、晚会、楼宇等创新项目皆有全息投影项目合作。
          2018年增强网络科技与沈阳市政府联合举办沈阳故宫“盛世皇城”3D墙体光影秀，成为能为盛京皇城故宫制作全息投影项目的首家企业。2019年为迎接北京2022年冬奥会，增强网络科技为张家口大境门景区（中国万里长城第一门）制作裸眼3D全息墙体光影秀。
          科技改变未来，增强网络科技是迅速崛起的新科技企业，增强网络以东北地区为基地，在全国设有分支机构，并不断扩大合作领域，招募各地区优质企业加盟。
        </p>
        <p>&nbsp&nbsp&nbsp&nbsp公司主要以全息视觉影像应用为主营业务，在北京、内蒙古、山东、陕西、广东设立分公司，全国战略合作15家，全国员工约1000人。目前公司全息视觉影像产品主要应用于展览展示、主题公园、主题餐厅、KTV、发布会、品牌活动、文化旅游等相关产业，在硬件开发，素材片源、互动融合系统方面拥有专业的技术团队，致力于为客户打造标新立异的视觉盛宴。</p>
      </div>

      <div class="aboutPart1-2">
        <img class="aboutPart1-2-1" src="../assets/imgs/about1.png" />
        <img class="aboutPart1-2-2" src="../assets/imgs/about2.jpg" />
      </div>
    </div>
    <div class="aboutPart2">
      <strong class="aboutPart2-1">公司优势</strong>
      <span class="aboutPart2-2">光影艺术沉浸空间先驱者</span>
      <div class="aboutPart2-3">
        <div class="aboutPart2-3-1">
          <img src="../assets/imgs/aboutIcon1.png" width="80px" height="80px" />
          <strong class="aboutPart2-3-2">经验丰富</strong>
          <p>6年丰富行业经验，综合实力强</p>
        </div>

        <div class="aboutPart2-3-1">
          <img src="../assets/imgs/aboutIcon2.png" width="80px" height="80px" />
          <strong class="aboutPart2-3-2">专业团队</strong>
          <p>专业资深设计、技术、工程团队，高效率团队</p>
        </div>

        <div class="aboutPart2-3-1">
          <img src="../assets/imgs/aboutIcon3.png" width="80px" height="80px" />
          <strong class="aboutPart2-3-2">定制服务</strong>
          <p>主题素材丰富多样，定制化服务</p>
        </div>

        <div class="aboutPart2-3-1">
          <img src="../assets/imgs/aboutIcon4.png" width="80px" height="80px" />
          <strong class="aboutPart2-3-2">解决方案</strong>
          <p>创意+设计+技术一体化科技服务公司，为客户提供优质解决方案</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scrollToRead from "./scrollToRead.vue";
export default {
  name: "about",
  components: { scrollToRead },
  data() {
    return {
      tweenedNumber1: 0,
      tweenedNumber2: 0,
      tweenedNumber3: 0,
      tweenedNumber4: 0,
      tweenedNumber5: 0
    };
  },

  computed: {
    number1: function() {
      return this.tweenedNumber1.toFixed(0);
    },
    number2: function() {
      return this.tweenedNumber2.toFixed(0);
    },
    number3: function() {
      return this.tweenedNumber3.toFixed(0);
    },
    number4: function() {
      return this.tweenedNumber4.toFixed(0);
    },
    number5: function() {
      return this.tweenedNumber5.toFixed(0);
    }
  },

  mounted: function() {
    TweenLite.to(this.$data, 2, { tweenedNumber1: 5 });
    TweenLite.to(this.$data, 2, { tweenedNumber2: 30 });
    TweenLite.to(this.$data, 2, { tweenedNumber3: 1000 });
    TweenLite.to(this.$data, 2, { tweenedNumber4: 5000 });
    TweenLite.to(this.$data, 2, { tweenedNumber5: 5 });
  }
};
</script>

<style lang="scss" type scoped>
@import "./common.scss";

.numberShow {
  display:flex;
  flex-direction:column;
  width: 100%;
  justify-content: space-around;
  color: #292929;
  font-family: Arial,"黑体";

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
}

.numberShow1 {
  display:flex;

  @media screen and (max-width: 480px) {
    margin-bottom:2px;
  }
}

.numberShow1-1 {
  font-family: Impact;
  display:flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 2px;
  color: #292929;
  @media screen and (max-width: 480px) {
    margin-top: 10px;
    font-size: 25px;
    font-weight: 400;
    margin-bottom:5px;
  }
}

.numberShow1-2 {
  display:flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #292929;
  
  @media screen and (max-width: 480px) {
    font-weight: 400;
    font-size: 12px;
    margin-top: 10px;
    transform: scale(0.8, 0.8);
  }
}

.numberShow2 {
  @media screen and (max-width: 480px) {
    font-size:12px;
    transform: scale(0.75, 0.75);
  }
}

.aboutPart1 {
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-top: 100px;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    width: 95%;
    margin-top: 50px;
  }
}

.aboutPart1-1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 50%;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
}

.aboutPart1-1-1 {
  font-size: 40px;
  margin-bottom: 100px;
  @media screen and (max-width: 480px) {
    font-size: 25px;
    margin-bottom: 30px;
  }
}

.aboutPart1-2 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  @media screen and (max-width: 480px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
}

.aboutPart1-2-1 {
  position: relative;
  margin-top: 240px;
  left: 20px;
  @media screen and (max-width: 480px) {
    width: 50%;
    margin-top: 120px;
    left: 10px;
  }
}

.aboutPart1-2-2 {
  position: relative;
  margin-bottom: 240px;
  @media screen and (max-width: 480px) {
    width: 50%;
    margin-bottom: 120px;
  }
}

.aboutPart2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(242, 242, 242, 1);
  margin-top: 100px;
  @media screen and (max-width: 480px) {
    margin-top: 50px;
  }
}

.aboutPart2-1 {
  font-size: 40px;
  padding: 40px;
  @media screen and (max-width: 480px) {
    font-size: 25px;
    padding: 20px;
  }
}

.aboutPart2-2 {
  padding: 40px;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
}

.aboutPart2-3 {
  width: 80%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media screen and (max-width: 480px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.aboutPart2-3-1 {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 400px;
  height: 100%;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
}

.aboutPart2-3-2 {
  margin-top: 20px;

  @media screen and (max-width: 480px) {
    margin-top: 10px;
  }
}
</style>
