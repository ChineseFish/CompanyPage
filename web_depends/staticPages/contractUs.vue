<template>
  <div class='container'>
    <div class="contractUsHeaderImg">
      <span>联系我们</span>
      <span class="">CONTRACT US</span>
      <scroll-to-read></scroll-to-read>
    </div>
    <p class="contractUsPage1">全国咨询热线: xxxxxxxx</p>
    <div class="contractUsPage1-1" v-for="(row, index) in contractDetails" :key="index">
      <div class="contractUsPage1-1-1" v-for="(contract, index) in row" :key="index">
        <img style="display:absolute;max-width:100%;width:auto;height:auto;" :src="contract.bg">
        <div class="contractUsPage1-1-1-1">
          <p class="contractUsPage1-1-1-1-1">{{contract.title}}</p>
        </div>
        <div class="contractUsPage1-1-1-2">
          <img class="contractUsPage1-1-1-2-1" src="../assets/imgs/contractUsIcon1.png">
          <p class="contractUsPage11-1-1-2-2">{{contract.address}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scrollToRead from "./scrollToRead.vue"
  export default {
    name: 'contractUs',
    components: { scrollToRead },
    data () {
      return {
        contractDetails: [
          [
            {
              title: '辽宁总部',
              address: 'xxxxxxx',
              bg: require('../assets/imgs/contractUs2.jpg')
            },
            {
              title: '辽宁总部',
              address: 'xxxxxxx',
              bg: require('../assets/imgs/contractUs3.jpg')
            }
          ],
          [
            {
              title: '辽宁总部',
              address: 'xxxxxxx',
              bg: require('../assets/imgs/contractUs4.jpg')
            },
            {
              title: '辽宁总部',
              address: 'xxxxxxx',
              bg: require('../assets/imgs/contractUs5.jpg')
            }
          ],
          [
            {
              title: '辽宁总部',
              address: 'xxxxxxx',
              bg: require('../assets/imgs/contractUs6.jpg')
            },
            {
              title: '辽宁总部',
              address: 'xxxxxxx',
              bg: require('../assets/imgs/contractUs7.jpg')
            }
          ]
        ]
      }
    }
  }
</script>

<style lang="scss" type scoped>
@import "./common.scss";

.contractUsPage1 {
  color: #000000;
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
}

.contractUsPage1-1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000000;
  @media screen and (max-width: 480px) {
    font-size: 32px;

  }
}

.contractUsPage1-1-1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: -1;
  align-items: center;
  background-repeat:no-repeat;
  background-position:top center;
  color: #000000;
  @media screen and (max-width: 480px) {
    font-size: 32px;
    margin-bottom: 20px;
  }
}

.contractUsPage1-1-1-1 {
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
}

.contractUsPage1-1-1-1-1 {
  color: white;
  text-align: center;
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
}

.contractUsPage1-1-1-2 {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 480px) {
    font-size: 10px;
    margin-left: 25%;
  }
}

.contractUsPage1-1-1-2-1 {
  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
}

.contractUsPage1-1-1-2-2 {
  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
}
</style>
