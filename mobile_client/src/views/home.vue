<template>
  <div
    style="width:100%;display:flex;flex-direction:column;align-items:center;background-color: black;"
  >
    <div style="display:flex;width:100%;">
      <img
        v-bind:class="{ homeImgShow: show1, homeImgFade: !show1}"
        src="../assets/imgs/home1.jpg"
        @click="$router.push({path: '/service'})"
      />
      <img
        v-bind:class="{ homeImgShow: show2, homeImgFade: !show2}"
        src="../assets/imgs/home2.jpg"
        @click="$router.push({path: '/service'})"
      />
      <img
        v-bind:class="{ homeImgShow: show3, homeImgFade: !show3}"
        src="../assets/imgs/home3.jpg"
        @click="$router.push({path: '/service'})"
      />
      <img
        v-bind:class="{ homeImgShow: show4, homeImgFade: !show4}"
        src="../assets/imgs/home4.jpg"
        @click="$router.push({path: '/service'})"
      />
      <div style="position:fixed;top:50%;width:100%;display:flex;justify-content:space-between;">
        <div class="pointerLeft" @click="moveLeft">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="pointerRight" @click="moveRight">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>版权所有：增强网络科技</p>
      <a
        style="text-decoration:none;color: rgb(255, 255, 255);"
        href="http://beian.miit.gov.cn"
      >辽ICP备： 15003829号</a>
    </div>
  </div>
</template>

<script>
import { clearInterval } from "timers";
export default {
  name: "home",
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

  created() {
    this.initInterval();
  },

  destroyed() {
    window.clearInterval(this.interval);
  },

  watch: {
    showIndex: function(newValue) {
      this.show1 = this.show2 = this.show3 = this.show4 = false;

      switch (newValue) {
        case 0:
          {
            this.show1 = true;
          }
          break;
        case 1:
          {
            this.show2 = true;
          }
          break;
        case 2:
          {
            this.show3 = true;
          }
          break;
        case 3:
          {
            this.show4 = true;
          }
          break;
      }
    }
  },
  methods: {
    initInterval: function() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }

      this.interval = window.setInterval(() => {
        this.moveRight();
      }, 5000);
    },
    moveLeft: function() {
      this.initInterval();

      this.showIndex -= 1;

      if (this.showIndex < 0) {
        this.showIndex = 3;
      }
    },
    moveRight: function() {
      this.initInterval();

      this.showIndex += 1;

      if (this.showIndex > 3) {
        this.showIndex = 0;
      }
    }
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
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 0px;
  width: 100%;
  height: auto;
  overflow: hidden;
  animation-duration: 1s;
  animation-fill-mode: both;
}

.homeImgFade {
  @extend .homeImg;
  animation-name: imgFade;
}

.homeImgShow {
  @extend .homeImg;

  animation-name: imgshow;
}

@keyframes imgFade {
  0% {
    
    opacity: 1;
  }
 
  40% {
   
    animation-timing-function: ease-in;
    opacity: 0.5;
  }
  100% {
    
    animation-timing-function: ease-in;
    opacity: 0;
  }
}

@keyframes imgshow {
  0% {  
    opacity: 0;
  }
 
  40% {
    
    animation-timing-function: ease;
    opacity: 0.5;
  }
  100% {
    animation-timing-function: ease;
    opacity: 1;
  }
}

.footer {
  position: absolute;
  z-index: 1;
  bottom:0px;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 1);
  color: #ffffff;
  font-size: 2px;
}
</style>

