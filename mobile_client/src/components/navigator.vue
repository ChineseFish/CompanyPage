<template>
    <div style="width:100%;display:flex;justify-content:flex-end;margin-right:10px;">
        <el-button icon="el-icon-tickets" @click="showNavPage=!showNavPage"></el-button>
        <div v-show="showNavPage" class="nav" @click="showNavPage=false;">
            <router-link class="router" :to="{path: '/'}">关于增强网络</router-link>
            <router-link class="router" :to="{path: '/joinUs'}">招商加盟</router-link>
            <router-link class="router" :to="{path: '/service'}">服务项目</router-link>
            <router-link class="router" :to="{path: '/state'}">网络动态</router-link>
        </div>
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
.router {
    width: 100%;
    color: white;
    font-size: 15px;
    text-decoration: none;
    margin-right: 80px;
    border-radius: 5px;
    padding: 20px;
    transition: all .9s ease;
    &:hover {
        transition: all .5s ease;
    }
}

.nav {
    position:fixed;
    width:100%;
    height:100%;
    top:50px;
    display:flex;
    flex-direction:column;
    transition: all .9s ease;
    background-color: rgba(0, 0, 0, 0.42);
}
</style>


