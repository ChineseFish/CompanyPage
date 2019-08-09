<template>
  <div class='container'>
    <div class="joinUsHeaderImg">
      <span>招商加盟</span>
      <span class="staticHeaderHeader1">JOIN US</span>
      <scroll-to-read></scroll-to-read>
    </div>

    <div class="joinUsPart1">
      <div class="joinUsPart1-1">
        <div class="joinUsPart1-1-1">
          <strong>市场前景</strong>
          <p>市场潜力大，发展空间大，作为多媒体视觉创新行业，竞争力小，潜力无限，硬件设备条件优越，随着人们生活水平的提高，创新、视觉、艺术、科技等精神需求逐年提高。</p>
        </div>
      </div>
    </div>
    <img class="joinUsCircle" src="../assets/imgs/joinUs2.png" alt="" title="">
    <div class="joinUsPart2">
      <div class="joinUsPart2-1">
        <div v-for="(ele, index) in advantagesLeft" :key="index" class="joinUsPart2-1-1">
          <strong>{{ele.title}}</strong>
          <p>{{ele.data}}</p>
        </div>
      </div>
      <img src="../assets/imgs/joinUs3.png" class="longChain" alt="" title="">
      <div class="joinUsPart2-2">
        <div v-for="(ele, index) in advantagesRight" :key="index" class="joinUsPart2-2-1">
          <strong>{{ele.title}}</strong>
          <p>{{ele.data}}</p>
        </div>
      </div>
    </div>
    <div class="joinUsPart3">
      <div class="joinUsPart3-1">
        <div class="joinUsPart3-1-1">
           <p style="color:white;">扶持计划</p>
        </div>
        <div class="joinUsPart3-1-2">
          <strong>加盟热线：</strong>
          <p>400-0988850</p>
        </div>
      </div>
     
      <div class="joinUsPart3-2">
        <div v-for="(ele, index) in supports" :key="index">
          <strong>{{ele.title}}</strong>
          <p>{{ele.data}}</p>
        </div>
      </div>
    </div>
    
    <div class="joinUsPart4">
      <div class="joinUsPart4-1">
        <div class="joinUsPart4-1-1">
          <div style="display:flex;align-items:flex-start;">
            <img src="../assets/imgs/joinUs4-1.png">
            <strong style="margin:10px;">售后服务</strong>
          </div>
          <p v-for="(el, index) in joinFlow[0]" :key="index">{{el}}</p>
        </div>
        <div class="joinUsPart4-1-2">
          <img class="img" src="../assets/imgs/joinUs4.jpg">
        </div>
      </div>

      <div class="joinUsPart4-1">
        <div class="joinUsPart4-1-1">
          <img class="img" src="../assets/imgs/joinUs5.jpg">
        </div>
        <div class="joinUsPart4-1-2">
          <div style="display:flex;flex-direction:column;">
            <div style="display:flex;justify-content:flex-start;align-items:flex-start;">
              <img src="../assets/imgs/joinUs5-1.png">
              <strong style="margin:10px;">加盟流程</strong>
            </div>
            <p v-for="(el, index) in joinFlow[1]" :key="index">{{el}}</p>
          </div>
        </div>
      </div>

      <div class="joinUsPart4-1">
        <div class="joinUsPart4-1-1">
          <div style="display:flex;align-items:flex-start;">
            <img src="../assets/imgs/joinUs6-1.png">
            <strong style="margin:10px;">加盟条件</strong>
          </div>
          <p v-for="(el, index) in joinFlow[2]" :key="index">{{el}}</p>
        </div>
        <div class="joinUsPart4-1-2">
          <img class="img" src="../assets/imgs/joinUs6.jpg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scrollToRead from "./scrollToRead.vue"

  export default {
    name: 'joinus',
    components: { scrollToRead },
    data () {
      return {
        joinFlow: [
            [
              "1.我公司指派经验丰富、高技术水平的技术人员到现场提供免费技术服务，负责安装、调试和培训，直到学会为止。",
              "2.机器设备在非人为损坏情况下，我方技术人员在30分钟内给予回复，48小时内到达甲方所在地进行免费维修。",
              "3.维修完毕后及时填写维修报告，维修报告应包括故障原因、处理情况及用户意见，维修报告由双方各持一份备案。",
              "4.我公司会对产品的工作状况进行不定期巡查检修。",
              "5.我们还将提供跟踪服务，即定时进行随访或电话跟踪，针对用户在使用过程中发现的各种问题，及时给予解决，避免问题的进一步恶化。"
            ],

            [
              "初步洽谈----电话咨询申请合作",
              "审核----审核意向公司资历和条件",
              "洽谈----双方就具体合作细节商议和决定",
              "签约----双方意见达成一致后，签订合作合同",
              "启动----增强网络科技助力您定制、推广",
              "培训----人员技术培训，产品使用培训，合作模式培训",
              "开业----选址、展厅搭建、开业支持"
            ],

            [
              "办公场所面积需在40平米以上",
              "创意、艺术、科技等相关行业从业者，热衷于创意科技行业",
              "强烈的事业心，有较强品牌意识与长远发展眼光",
              "有一定资金投入能力及风险承担能力",
              "认同增强网络科技的经营模式与经营思路"
            ]
          ],
          supports: [
            {
              title: "一、展厅搭建：",
              data: "以洞察与体验为核心出发，从整体概念设计为整体考虑，延伸至数字展厅设计、业务内容交互展示设计及制作、展厅中央集成控制、网络解决方案到方案实施，为加盟商提供全方位服务，帮客户解决综合展示、服务资源整合困难等问题。"
            },
            {
              title: "二、设备租赁：",
              data: "增强网络科技采用激光工程投影机的发明者和领导者、智能激光投影系统全球第一品牌——AVANZA激光工程投影机。其产品已用于全球一百多个项目，涵盖了VR/AR、展览展示、指挥控制、会议培训、广电电信、剧院影院等各种行业应用，其第一个项目已连续无故障运营近20000个小时。"
            },
            {
              title: "三、开业扶持：",
              data: "开业初期，公司委派经验丰富的区域经理与高水平技术人员，他们将根据当地实际情况帮助加盟商进行运营指导和技术培训，使加盟商能顺利的开展工作。（具体包括销售指导，网络营销指导，技术培训等）"
            },
            {
              title: "四、品牌支持：",
              data: "总公司对加盟商提供永久性的品牌支持，总公司所有优质案例及其他子公司和加盟商优质案例，加盟商均有使用权利。"
            },
            {
              title: "五、销售支持：",
              data: "公司将与加盟商一道根据当地市场情况，制定促销计划，且体验店开业的第一次促销活动，总部将提前委派区域经理、区域讲师参加促销活动，并酌情为体验店顾客携带相应礼品。"
            },
            {
              title: "六、定期培训：",
              data: "除了对加盟商提供永久性的品牌支持外，还将定期对加盟商进行再培训学习，向他们传授最新开发的产品卖点、最新的体验营销的新技术、新理念。"
            },
            {
              title: "七、定期交流：",
              data: "公司将召开不定期的加盟商会议、运营交流会，交流先进经验，使加盟商体系更紧密、更牢固、更具市场竞争力。"
            },
            {
              title: "八、广告推动：",
              data: "为了扩大市场的品牌知名度，同时也为了促进加盟商的销售运营，我公司将长期以网络、电视等多种方式进行宣传，将不断强化品牌宣传力度，让品牌进一步做到家喻户晓，并树立良好的品牌形象。"
            },
            {
              title: "九、素材支持：",
              data: "我司将免费赠送一套全息影像素材（私人订制则另收费用）。"
            },
            {
              title: "十、激励支持：",
              data: "加盟商在完成销售任务的前提下，根据销售标准公司给予相应的奖励，使加盟商能够伴随总公司一起成长，达到合作共赢的企业理念。"
            },
            {
              title: "十一、潜在客户支持：",
              data: "加盟商所在区域总公司不定期提供潜在客户分配，全力协助加盟商开展业务，进一步提升加盟商业绩，与总公司达成共赢的合作模式。"
            }
          ],

          advantagesLeft: [
            {
              title: '素材层面优势：',
              data: '我公司素材制作团队技术过硬，同时有创意，有想法，所制作的画面意境十足。'
            },
            {
              title: '管理层面优势：',
              data: '公司有完整的运营管理系统、完善的加盟标准化体系，能手把手为加盟商提供从技术学习、开业活动、销售宣传、运营管理、人员培训、经营分析等一系列的服务，帮助加盟商轻松实现系统化管理、盈利式销售。'
            },
            {
              title: '激励机制优势：',
              data: '加盟商在完成约定的销售指标任务后，公司会按标准给予加盟商相应的奖励，促进加盟商与公司共赢，提高服务质量，提升影响力。'
            },
            {
              title: '空间场地优势：',
              data: '我公司是技术型公司，不受场地、空间影响，无论您有无店面、公司或场所，只要您加盟，总公司即提供技术支持，总公司的客户可分配就近加盟商负责。'
            }
          ],
          advantagesRight: [
          {
            title: '技术层面优势：',
            data: '技术层面全面超越目前所有市场上的全息供应商。我们的软件调试简单，播放流畅，可视操作，无缝切换。'
          },
          {
            title: '执行服务优势：',
            data: '我公司可根据客户需求，帮客户定制方案，搭配素材，规划舞台方案，灯光舞美完美配合。'
          },
          {
            title: '品牌影响力优势：',
            data: '我公司设有专业化的品牌宣传团队，借助传统媒介及新型平台进行品牌推广活动，自有品牌战略，优势集中，通过线上、线下的多样化宣传，增强品牌认知度，更具市场渗透力。'
          },
          {
            title: '发展前景优势：',
            data: '我公司是东北地区首家创办以全息投影为主的科技公司，发展空间大，竞争力小，有着优越的硬件设备条件，发展前景一片大好。'
          },
          {
            title: '附加值的优势：',
            data: '我公司所开发的一系列应用软件，都会对加盟商免费授权，不另外收取费用，其中所涉及硬件，加盟商按照我公司提供的要求自行购买。如地面互动软件，体感互动软件。'
          }
        ],
      }
    }
  }
</script>

<style lang="scss" type scoped>
@import "./common.scss";

.joinUsPart1 {
  position: relative;
  z-index: -1;
  width:80%;
  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  top: 80px;

  @media screen and (max-width: 480px) {
    width:100%;
    top: 20px;
  }
}

.joinUsPart1-1 {
  display:flex;
  justify-content: flex-end;
  margin-top: 20px;
  background-image:url(../assets/imgs/joinUs1.jpg);
  width: 100%;
  height:360px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% auto;

  @media screen and (max-width: 480px) {
    height:100px;
  }
}

.joinUsPart1-1-1 {
  width:400px;
  height:300px;
  background-color: rgba(46, 144, 115, 0.86);
  color:white;
  padding:20px;
  margin-right:20px;

  @media screen and (max-width: 480px) {
    width:280px;
    margin-right:5px;
    padding:10px;
  }
}

.joinUsCircle {
  position:relative;
  z-index: -1;
  top:200px;

  @media screen and (max-width: 480px) {
    width: 200px;
    top:20px;
  }
}

.joinUsPart2 {
  position:relative;
  z-index: -1;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items: center;
  top:-100px;
  left:10px;

  @media screen and (max-width: 480px) {
    align-items: flex-start;
    top: -115px;
    left: 5px;
  }
}

.joinUsPart2-1 {
  display:flex;
  flex-direction:column;
  align-items:flex-end;
  width:600px;
  text-align:right;
  margin-right:100px;
  margin-top:200px;

  @media screen and (max-width: 480px) {
    width:calc(50% - 100px);
    margin-right:10px;
    margin-top:20px;
  }
}

.joinUsPart2-1-1 {
  width:100%;
  margin-top:20px;

  @media screen and (max-width: 480px) {
    
  }
}

.longChain {
  position:relative;
  z-index: -1;
  
  @media screen and (max-width: 480px) {
    width: 80px;
  }
}

.joinUsPart2-2 {
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  width:600px;
  text-align:left;
  margin-left:100px;
  margin-top:100px;

  @media screen and (max-width: 480px) {
    width:calc(50% - 100px);
    margin-left:10px;
    margin-top:20px;
  }
}

.joinUsPart2-2-1 {
  width:100%;
  margin-top:20px;

  @media screen and (max-width: 480px) {
    
  }
}

.joinUsPart3 {
  width:80%;
  display:flex;

  @media screen and (max-width: 480px) {
    width:95%;
  }
}

.joinUsPart3-1 {
  width:600px;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  align-items:center;
  background-color: rgba(40, 124, 101, 1);

  @media screen and (max-width: 480px) {
    width: 550px;
  }
}

.joinUsPart3-1-1
{
  width:100%;
  height:100%;
  flex-direction:column;
  display:flex;
  justify-content:center;
  align-items:center;

  @media screen and (max-width: 480px) {
    
  }
}

.joinUsPart3-1-2
{
  width:100%;
  height:200px;
  flex-direction:column;
  display:flex;
  justify-content:center;
  align-items:center;
  border-top-color: rgba(255, 189, 67, 1);
  border-top-style: solid;
  border-top-width: 10px;
  background-color: rgba(0, 0, 0, 1);

  @media screen and (max-width: 480px) {
    
  }
}

.joinUsPart3-2
{
  display:flex;
  flex-direction:column;
  margin-left:20px;
  margin-top:20px;
  margin-bottom:10px;

  @media screen and (max-width: 480px) {
    
  }
}

.joinUsPart4
{
  width:80%;
  display:flex;
  flex-direction:column;
  margin-top:100px;

  @media screen and (max-width: 480px) {
    width:95%;
    margin-top:20px;
  }
}

.joinUsPart4-1
{
  margin-top:40px;
  display:flex;
  align-items:center;

  @media screen and (max-width: 480px) {
    margin-top:20px;
  }
}

.joinUsPart4-1-1
{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media screen and (max-width: 480px) {
    padding: 20px;
    width: 100%;
  }
}

.joinUsPart4-1-2
{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  @media screen and (max-width: 480px) {
    padding: 20px;
    margin-top: 20px;
    width: 80%;
  }
}
</style>
