<template>
    <div class="main">
      <el-container>
        <el-aside width="256px">
          <Aside></Aside>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
  import Aside from '../../components/home/Aside';
  export default {
    name: "project",
    components: {
      Aside: Aside,
    }
  }
</script>

<style scoped lang="less">
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
