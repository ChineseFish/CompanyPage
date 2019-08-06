<template>
  <div class="fixedHeader">
    <div style="width:80%;min-width:1280px;height:100px;display:flex;align-items:center;">
      <span style="margin-right:80px;font-size:25px;">增强网络科技</span>
      <navigator></navigator>
    </div>
  </div>
  
</template>

<script>
import navigator from "./navigator.vue"

export default {
  name: "fixedHeader",
  components: { navigator },
  data() {
    return {};
  },

  created() {}
};
</script>

<style lang="scss" scoped>

.fixedHeader
{
  color: white;
  position: fixed;
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.42);
}

</style>
