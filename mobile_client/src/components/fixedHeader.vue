<template>
  <div class="fixedHeader">
    <div style="width:100%;;display:flex;align-items:flex-start;">
      <span style="font-size:25px;width:250px;">增强网络科技</span>
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
  height: 50px;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.42);
}

</style>
