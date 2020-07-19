<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <el-table ref="menuTable" v-loading="tableLoading" :data="menuInfos" border fit highlight-current-row style="width: 100%;"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id">
          <el-table-column label="图标" align="center">
            <template slot-scope="{row}">
              <svg-icon :icon-class="row.icon" />
            </template>
          </el-table-column>
          <el-table-column label="菜单名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="路由名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="排序" align="center">
            <template slot-scope="{row}">
              <span>{{ row.sort }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button size="mini" type="danger" @click="deleteMenuInfo(row,$index)">
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button class="pan-btn light-blue-btn" type="text" @click="ifOpenDialog = true">添加</el-button>
    </el-card>

    <el-dialog :title="dialogFunction" :visible.sync="ifOpenDialog" width="50%" center top="5vh" destroy-on-close
      @closed="closeDialog()">
      <el-form ref="form" :model="menuInfo" label-width="100px">
        <el-form-item label="菜单名称">
          <el-input v-model="menuInfo.title"></el-input>
        </el-form-item>

        <el-form-item label="图标">
          <el-input v-model="menuInfo.icon"></el-input>
        </el-form-item>

        <el-form-item label="路由名称">
          <el-input v-model="menuInfo.name"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="menuInfo.sort"></el-input>
        </el-form-item>

        <el-form-item label="是否为父菜单">
          <el-switch v-model="ifFatherMenu"></el-switch>
        </el-form-item>

        <el-form-item label="选择父菜单">
          <el-select v-model="menuInfo.parentId" placeholder="请选择父菜单" :disabled="!ifFatherMenu">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
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
        ifFatherMenu:false,
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
          id: "",
          title: "",
          name: "",
          icon: "",
          sort: "",
          parentId:"",
          children:[]
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
    width: 40vw;
  }
</style>
