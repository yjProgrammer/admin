<template>
  <div class="addnews">
    <h3>修改文章</h3>
    <div class="addform">
      <el-form :model="news" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="news.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="news.type" placeholder="请选择文章类型">
            <el-option
              v-for="(item, index) in alltype"
              :key="index"
              :label="item.type"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <Editor :value="news.detail" @change="change" @getimgurl="getimgurl"></Editor>
        <el-form-item>
          <el-button @click="pub" type="primary">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Editor from "./editor";
export default {
  components: { Editor },
  data() {
    return {
      alltype: [],
      news: {
        title: "",
        type: "",
        detail: "",
        picture: null
      }
    };
  },
  mounted() { 
    if(this.$route.params.id) {
      this.$axios.post("/getnews/id", {_id: this.$route.params.id}).then(res => {
        this.news.title = res.data.data[0].title
        this.news.type = res.data.data[0].type
        this.news.detail = res.data.data[0].content
      }).catch(err => {
        console.log(err)
      })
    }
    this.$axios.post("/type/get").then(res => {
      if (res.data.status == "fail") {
        this.$message({
          type: "warning",
          message: res.data.msg
        });
      } else {
        this.alltype = res.data.data;
      }
    });
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    change(val) {
      this.news.detail = val;
    },

    getimgurl(val) {
        this.news.picture = val[0];
    },

    pub() {
      if (this.news.title == "") {
        this.$message({
          type: "warning",
          message: "请输入您的文章标题"
        });
      } else if (this.news.type == "") {
        this.$message({
          type: "warning",
          message: "请输入您的文章类型"
        });
      } else if (this.news.detail == "") {
        this.$message({
          type: "warning",
          message: "请输入您的文章内容"
        });
      } else {
        var pubtime = Date.parse(new Date());
        this.$axios
          .post("/pubnews/edit", {
            _id: this.$route.params.id,
            title: this.news.title,
            content: this.news.detail,
            pubtime,
            picture: this.news.picture,
            media: JSON.parse(localStorage.getItem("adminerinfo")).adminerinfo.username,
            source: "晨昱网",
            type: this.news.type
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
              this.news.title = ''
              this.news.detail = ''
              this.news.type = ''
            }
          });
      }
    }
  }
};
</script>
<style scoped>
.addform {
  margin-top: 10px;
}

.editor::-webkit-scrollbar {
  display: none;
}
</style>