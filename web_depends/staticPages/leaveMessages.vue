<template>
  <div>
    <div class='leaveMessagesPage1' v-show="dialogVisible === false" @click="dialogVisible = true"></div>
    <el-dialog
    :visible.sync="dialogVisible"
    style="width:100%;"
    width="80%"
    :show-close="false"
    title="请您留言">
      <div class="leaveMessagesPage2">
        <strong>增强网络</strong>
        <strong>xxxxxxxxxx</strong>
      </div>
      <el-form label-width="60px">
          <el-form-item label="内容">
              <el-input v-model="content"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
              <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
              <el-input v-model="telephone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
              <el-input v-model="email"></el-input>
          </el-form-item>
          <el-form-item label="地址">
              <el-input v-model="address"></el-input>
          </el-form-item>
      </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="consult">发 送</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'leaveMessages',
    data () {
      return {
        dialogVisible: false,
        content: "",
        name: "",
        telephone: "",
        email: "",
        address: ""
      }
    },

    methods: {
      consult: function(params) {
        this.dialogVisible = false;
      }
    }
  }
</script>

<style lang="scss" type scoped>
@import "./common.scss";

.leaveMessagesPage1
{
  cursor: ponter;
  position: fixed;
  bottom: 20%;
  right: 0px;
  border-radius: 50%;
  background: #00aef3 url(../assets/imgs/leaveMessagesIcon1.png) center center no-repeat;
  background-size: 50px;

  @media screen and (max-width: 480px) {
    width:100px;
    height:100px;
  }
}

.leaveMessagesPage2
{
  width: 100%;
  height: 80px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #ddd;
  @media screen and (max-width: 480px) {
    height: 80px;
    font-size: 20px;
    margin-bottom: 20px;
  }
}
</style>
