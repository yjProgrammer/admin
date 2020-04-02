<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    try {
      var adminerinfo = JSON.parse(localStorage.getItem("adminerinfo"));
    } catch {
      var adminerinfo = null;
    }
    if (adminerinfo) {
      this.$axios
        .post("/loginstatus", { token: adminerinfo.token })
        .then(res => {
          if (res.data.status == "fail") {
            this.$message({
              type: "warning",
              message: res.data.msg
            });
            this.$router.replace({ path: "/login" });
          } 
        });
    } else {
      if(/login/g.test(this.$route.path)) {
        this.$router.replace({ path: "/login" });
      } else {
        this.$message({
          type: "warning",
          message: "请您先登录"
        });
        this.$router.replace({ path: "/login" });
      }
    }
  },
  mounted() {
    // console.log(this.$socket)
  },
};
</script>

<style>
</style>
