<template>
  <div>
    <IndexHead></IndexHead>
    <IndexLeft></IndexLeft>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import IndexHead from "../components/indexHead";
import IndexLeft from "../components/indexLeft";
export default {
  components: { IndexHead, IndexLeft },
  methods: {}
};
</script>

<style scoped>
  .right {
    position: absolute;
    top: 60px;
    left: 200px;
    width: calc(100% - 200px);
    height: calc(100% - 60px);
    box-sizing: border-box;
    overflow: auto;
    padding: 10px;
    background-color: #eee;
  }

  .right::-webkit-scrollbar {
    display: none;
  }
</style>