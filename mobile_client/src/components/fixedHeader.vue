<template>
  <div class="fixedHeader">
      <span style="font-size:25px;width:250px;margin-left:10px;">增强网络科技</span>
      <navigator></navigator>
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
  align-items:center;
  width:100%;;
  height: 50px;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.42);
}

</style>
