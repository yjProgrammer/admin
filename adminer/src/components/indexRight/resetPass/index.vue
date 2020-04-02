<template>
  <div class="resetpass">
    <h3>用户名密码修改</h3>
    <div>
      <el-form ref="resetpass" :model="resetpass" label-width="100px">
        <el-form-item label="旧密码">
          <el-input type="password" v-model="resetpass.oldpassword" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="resetpass.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码">
          <el-input type="password" v-model="resetpass.repassword" placeholder="请重复新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitResetpass">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      resetpass: {
        oldpassword: "",
        password: "",
        repassword: ""
      }
    };
  },
  methods: {
    submitResetpass() {
      if (this.resetpass.oldpassword == "") {
        this.$message({
          type: "warning",
          message: "请输入您的旧密码"
        });
      } else if (this.resetpass.password == "") {
        this.$message({
          type: "warning",
          message: "请输入您的新密码"
        });
      } else if (this.resetpass.password != this.resetpass.repassword) {
        this.$message({
          type: "warning",
          message: "两次密码不一致"
        });
      } else {
        this.$axios
          .post("/aregister/change", {
            password: this.resetpass.oldpassword,
            newpassword: this.resetpass.password,
            _id: JSON.parse(localStorage.getItem("adminerinfo")).adminerinfo
              ._id,
            adminer: JSON.parse(localStorage.getItem("adminerinfo")).adminerinfo
              .username,
              token: JSON.parse(localStorage.getItem("adminerinfo")).token
          })
          .then(res => {
            if (res.data.status == "fail") {
              this.$message({
                type: "warning",
                message: res.data.msg
              });
            } else {
                this.$message({
                  type: "success",
                  message: res.data.msg
                }); 
                localStorage.removeItem("adminerinfo")  
                this.$router.push({path: '/login'})      
            }
          });
      }
    }
  }
};
</script>

<style scoped>
.resetpass {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.resetpass > div {
  margin: 0 auto;
  margin-top: 10px;
  width: 50%;
}
</style>