<template>
  <div id="app" style="height: 100%">
      <transition name="router-fades" mode="out-in">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
html,body{
  height:100%;
}
div{
  box-sizing: border-box;
}
/*修改 Notification全局居中*/
.el-notification.right{
  left: 50%;
  transform: translate(-50%, 0);
}
/*icon*/
.el-input__prefix {
  width: 25px;
}
  /*表单*/
.el-form-item__content::after, .el-form-item__content::before {
  content: none;
}
.el-form-item__content {
  display: flex;
  justify-content: space-between;
}
</style>
