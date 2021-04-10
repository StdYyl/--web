<template>
  <div class="intf_rh">
    <div class="rh_head">
      <h4 style="margin: 0px 0 0 15px;color: #1890FF">接口列表
        <span class="el-icon-info" style="color:#1890FF;"></span>
      </h4>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="$router.push('../AddIntf')"
                 style="margin-right: 20px;font-size: 12px;padding: 7px 15px">新增接口
      </el-button>
    </div>
    <el-table
      stripe
      :data="intfList"
      :header-cell-style="{color:'#101010'}"
      style="width: 100%;font-size: 13px">
      <el-table-column
        :show-overflow-tooltip="true"
        label="接口名称"
        width="230">
        <template slot-scope="props">
          <el-button type="text"
                     @click="changeRouter(props.row.id)">{{props.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="path"
        :show-overflow-tooltip="true"
        label="接口路径"
        width="270">
      </el-table-column>
      <el-table-column
        prop="module"
        :show-overflow-tooltip="true"
        label="接口分类"
        width="200">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="接口状态"
        width="139">
        <template slot-scope="props">
          <span :class="props.row.status == '1' ? 'el-icon-circle-close' : 'el-icon-circle-check'"></span>
          <span>{{props.row.statusName}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页，每页最多3条数据-->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
    import {getInterfaceList} from "../../api/interface";

    export default {
        name: "index",
        data() {
            return {
                //每页展示条数
                pageSize: 9,
                //总条数（正常）
                totalCount: 10,
                intfList: []
            }
        },
        methods:{
            //点击项目
            changeRouter(e){
                let {id,moduleId} = this.$route.params
                this.$router.push(`/home/intfIndex/${id}/intf/${moduleId}/detail/${e}`)
            }
        },
        async mounted() {
            //获取接口列表
            let rs = await getInterfaceList("all")
            if(rs.data.data){
                let param = rs.data.data;
                param.records.forEach(msg=>{
                    msg.module = msg.directoryid
                    if(msg.status == "1"){
                        msg.statusName = "未完成"
                    }else if(msg.status == "2"){
                        msg.statusName = "已完成"
                    }else{
                        msg.statusName = "已归档"
                    }
                })
                this.totalCount = param.total
                this.intfList.splice(0,this.intfList.length)
                this.intfList.push(...param.records)
            }
            console.log(this.intfList)
        }
    }
</script>

<style lang="less" scoped>

  .dialog-title {
    text-align: left;
    font-size: 14px;
    font-weight: 700;
    overflow: hidden;
  }

  .dialog-title i {
    color: #45A4F9;
    /* color: #0B2278; */
    font-size: 16px;
    line-height: 38px;
  }

  .dialog-footer {
    text-align: left;
    font-size: 14px;
    font-weight: 700;
  }

  /deep/ .el-pagination {
    padding: 20px 5px;
    text-align: right;
  }

  .el-icon-circle-close:before {
    color: red;
  }

  .el-icon-circle-check:before {
    color: rgb(99, 173, 94);
  }

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

    .el-table /deep/ td {
      padding: 0px;

      span, div {
        font-size: 12px;
      }
    }

    .el-table /deep/ th {

      div {
        padding: 0 10px;
      }
    }
  }

</style>
