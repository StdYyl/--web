<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="256px">
        <ASide></ASide>
      </el-aside>
      <el-container>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
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

  .el-container {
    height: 100%;
  }

  .el-aside div {
    height: 100%;
  }

  /deep/.el-main {
    padding: 10px 20px 0;
  }
</style>
