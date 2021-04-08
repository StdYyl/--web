<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <router-view />
  </el-container>
</template>

<script>
    import Header from "../../components/dashboard/Header"

    export default {
        name: "dashboard",
        components: {
          Header
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
