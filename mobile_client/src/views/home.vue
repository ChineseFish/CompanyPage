<template>
    <div style="display:flex;margin-top:50px;width:100%;">
        <img v-show="show[0]" class="homeImg" src="../assets/imgs/home1.jpg" @click="$router.push({path: '/service'})">
        <img v-show="show[1]" class="homeImg" src="../assets/imgs/home2.jpg" @click="$router.push({path: '/service'})">
        <img v-show="show[2]" class="homeImg" src="../assets/imgs/home3.jpg" @click="$router.push({path: '/service'})">
        <img v-show="show[3]" class="homeImg" src="../assets/imgs/home4.jpg" @click="$router.push({path: '/service'})">
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
export default {
    name: "home",
    data () {
        return {
            showIndex: 0,
            show: [ true, false, false, false ]
        }
    },

    methods: {
        moveLeft: function () {
            
            this.show[this.showIndex] = false;

            console.log(`index: ${this.showIndex}, show: ${this.show[this.showIndex]}`)
            if(this.showIndex <= 0)
            {
                this.showIndex = this.show.length - 1;
            }
            else
            {
                this.showIndex -= 1;
            }
            
            this.show[this.showIndex] = true;
            console.log(`index: ${this.showIndex}, show: ${this.show[this.showIndex]}`)
        },
        moveRight: function () {
            this.show[this.showIndex] = false;

            this.showIndex += 1;
            if(this.showIndex >= this.show.length)
            {
                this.showIndex = 0;
            }

            this.show[this.showIndex] = true;
        }
    }
}
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
    width:100%;
    animation-fill-mode: both;
  }
</style>

