<template>
  <div class="intf_export">
    <div class="rh_head">
      <h4 style="margin: 5px 0 0 15px;color: #1890FF">批量导入
        <span class="el-icon-info" style="color:#1890FF;"></span>
      </h4>
    </div>
    <el-form style="margin: 20px 110px;">
      <el-form-item label="数据类型">
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
          action="#"
          :before-upload="beforeAvatarUpload"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {getModuleByProId} from "../../api/directory";
    import {notice} from "../../utils/elementUtils";
    import {getIntfDataByFile} from "../../api/interface";

    export default {
        name: "ExportIntf",
        data() {
            return {
                dataType: 'json',
                moduleList: [],
                module: ''
            }
        },
        methods: {
            //上传图片
            async beforeAvatarUpload(file) {
                let fileName = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = fileName === 'json'
                if (this.module == '') {
                    this.$message({
                        message: '请先选择上传的分组',
                        type: 'warning'
                    });
                } else if (!extension) {
                    this.$message({
                        message: '上传文件只能是 json格式!',
                        type: 'error'
                    });
                } else {
                    let param = new FormData(); //创建form对象
                    param.append("file", file);
                    param.append("moduleId", this.module);
                    param.append("userId", localStorage.getItem("id"));
                    param.append("proId", this.$route.params.id);
                    let rs = await getIntfDataByFile(param);
                    if (rs.data.code == 200) {
                        notice(this, rs.data.msg)
                        return;
                    } else {
                        notice(this, rs.data.msg,"error")
                    }
                }
                return false;
            },
        },
        async mounted() {
            //模块列表
            let rs = await getModuleByProId(this.$route.params.id);
            if (!rs.data.data) {
                notice(this, "请先去添加模块！", "info")
                return
            }
            this.moduleList.splice(0, this.moduleList.length)
            this.moduleList.push(...rs.data.data)
        }
    }
</script>

<style lang="less" scoped>
  .intf_export {
    min-height: 530px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px 0px;
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
