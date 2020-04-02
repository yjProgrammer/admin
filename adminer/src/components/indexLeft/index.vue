<template>
  <div id="navLeft">
    <el-col class="navmenu">
      <el-menu class="el-menu-vertical-demo" background-color="#292421" text-color="#fff" active-text-color="none">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-folder"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item @click="toRight('/')">文章列表</el-menu-item>
          <el-menu-item @click="toRight('/AddNews')">增加文章</el-menu-item>
        </el-submenu>
      </el-menu>
      <el-menu class="el-menu-vertical-demo" background-color="#292421" text-color="#fff" active-text-color="transprent">
        <el-menu-item  @click="toRight('/AllSort')" index="2">
          <i class="el-icon-s-fold"></i>
          <span>分类管理</span>
        </el-menu-item>
      </el-menu>
      <el-menu class="el-menu-vertical-demo" background-color="#292421" text-color="#fff" active-text-color="transprent">
        <el-menu-item  @click="toRight('/ResetPass')" index="2">
          <i class="el-icon-setting"></i>
          <span>修改密码</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "indexleft",
  methods: {
    toRight(path) {
      this.$router.push({ path });
    }
  }
};
</script>

<style scoped>
#navLeft {
  width: 200px;
  position: absolute;
  top: 60px;
  left: 0;
  height: calc(100% - 60px);
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #292421;
}

#navLeft::-webkit-scrollbar {
  display: none;
}

#navLeft .navmenu {
  width: 100%;
}

#navLeft .el-menu-vertical-demo {
  border: none;
  width: 100%;
}
</style>