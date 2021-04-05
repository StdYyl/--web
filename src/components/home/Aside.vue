<template>
  <div>
    <div class="aside">
      <div class="person_mes">
        <div class="person_mes_head">
          <div>个人空间</div>
          <div @click="showAddDirList">
            <el-icon class="iconfont icon-tianjiawenjian" style="cursor: pointer"></el-icon>
          </div>
        </div>
        <div class="introduction">简介：{{mes}}</div>
        <el-input size="mini" placeholder="搜索分类" prefix-icon="el-icon-search" v-model="searchMes"></el-input>
      </div>
      <el-tree :data="folderData" :props="defaultProps" :filter-node-method="search" ref="tree" accordion
               :highlight-current='true' :load="handleNodeClick" lazy
               :render-content="renderContent" :expand-on-click-node="isRemove" v-infinite-scroll="load">
      </el-tree>

      <!--删除提示-->
      <el-dialog
        title="提示"
        :visible.sync="showDelete"
        width="25%">
        <div slot="title" class="dialog-title">
          <div class="dialog_head">
            <div>
              <i class="el-icon-warning-outline"></i>
              <span class="title-text">提示</span>
            </div>
            <div class="button-right">
              <span class="title-close" @click="showDelete = false"></span>
            </div>
          </div>
          <div class="dialog_mes" style="text-indent: 26px;">确定删除'{{deleteMes}}'目录，以及其下所有项目么？删除后将不可恢复！</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDelete = false;isRemove = true" size="small">取 消</el-button>
          <el-button type="primary" @click="sureRemove" size="small">确 定</el-button>
        </span>
      </el-dialog>

      <!--添加分类提示-->
      <el-dialog
        title="提示"
        :visible.sync="showAddDir"
        width="25%">
        <div slot="title" class="dialog-title">
          <div class="dialog_head">
            <div>
              <i class="el-icon-warning-outline"></i>
              <span class="title-text">添加分类</span>
            </div>
            <div class="button-right">
              <span class="title-close" @click="showAddDir = false"></span>
            </div>
          </div>
          <div class="dialog_mes" style="padding-bottom: 5px">
            <span style="padding-right: 5px">选择目录</span>
            <el-select v-model="parentId" size="small" style="width: 210px">
              <el-option :key="item.id" v-for="item in folderList" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="dialog_mes">
            <span style="padding-right: 5px">目录名称</span>
            <el-input size="mini" v-model="dirName" placeholder="分类名称" style="width: 210px"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showAddDir = false" size="small">取 消</el-button>
          <el-button type="primary" @click="addFolder" size="small">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
    import {addDir, getDirOneList, queryDirListLevSecond} from "../../api/directory";
    import {notice} from "../../utils/elementUtils";

    export default {
        watch: {
            searchMes(val) {
                this.$refs.tree.filter(val);
            }
        },
        data() {
            return {
                dirName: '',
                showAddDir: false,
                parentId:-1,
                folderList:[],
                folderData: [
                    // {
                    //     id: 1,
                    //     label: "中原工学院",
                    //     children: [
                    //         {
                    //             id: 2,
                    //             label: "软件学院",
                    //             children: [
                    //                 {id: 3, label: "学生管理系统"},
                    //                 {id: 4, label: "宿舍管理系统宿舍管理系统宿舍管理系统"},
                    //             ]
                    //         },
                    //     ]
                    // },

                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                mes: "项目简介",
                searchMes: "",
                folderIcon: "el-icon-folder",
                isRemove: true,
                showDelete: false,
                deleteMes: ""
            }
        },
        methods: {
            //点击节点
            async handleNodeClick(node,resolve){
                if(node.level > 1) resolve([]);
                if(node.expanded) return ;
                let index = this.folderData.findIndex(oj => oj.id === node.data.id)
                this.folderData[index] = []
                let rs = await queryDirListLevSecond(node.data.id, localStorage.getItem("id"))
                if(rs.data.data){
                    let arr = rs.data.data;
                    let child= []
                    for (let i = 0; i < arr.length; i++) {
                        child.push({id: arr[i].id, label: arr[i].name})
                    }
                    resolve(child);
                }

            },
            async showAddDirList(){
                this.folderList.splice(0, this.folderList.length)
                this.folderList.push({id:-1,label:"无"})
                let rs = await getDirOneList(localStorage.getItem("id"))
                if (rs.data.code == 200) {
                    let arr = rs.data.data;
                    for (let i = 0; i < arr.length; i++) {
                        this.folderList.push({id: arr[i].id, label: arr[i].name, children:[]})
                    }
                }
                this.showAddDir = true;
                console.log(this.folderList)
            },
            load() {

            },
            //搜索
            search(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //添加文件夹
            async addFolder() {
                if(this.dirName == ''){
                    notice(this, '请输入文件名称', 'error')
                    return ;
                }
                let param = {
                    name: this.dirName,
                    category: "2",
                    archive: "1",
                    parentid:this.parentId,
                    createby: localStorage.getItem("id"),
                }
                let rs = await addDir(param);
                if (rs.data.code != 200) {
                    notice(this, rs.data.msg, 'error')
                    return;
                }
                notice(this,"添加成功")
                this.parentId = -1
                this.dirName = ''
                //调用查询目录接口
                this.getDirList();
                this.showAddDir = false
            },
            //点击删除icon
            deleteFolder(e) {
                this.isRemove = false
                this.showDelete = true
                this.deleteMes = e.label
            },
            //删除目录
            sureRemove() {
                //调用删除目录接口
            },
            //目录
            renderContent(h, {node, data, store}) {
                return (
                    < span class='custom-tree-node'>
                    < span class='folder_name'> {node.label} < /span>
                    < span class='el-icon-delete-solid' on-click={() => this.deleteFolder(data)}>< /span>
                    < /span> );
            },
            //查询目录列表
            async getDirList() {
                let rs = await getDirOneList(localStorage.getItem("id"))
                if (rs.data.code == 200) {
                    this.folderData = []
                    let arr = rs.data.data;
                    for (let i = 0; i < arr.length; i++) {
                        this.folderData.push({id: arr[i].id, label: arr[i].name, children:[]})
                    }
                }
            },
        },
        async mounted() {
            this.getDirList();
        }
    }

</script>

<style lang="less" scoped>

  /deep/.el-tree-node__loading-icon{
    display: none;
  }

  //messageBox
  .el-message-box /deep/ .el-message-box__content {
    display: flex;
  }

  //dialog
  /deep/ .el-dialog__body {
    display: none;
  }

  .dialog_mes {
    font-weight: normal;
    font-size: 13px;
    line-height: 20px;
    padding: 15px 30px;

    span{
      text-indent: 26px;
    }
  }

  .el-dialog__wrapper /deep/ .el-dialog__header {
    padding: 0px;

    .el-input__inner{
        background-color: white !important;
      color: #333333 !important;
    }
  }

  .dialog_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid #BBBBBB;
  }

  .el-icon-warning-outline:before {
    color: #FAC200;
  }

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

  //目录树
  /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #005fffb8;
    color: white !important;

    .el-icon-delete-solid:before, .el-icon-caret-right:before {
      color: white !important;
    }

  }

  /*.el-tree /deep/ .el-tree-node:focus> .el-tree-node__content {*/
  /*  background-color: #005fffb8;*/
  /*  color: white !important;*/

  /*  .el-icon-delete-solid:before, .el-icon-caret-right:before {*/
  /*    color: white !important;*/
  /*  }*/
  /*}*/

  .el-tree /deep/ .folder_name {
    font-size: 13px;
    text-align: left;
    width: 120px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .el-tree /deep/ .el-icon-delete-solid:before {
    font-size: 18px;
    color: #101010a6;
    margin-right: 20px;
  }

  .el-tree /deep/ .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    height: 16px;
  }

  .el-tree /deep/ .el-tree-node__content {
    padding: 10px 0;
    height: 50px;
  }

  .el-tree /deep/ .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  .el-tree /deep/ .el-icon-caret-right:before {
    content: "\e78a";
    font-size: 18px;
    padding-left: 15px;
    color: #101010;

  }

  .el-tree /deep/ .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
    content: "\e784";
    font-size: 18px;
  }

  .el-input /deep/ .el-input__inner {
    border: 0;
  }

  .el-input {
    border: 1px solid #DCDFE6;
    border-radius: 4px;
  }

  /deep/ .el-input__inner {
    background-color: #32363A !important;
    color: white;
  }

  .aside {
    /*height: 100vh;*/
    height: 100%;
    background: white;
    top: 0;


    .person_mes {
      height: 170px;
      background-color: #32363A;
      color: white;
      padding: 0 20px;

      .person_mes_head {
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        padding: 30px 0 15px;
      }

      .introduction {
        text-align: left;
        font-size: 14px;
        padding: 10px 0 20px;
      }
    }
  }

  .iconfont {
    font-size: 27px;
  }
</style>
