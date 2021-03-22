<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <router-view />
  </el-container>
</template>

<script>
    import ASide from "../../components/home/Aside"
    import Header from "../../components/home/Header"
    import Main from "../../components/home/Main"

    export default {
        name: "home",
        components: {
            ASide, Main, Header
        },
        data() {
            return {}
        },
    }
</script>

<style scoped>
  /*修改element*/
  .el-header {
    padding: 0 !important;
  }
</style>
