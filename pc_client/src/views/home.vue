<template>
  <div>
    <home-navigator></home-navigator>

    <video 
    ref="homeVideo"
    class="homeVideo"
    src="https://v1.cecdn.yun300.cn/100001_1812295852/3adc1200e5a48961a52ab6fb4727a19a_6401562918663981.mp4" 
    autoplay 
    loop>
    </video>
  </div>
</template>

<script>
import { clearInterval } from "timers";
import homeNavigator from "../components/homeNavigator.vue";

export default {
  name: "home",
  components: { homeNavigator },
  data() {
    return {
      showIndex: 0,
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      interval: undefined
    };
  },

  mounted() {
    setTimeout(() => {
      this.$refs.homeVideo.play();
    }, 1000)
  }
};
</script>

<style lang="scss" scoped>
.pointerLeft {
  transition: 1s all;
  top: 50%;
  padding: 20px 10px;
  font-size: 30px;
  color: rgb(255, 255, 255);
  background: rgba(0, 0, 0, 0.498039);
  cursor: pointer;
  display: block;
  opacity: 0.5;
}

.pointerRight {
  transition: 1s all;
  top: 50%;
  padding: 20px 10px;
  font-size: 30px;
  color: rgb(255, 255, 255);
  background: rgba(0, 0, 0, 0.498039);
  cursor: pointer;
  display: block;
  opacity: 0.5;
}
.homeImg {
  width: 100%;
  height: auto;
  overflow: hidden;
  animation-fill-mode: both;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.homeVideo {
    z-index: -1;
    position: absolute;
    top: 0px;
    left: 0px;
    min-width: 100%;
    min-height: 100%;
    object-fit: fill;/*这里是关键*/
    
    background-size: cover;
}
</style>

