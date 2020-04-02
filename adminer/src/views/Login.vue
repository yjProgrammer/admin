<template>
  <div ref="login" class="login">
    <div class="log_reg_box">
      <div class="sys_name">
        <h1>文章发布管理后台</h1>
      </div>
      <div v-if="nowlogin" class="log_reg">
        <el-form :model="login" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="login.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="login.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <p id="hint" v-text="remind"></p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitLogin">登录</el-button>
            <el-button @click="switchover">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="log_reg">
        <el-form ref="register" :model="register" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="register.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="register.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="重复密码">
            <el-input type="password" v-model="register.repassword" placeholder="请重复密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitRegister">注册</el-button>
            <el-button @click="switchover">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowlogin: true,
      login: {
        username: "",
        password: ""
      },
      register: {
        username: "",
        password: "",
        repassword: ""
      },
      remind: "",
      status: false
    };
  },
  mounted() {
    this.$refs.login.style.height = document.documentElement.clientHeight + 'px'
  },
  methods: {
    switchover() {
      this.nowlogin = !this.nowlogin;
    },
    submitLogin() {
      if (this.login.username == "") {
        this.$message({
          type: "warning",
          message: "请输入您的用户名"
        });
      } else {
        if (this.login.password == "") {
          this.$message({
            type: "warning",
            message: "请输入您的密码"
          });
        } else {
          this.$axios
            .post("/alogin", {
              adid: this.login.username,
              password: this.login.password
            })
            .then(res => {
              if (res.data.status == "fail") {
                // 提示信息
                this.$message({
                  type: "warning",
                  message: res.data.msg
                });
              } else {
                // 提示信息
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
                localStorage.setItem(
                  "adminerinfo",
                  JSON.stringify(res.data.data)
                );
                this.$router.push({ path: "/" });
              }
            });
        }
      }
    },
    submitRegister() {
      if (this.register.username == "") {
        this.$message({
          type: "warning",
          message: "请输入注册名"
        });
      } else {
        if (this.register.password == "") {
          this.$message({
            type: "warning",
            message: "请输入注册密码"
          });
        } else {
          if (this.register.password != this.register.repassword) {
            this.$message({
              type: "warning",
              message: "两次密码不一致"
            });
          } else {
            this.$axios
              .post("/aregister", {
                adid: this.register.username,
                password: this.register.password
              })
              .then(res => {
                if (res.data.status == "fail") {
                  // 提示信息
                  this.$message({
                    type: "warning",
                    message: res.data.msg
                  });
                } else {
                  // 提示信息
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                  // 跳到登录
                  this.nowlogin = true;
                  // 清空用户注册信息
                  this.register.username = "";
                  this.register.password = "";
                  this.register.repassword = "";
                }
              });
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  padding-top: 100px;
  box-sizing: border-box;
  background: url('../assets/images/login_bg.jpg') repeat;
}
.log_reg_box {
  width: 50%;
  height: 400px;
  margin: 0 auto;
  padding: 10px;
}
h1 {
  padding: 20px 0;
}
.sys_name {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
}
.log_reg {
  width: 60%;
  margin: 0 auto;
}
</style>