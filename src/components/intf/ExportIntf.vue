<template>
  <div class="intf_export">
    <div class="rh_head">
      <h4 style="margin: 5px 0 0 15px;color: #1890FF">批量导入
        <span class="el-icon-info" style="color:#1890FF;"></span>
      </h4>
    </div>
    <el-form style="margin: 20px 110px;">
      <el-form-item label="数据导入">
        <el-select v-model="dataType" size="small">
          <el-option label="json" value="json"></el-option>
          <el-option label="swagger" value="swagger"></el-option>
          <el-option label="postman" value="postman"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择分组">
        <el-select v-model="module" size="small">
          <el-option :key="item.id" v-for="item in moduleList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!--何时上传到服务器？？？-->
      <el-form-item label="选择文件">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "ExportIntf",
        data() {
            return {
                dataType: 'json',
                moduleList:[
                    {id:1,name:'用户管理'},
                    {id:2,name:'接口管理'},
                ],
                module:''
            }
        },
    }
</script>

<style lang="less" scoped>
  .intf_export {
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

</style>
