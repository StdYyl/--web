<template>
    <div class="setting">
      <div class="title">
        所有日志
        <div class="circle"></div>
        11
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
            prop="name"
            label="姓名"
            width="80">
          </af-table-column>
          <af-table-column
            prop="date"
            label="时间"
            width="100"
            fit>
          </af-table-column>
          <af-table-column
            prop="desc"
            label="描述"
            min-width="1"
            fit>
          </af-table-column>
          <af-table-column
            fixed="right"
            label="操作"
            width="100"
            align="center">
            <template slot-scope="scope">
              <span  style="color: #FF4D4F;font-size: 12px;">删除</span>
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
  export default {
    name: "setting",
    data() {
      return {
        ctl: false,
        loading: true,
        tableData: [
          {
            id: 1,
            open: true,
            name: '王小虎',
            date: '2016-05-02',
            desc: '文件上传',
            ope: '添加',
          }, {
            id: 2,
            open: true,
            name: '王小虎',
            date: '2016-05-02',
            desc: '添加成员列表',
            ope: '修改',
          }, {
            id: 3,
            open: true,
            name: '王小虎',
            date: '2016-05-02',
            desc: '添加yyl123成员',
            ope: '删除',
          }, {
            id: 4,
            open: true,
            name: '王小虎',
            date: '2016-05-02',
            desc: '添加yyl123成员',
            ope: '添加',
          }
        ],
        pageSizes: [1,2,3,4,5,6,7,8,9],
        pageSize: 1,
        currentPage: 3,
        total: 4,
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
      handleSizeChange() {
        //当每一页条数发生改变时触发
      },
      handleCurrentChange() {
        //当页数发生改变时除法
      }
    },
    mounted() {
      setTimeout(() => {
        this.loading=false;
      },1000)
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
      padding: 0 0 10px 10px;
      font-size: 18px;
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
