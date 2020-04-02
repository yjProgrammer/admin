<template>
  <div class="head">
    <h1>文章发布管理后台</h1>
    <div>
      <span>{{adminer}}</span>
      <el-button type="text" @click="logout">退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexhead",
  data() {
    return {
      adminer: "",
      token: ""
    };
  },
  mounted() {
    try {
      var adminerinfo = JSON.parse(localStorage.getItem("adminerinfo"))
        .adminerinfo;
      var token = JSON.parse(localStorage.getItem("adminerinfo")).token;
    } catch {
      var adminerinfo = "";
      var token = "";
    }
    if (adminerinfo && token) {
      this.token = token;
      this.adminer = adminerinfo.username;
    } else {
      this.$router.replace({ path: "/login" });
    }
  },
  methods: {
    logout() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.post("/logout", { token: this.token }).then(res => {
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
              localStorage.removeItem("adminerinfo");
              this.$router.replace({ path: "/login" });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.head {
  width: 100%;
  height: 60px;
  display: flex;
  color: white;
  box-sizing: border-box;
  padding: 0 30px;
  justify-content: space-between;
  align-items: center;
  background-color: #1c998c;
}

h1 {
    font-size: 24px;
}

.head span {
  margin-right: 15px;
}
</style>