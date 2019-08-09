<template>
    <div style="width:100%;display:flex;justify-content:flex-end;background-color:rgba(0, 0, 0, 0.42);">
        <div class="navIcon" @click="showNavPage=!showNavPage">
            <span v-bind:class="{ navIconOpenSpan: showNavPage, navIconCloseSpan: !showNavPage}"></span>
            <span v-bind:class="{ navIconOpenSpan: showNavPage, navIconCloseSpan: !showNavPage}"></span>
        </div>
        <transition name="slide-fade">
            <div v-show="showNavPage" class="nav" @click="showNavPage=false;">
                <div class="nav-1">
                    <router-link class="router1" :to="{path: '/'}">网站首页</router-link>
                    <router-link class="router2" :to="{path: '/about'}">关于增强网络</router-link>
                </div>
                <div class="nav-1">
                    <router-link class="router3" :to="{path: '/joinUs'}">招商加盟</router-link>
                    <router-link class="router4" :to="{path: '/service'}">服务项目</router-link>
                </div>
                <div class="nav-1">
                    <router-link class="router5" :to="{path: '/state'}">网络动态</router-link>
                    <router-link class="router6" :to="{path: '/contractUs'}">联系我们</router-link>
                </div>
            </div>
        </transition>
    </div>
    
</template>

<script>
export default {
    data: function () {
        return {
            showNavPage: false,
        }
    }
}
</script>

<style lang="scss" scoped>

.nav {
    background-color: rgba(0,0,0,0.9);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99;
    top: 80px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.nav-1 {
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30%;
}

/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-100px);
}

.router {
    width: 100%;
    text-align: center;
    color: white;
    padding: 30px;
    font-size: 25px;
    text-decoration: none;
    margin-right: 80px;
    border-bottom: solid 1px rgba(255,255,255,0.3);
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: flipInX;
}

.router1 {
    @extend .router;
    animation-delay: 0.1s;
}

.router2 {
    @extend .router;
    animation-delay: 0.2s;
}

.router3 {
    @extend .router;
    animation-delay: 0.3s;
}

.router4 {
    @extend .router;
    animation-delay: 0.4s;
}

.router5 {
    @extend .router;
    animation-delay: 0.5s;
}

.router6 {
    @extend .router;
    animation-delay: 0.6s;
}


.router7 {
    @extend .router;
    animation-delay: 0.7s;
}


@keyframes flipInX {
    0% {
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }

    40% {
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        animation-timing-function: ease-in;
    }
    60% {
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1;
    }
    80% {
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }
    100% {
        transform: perspective(400px);
    }
}

.navIcon {
    color: #ffffff;
    height: 80px;
    font-size: 18px;
    text-align: center;
    float: right;
    width: 80px;
    position: relative;
    transition: background 0.5s;
}

.navIconCloseSpan, .navIconOpenSpan {
    position: absolute;
    left: calc((100% - 25px) / 2);
    top: calc((100% - 1px) / 2);
    width: 25px;
    height: 1px;
    background-color: rgba(255,255,255,1);
}

span.navIconCloseSpan {
    &:nth-child(1) {
        transform: translateY(4px) rotate(0deg);
        animation-duration: 0.5s;
        animation-fill-mode: both;
        animation-name: outFirst;
    }
    &:nth-child(2) {
        transform: translateY(-4px) rotate(0deg);
        animation-duration: 0.5s;
        animation-fill-mode: both;
        animation-name: outSecond;
    }
}

@keyframes outFirst {
    0% {
    transform: translateY(0) rotate(-45deg);
    }
    100% {
        transform: translateY(-4px) rotate(0deg);
    }
}

@keyframes outSecond {
    0% {
    transform: translateY(0) rotate(45deg);
    }
    100% {
        transform: translateY(4px) rotate(0deg);
    }
}

span.navIconOpenSpan {
    animation-duration: 0.5s;
    animation-fill-mode: both;
    &:nth-child(1) {
        animation-name: checkFirst;
    }
    &:nth-child(2) {
         animation-name: checkSecond;
    }
    
}

@keyframes checkFirst {
    0% {
    transform: translateY(4px) rotate(0deg);
    }
    100% {
        transform: translateY(0) rotate(45deg);
    }
}

@keyframes checkSecond {
    0% {
    transform: translateY(-4px) rotate(0deg);
    }
    100% {
        transform: translateY(0) rotate(-45deg);
    }
}
</style>


