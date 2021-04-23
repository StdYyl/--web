<template>
  <div class="intf_rh">
    <div class="rh_head" style="height: 39px">
      <h4 style="margin: 0px 0 0 15px;color: #1890FF">历史记录
        <span class="el-icon-info" style="color:#1890FF;"></span>
      </h4>
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
        label="调用时间">
        <template slot-scope="props">
          <span :class="props.row.status == '1' ? 'el-icon-circle-close' : 'el-icon-circle-check'"></span>
          <span>{{props.row.statusName}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页，每页最多3条数据-->
    <el-pagination
      style="text-align: right;margin: 20px 5px"
      background
      @current-change="changeIndex"
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
    import {getInterfaceList} from "../../api/interface";

    export default {
        name: "historyIntf",
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
        async changeIndex(index){
            let {id,moduleId} = this.$route.params
            await this.getIntfList(id, moduleId, index)
        },
        //点击项目
        changeRouter(e){
            console.log(this.$route.params)
            let {id,moduleId} = this.$route.params
            this.$router.push(`/home/intfIndex/${id}/intf/${moduleId}/detail/${e}`)
        },
        //查询接口列表
        async getIntfList(id,moduleId, index=1){
            let rs = await getInterfaceList(id,moduleId,this.pageSize,index)
            let param = rs.data.data;
            this.totalCount = param.total
            this.intfList.splice(0,this.intfList.length)
            if(param.total > 0){
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
                this.intfList.push(...param.records)
            }
        },
    },
    watch: {
        async $route() {
            let {id,moduleId} = this.$route.params
            await this.getIntfList(id,moduleId)
        }
    },
    async mounted() {
        //获取接口列表
        let {id,moduleId} = this.$route.params
        await this.getIntfList(id,moduleId)
    }
    }
</script>

<style lang="less" scoped>
  .intf_rh {
    min-height: 530px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px 0px;
    border: 1px solid #bbbbbb;
    background-color: white;
    border-radius: 8px;
    width: 870px;
    margin-left: 30px;
    padding: 15px;

  /deep/ #tab {
    margin: 0 20px;
    width: 96%;

  .el-tabs__nav {
    transform: translateX(0) !important;

  }
  }

  /deep/ #base {
  .el-form {
    margin-left: 45px;
    display: flex;
    flex-wrap: wrap;

  .el-form-item {
    width: 50%;
    margin-bottom: 12px;
    display: flex;

  .circle {
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
    margin-right: 5px;
  }

  .el-form-item__content {
    font-size: 13px;
    align-items: center;
    display: flex;


  div {
    width: 200px;
    white-space: nowrap; //文字超出时不换行
  text-overflow: ellipsis;
    overflow: hidden;
    text-indent: 5px;
    text-align: left;
  }

  }
  }

  .el-form-item__label {
    padding-right: 0;
    color: #333333;
    text-align-last: justify;
    width: 65px !important;

  }
  }
  }

  /deep/ #param {
  .el-form-item {
    margin-left: 45px;
    display: flex;
    flex-wrap: wrap;

  .el-form-item__label {
    font-size: 17px;
  }
  }
  }

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
