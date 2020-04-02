<template>
  <div class="allsort">
    <h3>分类管理</h3>
    <table>
      <tr>
        <th>类别</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in alltype" :key="index">
        <td>{{item.type}}</td>
        <td>
          <el-button type="text" @click="del(item.type, index)">删除</el-button>
        </td>
      </tr>
    </table>
    <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="新增类型">
          <el-input v-model="newtype" placeholder="请输入新增加的文章类型"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="add" type="primary">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alltype: [],
      newtype: ""
    };
  },
  mounted() {
    this.$axios.post("/type/get").then(res => {
      this.alltype = res.data.data;
    });
  },
  methods: {
    del(type, index) {
      this.$confirm("是否删除此文章类型?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.post("/type/del", { type }).then(res => {
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
              this.alltype.splice(index, 1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add() {
      this.$axios.post("/type/add", { newtype: this.newtype }).then(res => {
        if (res.data.status == "fail") {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.alltype.push({ type: this.newtype });
        }
      });
    }
  }
};
</script>

<style scoped>
.allsort {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.allsort table {
  width: 80%;
  margin: 10px auto;
  text-align: center;
  border: 1px solid #eee;
  background-color: #fff;
  border-collapse: collapse;
}

.allsort > div {
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
}

tr th:nth-of-type(1),
tr td:nth-of-type(1) {
  width: 25%;
}
tr th:nth-of-type(2),
tr td:nth-of-type(2) {
  width: 25%;
}

td,
th {
  padding: 5px 0;
  border: 1px solid #eee;
  border-left-style: none;
  border-right-style: none;
}
</style>