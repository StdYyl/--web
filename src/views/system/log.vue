<template>
    <div class="setting">
      <div class="title">
        <div class="info">
          所有日志
          <div class="circle"></div>
          {{total}}
        </div>
        <div class="search">
          <el-input v-model="search" placeholder="查询日志文件" @change="listSystemLog"></el-input>
        </div>
      </div>
      <div class="divider"></div>
      <div class="main">
        <el-table
          ref="multipleTable"
          :data="tableData"
          v-loading="loading"
          tooltip-effect="dark"
          :header-cell-style="{'color':'#333', 'background':'#f2f2f2'}"
          stripe
          height="210"
          style="width: 100%">
          <af-table-column
            fixed
            prop="open"
            label="展开/合上"
            width="120"
            align="center">
            <template slot-scope="scope">
              <div style="width: 100%;height: 100%">
                <i @click="changeArrow(scope.row.id)" v-if="scope.row.open" class="el-icon-arrow-right"></i>
                <i @click="changeArrow(scope.row.id)" v-if="!scope.row.open" class="el-icon-arrow-down"></i>
              </div>
            </template>
          </af-table-column>
          <af-table-column
            prop="user.name"
            label="姓名"
            width="80">
          </af-table-column>
          <af-table-column
            prop="time"
            label="时间"
            width="100"
            fit>
            <template slot-scope="scope">
              {{new Date(scope.row.time).getFullYear()}}-{{new Date(scope.row.time).getMonth()+1}}-{{new Date(scope.row.time).getDate()}}
            </template>
          </af-table-column>
          <af-table-column
            prop="describes"
            label="描述"
            min-width="1"
            fit>
          </af-table-column>
          <af-table-column
            fixed="right"
            label="操作类型"
            width="100"
            align="center">
            <template slot-scope="scope">
              <span style="color: #1890ff;font-size: 12px;" v-if="scope.row.operation=='添加'">添加</span>
              <span style="color: #fcd95c;font-size: 12px;" v-if="scope.row.operation=='修改'">修改</span>
              <span  style="color: #FF4D4F;font-size: 12px;" v-if="scope.row.operation=='删除'">删除</span>
              <span style="color: rgb(237,190,210);font-size: 12px;" v-if="scope.row.operation=='其它'">其它</span>
            </template>
          </af-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            background
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import {listSystemLog} from "../../api/systemlog";

  export default {
    name: "setting",
    data() {
      return {
        loading: true,
        tableData: [],
        search: '',
        pageSizes: [1,2,3,4,5,6,7,8,9],
        pageSize: 5,
        currentPage: 1,
        total: 0,
      }
    },
    methods: {
      changeArrow(id) {
        this.tableData.forEach((item) => {
          if(item.id == id) {
            item.open=!item.open;
          }
        })
      },
      handleSizeChange(size) {
        //当每一页条数发生改变时触发
        console.log(this.pageSize);
        this.pageSize = size;
        this.listSystemLog();
      },
      handleCurrentChange(current) {
        //当页数发生改变时触发
        console.log(this.pageSize);
        this.currentPage = current;
        this.listSystemLog();
      },
      async listSystemLog() {
        let res = await listSystemLog({
          current: this.currentPage,
          size: this.pageSize,
          search: this.search,
        });
        console.log(res);
        if(res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
          this.loading = false;
        }
      }
    },
    mounted() {
      this.listSystemLog();
    }
  }
</script>

<style scoped lang="less">
  .setting {
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 30px;
    display: flex;
    flex-direction: column;
    .title {
      padding: 10px;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info {
        display: flex;
        align-items: center;
        .circle {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #101010;
          margin: 0 10px;
        }
      }
    }
    .divider {
      border-bottom: 2px solid rgba(195,195,195,0.25);
    }
    .main {
      flex: 1;
      padding: 20px 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-items: center;
      .pagination {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 5px 10px;
        border-top: none;
      }
    }
  }
</style>
