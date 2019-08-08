<template>
  <div style="display:flex;width:100%;">
    <transition name="fade">
      <img
        v-show="show1"
        class="homeImg"
        src="../assets/imgs/home1.jpg"
        @click="$router.push({path: '/service'})"
      />
    </transition>
    <transition name="fade">
      <img
        v-show="show2"
        class="homeImg"
        src="../assets/imgs/home2.jpg"
        @click="$router.push({path: '/service'})"
      />
    </transition>
    <transition name="fade">
      <img
        v-show="show3"
        class="homeImg"
        src="../assets/imgs/home3.jpg"
        @click="$router.push({path: '/service'})"
      />
    </transition>
    <transition name="fade">
      <img
        v-show="show4"
        class="homeImg"
        src="../assets/imgs/home4.jpg"
        @click="$router.push({path: '/service'})"
      />
    </transition>
    <div style="position:fixed;top:50%;width:100%;display:flex;justify-content:space-between;">
      <div class="pointerLeft" @click="moveLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="pointerRight" @click="moveRight">
        <i class="el-icon-arrow-right"></i>
      </div>
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
  width: 100%;
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
</style>

