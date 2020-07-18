<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span style="margin-right: 10px;">菜单名称</span>
        <el-input v-model="menuType" placeholder="Please input menu Type" style="width: 40vw;"></el-input>
        <el-button class="pan-btn tiffany-btn" type="text" @click="searchMenuByTitle()">查找</el-button>
        <el-button class="pan-btn light-blue-btn" type="text" @click="ifOpenDialog = true">添加</el-button>
      </div>

      <el-table ref="menuTable" v-loading="tableLoading" :data="menuInfos" border fit highlight-current-row style="width: 100%;"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id">
        <el-table-column label="图标" width="150" align="center">
          <template slot-scope="{row}">
            <svg-icon :icon-class="row.icon" />
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="资源路径" width="200" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column label="排序" width="150" align="center">
          <template slot-scope="{row}">
            <span>{{ row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button size="mini" type="danger" @click="deleteMenuInfo(row,$index)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialogFunction" :visible.sync="ifOpenDialog" width="50%" center top="5vh" destroy-on-close
      @closed="closeDialog()">
      <el-form ref="form" :model="menuInfo" label-width="160px">
        <el-form-item label="名称">
          <el-input v-model="menuInfo.menuTitle"></el-input>
        </el-form-item>

        <el-form-item label="图标">
          <el-input v-model="menuInfo.menuIcon"></el-input>
        </el-form-item>

        <el-form-item label="资源路径">
          <el-input v-model="menuInfo.menuSource"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="menuInfo.menuSort"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFunction == 'Add Code' ? addMenuInfo() : updateMenuInfo()">Save</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getAllMenu,
    searchMenu,
    addMenu,
    deleteMenu,
  } from '@/network/admin/admin-menu.js'

  export default {
    name: "admin-menu",
    data() {
      return {
        menuType: "",
        // Table变量
        tableKey: 0,
        menuInfos: [{
          menuId: "1",
          menuTitle: "123",
          menuSource: "23123",
          menuIcon: "123",
          menuSort: "123",
          children: [{
            menuId: "2",
            menuTitle: "123",
            menuSource: "23123",
            menuIcon: "123",
            menuSort: "123",
          }, {
            menuId: "3",
            menuTitle: "123",
            menuSource: "23123",
            menuIcon: "123",
            menuSort: "123",
          }]
        }],
        tableLoading: false,
        // 是否打开弹窗
        ifOpenDialog: false,
        dialogFunction: "Add Code",
        // 添加新商品
        menuInfo: {
          menuId: "",
          menuTitle: "",
          menuSource: "",
          menuIcon: "",
          menuSort: "",
        }
      }
    },
    created() {
      this.getAllMenuInfo();
    },
    methods: {
      getAllMenuInfo() {
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllMenu().then(response => {
            this.menuInfos = response.data
            resolve()
            console.log(response.data)
            console.log(this.pageSize)
            console.log(this.totalPage)
            console.log(this.pageNum)
            this.tableLoading = false
          }).catch(error => {
            reject(error);
            this.tableLoading = false
          })
        })
      },
      searchmenuByType() {
        var searchmenuVO = {
          menuType: this.menuType,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        // this.tableLoading = true
        // return new Promise((resolve, reject) => {
        //   searchmenu(searchmenuVO).then(response => {
        //     this.menuInfos = response.data.list
        //     this.totalPage = response.data.totalPage
        //     this.pageNum = response.data.pageNum
        //     resolve()
        //     this.tableLoading = false
        //   }).catch(error => {
        //     this.menuInfos = []
        //     reject(error);
        //     this.tableLoading = false
        //   })
        // })
      },
      addmenuInfo() {
        this.menuInfo.userId = 1
        // return new Promise((resolve, reject) => {
        //   addmenu(this.menuInfo).then(response => {
        //     this.$message.info("Add menu Successfully!")
        //     this.ifOpenDialog = false;
        //     this.getAllmenuInfo()
        //     resolve()
        //   }).catch(error => {
        //     reject(error);
        //   })
        // })
      },
      deleteMenuInfo(row, index) {
        // return new Promise((resolve, reject) => {
        //   deletemenu({
        //     menuId: row.menuId
        //   }).then(response => {
        //     resolve()
        //     this.getAllmenuInfo()
        //   }).catch(error => {
        //     reject(error);
        //   })
        // })
      },
      closeDialog() {
        this.menuInfo = {
          menuId: "",
          menuTitle: "",
          menuSource: "",
          menuIcon: "",
          menuSort: "",
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "src/styles/btn.scss";

  .pan-btn {
    margin-left: 1vw;
    width: 130px;
  }

  .box-card {
    border-bottom: none;
  }

  .el-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .el-form-item {
    width: 60vw;
  }
</style>
