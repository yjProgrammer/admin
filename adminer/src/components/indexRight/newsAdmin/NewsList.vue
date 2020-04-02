<template>
  <div class="newslist">
    <h3>文章列表</h3>
    <div class="pagebox">
      <el-pagination
        @current-change="change"
        background
        layout="prev, pager, next"
        :total="newsnum"
      ></el-pagination>
    </div>
    <table>
      <tr>
        <th>标题</th>
        <th>类别</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item, index) in news" :key="index">
        <td>
          <!-- <a
            class="target"
            ref="target"
            :href="'http://192.168.0.103:234/admin/info.html?id='+item._id"
            target="_blank"
          >{{item.title}}</a>
          <a
            class="target"
            ref="target"
            :href="'http://111.229.84.153:234/admin/info.html?id='+item._id"
            target="_blank"
          >{{item.title}}</a> -->
          <a
            class="target"
            ref="target"
            :href="'https://news.yuanjun1024.tech:8080/admin/info.html?id='+item._id"
            target="_blank"
          >{{item.title}}</a>
        </td>
        <td>{{item.type}}</td>
        <td>
          <el-button
            :disabled="item.media!=username"
            class="m_r10"
            @click="del(item._id, index)"
            type="text"
          >删除</el-button>
          <el-button :disabled="item.media!=username" type="text" @click="edit(item._id)">编辑</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      username: "",
      currentindex: 1,
      newsnum: 0,
      ismy: false
    };
  },
  mounted() {
    this.username = JSON.parse(
      localStorage.getItem("adminerinfo")
    ).adminerinfo.username;
    this.$axios.post("/getnews/num").then(res => {
      this.newsnum = res.data.data;
    });
    this.$axios.post("/getnews", { page: this.currentindex }).then(res => {
      this.news = res.data.data;
    });
  },
  watch: {
    currentindex(index) {
      this.$axios.post("/getnews", { page: this.currentindex }).then(res => {
        this.news = res.data.data;
      });
    }
  },
  methods: {
    change(e) {
      this.currentindex = e;
    },
    del(id, index) {
      this.$confirm("是否删除此条文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/getnews/del", { _id: this.news[index]._id })
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
                this.news.splice(index, 1);
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
    edit(id) {
      this.$router.push({ name: "EditNews", params: { id: id } });
    }
  }
};
</script>

<style scoped>
.newslist {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.newslist table {
  width: 90%;
  margin: 20px auto;
  text-align: center;
  border: 1px solid black;
  border-collapse: collapse;
  background-color: #fff;
}

tr th:nth-of-type(1),
tr td:nth-of-type(1) {
  width: 50%;
}
tr th:nth-of-type(2),
tr td:nth-of-type(2) {
  width: 25%;
}
tr th:nth-of-type(3),
tr td:nth-of-type(3) {
  width: 25%;
}

td,
th {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  padding: 0px 10px;
  border: 1px solid #eee;
}
th {
  font-size: 16px;
  padding: 5px;
}
.pagebox {
  position: absolute;
  bottom: 15px;
  right: 30px;
}
.target {
  color: #333;
}
.target:hover {
  cursor: pointer;
  color: skyblue;
}
</style>