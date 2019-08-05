<template>
    <div>
        <router-link class="router" :to="{path: '/'}">关于倾影</router-link>
        <router-link class="router" :to="{path: '/joinUs'}">招商加盟</router-link>
        <router-link class="router" :to="{path: '/service'}">服务项目</router-link>
        <router-link class="router" :to="{path: '/state'}">网络动态</router-link>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            activeIndex: "home",
        }
    }
}
</script>

<style lang="scss" scoped>
.router {
    color: white;
    font-size: 25px;
    text-decoration: none;
    margin-right: 80px;
    border-radius: 5px;
    padding: 20px;
    transition: all .9s ease;
    &:hover {
        color: black;
        background-color: white;
        transition: all .5s ease;
    }
}
</style>


