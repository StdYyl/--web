<template>
  <div class="intf_rh">
    <div class="rh_head">
      <h4 style="margin: 5px 0 0 15px;color: #1890FF">我的接口
        <span class="el-icon-info" style="color:#1890FF;"></span>
      </h4>
    </div>
    <el-form :model="from" :rules="rules" ref="from" label-position="top">
      <el-form-item label="名称" prop="name" style="margin-right: 50px">
        <el-input v-model="from.name" placeholder="接口名称" style="width: 350px" size="small"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input v-model="from.introduction" placeholder="接口简介" style="width: 350px" size="small"></el-input>
      </el-form-item>
      <el-form-item label="分组" prop="directoryID" style="margin-right: 50px">
        <el-select v-model="from.directoryID" size="small">
          <el-option :key="item.id" v-for="item in moduleList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" >
        <el-select v-model="from.status" size="small">
          <el-option label="未完成" value="1"></el-option>
          <el-option label="已完成" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路径" prop="directoryID" style="margin-right: 20px;width: 200px">
        <el-select v-model="from.type" size="small">
          <el-option :key="item.id" v-for="item in methodList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路径" prop="directoryID">
        <el-input v-model="from.path" placeholder="接口路径" style="width: 450px" size="small"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                moduleList:[
                    {id:1,name:'用户管理'},
                    {id:2,name:'接口管理'},
                ],
                methodList:[
                    {id:1,name:'GET'},
                    {id:2,name:'POST'},
                    {id:3,name:'PUT'},
                    {id:4,name:'DELETE'},
                ],
                module:'',
                from: {
                    name: '', introduction: '', directoryID: '', status: '', type: 'GET', path: ''
                },
                rules: {
                    name: {required: true, message: "请输入接口名称", trigger: 'blur'},
                    introduction: {required: true, message: "请输入接口简介", trigger: 'blur'},
                    directoryID: {required: true, message: "请选择分组", trigger: 'blur'},
                    path: {required: true, message: "请输入接口路径", trigger: 'blur'},
                }
            }
        }
    }
</script>

<style lang="less" scoped>

  .intf_rh {
    min-height: 530px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 0px;
    border: 1px solid #bbbbbb;
    background-color: white;
    border-radius: 8px;
    width: 870px;
    margin-left: 30px;
    padding: 15px;

    .rh_head {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #c3c3c3;
      padding-bottom: 10px;
      align-items: flex-end;
      margin-bottom: 0;
    }

  }

  /deep/.el-form{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    .el-form-item {
      text-align: left;
      display: inline-block;
      margin-bottom: 15px;

      .el-select{
        width: 350px;
      }

      .el-form-item__label {
        padding: 0;
        line-height: 25px;
      }
    }
  }

</style>
