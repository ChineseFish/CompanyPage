<template>
  <div class='container'>
    <div class="aboutHeaderImg">
      <span>关于增强</span>
    </div>
    <div class="aboutPart1">
      <div class="aboutPart1-1">
        <strong class="aboutPart1-1-1">关于增强</strong>
        <p>&nbsp&nbsp&nbsp&nbsp倾影科技是中国智慧城市全息投影工程专家团队，致力于探索全息科技与空间展示的创新结合。</p>
        <p>&nbsp&nbsp&nbsp&nbsp倾影全息投影工程专家团队将全息投影、幻影成像、交互工程等前沿科技应用在不同场景的展示工程领域，与全国各地区展馆、景区、晚会、楼宇等创新项目皆有全息投影项目合作。
　　2018年倾影科技与沈阳市政府联合举办沈阳故宫“盛世皇城”3D墙体光影秀，成为能为盛京皇城故宫制作全息投影项目的首家企业。2019年为迎接北京2022年冬奥会，倾影科技为张家口大境门景区（中国万里长城第一门）制作裸眼3D全息墙体光影秀。
　　科技改变未来，倾影科技是迅速崛起的新科技企业，倾影以东北地区为基地，在全国设有分支机构，并不断扩大合作领域，招募各地区优质企业加盟。</p>
　　      <p>&nbsp&nbsp&nbsp&nbsp公司主要以全息视觉影像应用为主营业务，在北京、内蒙古、山东、陕西、广东设立分公司，全国战略合作15家，全国员工约1000人。目前公司全息视觉影像产品主要应用于展览展示、主题公园、主题餐厅、KTV、发布会、品牌活动、文化旅游等相关产业，在硬件开发，素材片源、互动融合系统方面拥有专业的技术团队，致力于为客户打造标新立异的视觉盛宴。</p>
      </div>

      <div class="aboutPart1-2">
        <img class="aboutPart1-2-1" src="../assets/imgs/about1.png">
        <img class="aboutPart1-2-2" src="../assets/imgs/about2.jpg">
      </div>
    </div>
    <div class="aboutPart2">
      <strong class="aboutPart2-1">公司优势</strong>
      <span class="aboutPart2-2">光影艺术沉浸空间先驱者</span>
      <div class="aboutPart2-3">

          <div class="aboutPart2-3-1">
            <img src="../assets/imgs/aboutIcon1.png" width="80px" height="80px">
            <strong class="aboutPart2-3-2">经验丰富</strong>
            <p>6年丰富行业经验，综合实力强</p>
          </div>

          <div class="aboutPart2-3-1">
            <img src="../assets/imgs/aboutIcon2.png" width="80px" height="80px">
            <strong class="aboutPart2-3-2">专业团队</strong>
            <p>专业资深设计、技术、工程团队，高效率团队</p>
          </div>

          <div class="aboutPart2-3-1">
            <img src="../assets/imgs/aboutIcon3.png" width="80px" height="80px">
            <strong class="aboutPart2-3-2">定制服务</strong>
            <p>主题素材丰富多样，定制化服务</p>
          </div>

          <div class="aboutPart2-3-1">
            <img src="../assets/imgs/aboutIcon4.png" width="80px" height="80px">
            <strong class="aboutPart2-3-2">解决方案</strong>
            <p>创意+设计+技术一体化科技服务公司，为客户提供优质解决方案</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about',
    data () {
      return {
        
      }
    }
  }
</script>

<style lang="scss" type scoped>
@import "./common.scss";

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
    width: 100%
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
  position:relative;
  margin-top:240px;
  left: 20px;
  @media screen and (max-width: 480px) {
    width: 50%;
    margin-top: 120px;
    left: 10px;
  }
}

.aboutPart1-2-2 {
  position:relative;
  margin-bottom:240px;
  @media screen and (max-width: 480px) {
    width: 50%;
    margin-bottom:120px;
  }
}

.aboutPart2 {
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-color: rgba(242, 242, 242, 1);
  margin-top:100px;
  @media screen and (max-width: 480px) {
    margin-top: 50px;
  }
}

.aboutPart2-1 {
  font-size:40px;
  padding:40px;
  @media screen and (max-width: 480px) {
    font-size: 25px;
    padding: 20px;
  }
}

.aboutPart2-2 {
  padding:40px;

  @media screen and (max-width: 480px) {
    padding:10px;
  }
}

.aboutPart2-3 {
  width:80%;
  padding:20px;
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
  padding:20px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: flex-start;
  width: 400px;
  height: 100%;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
}

.aboutPart2-3-2 {
  margin-top:20px;
  
  @media screen and (max-width: 480px) {
    margin-top: 10px;
  }
}
</style>
