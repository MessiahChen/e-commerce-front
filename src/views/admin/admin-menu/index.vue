<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span style="margin-right: 10px;">菜单名称</span>
        <el-input v-model="menuType" placeholder="Please input menu Type" style="width: 40vw;"></el-input>
        <el-button class="pan-btn tiffany-btn" type="text" @click="searchmenuByType()">查找</el-button>
        <el-button class="pan-btn light-blue-btn" type="text" @click="ifOpenDialog = true">添加</el-button>
        <el-button class="pan-btn pink-btn" type="text" @click="batchDeletemenu()">删除</el-button>
      </div>

      <el-table ref="menuTable" v-loading="tableLoading" :data="menuInfos" border fit highlight-current-row style="width: 100%;">
        <el-table-column align="center" type="selection" width="100px">
        </el-table-column>
        <el-table-column label="图标" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.menuIcon }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.menuTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column label="资源路径" align="center">
          <template slot-scope="{row}">
            <span>{{ row.menuTitle }}</span>
          </template>
        </el-table-column>

        <el-table-column label="排序" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.menuSort }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="getmenuInfoWhenUpdate(row)">
              Edit
            </el-button>
            <el-button size="mini" type="danger" @click="deletemenuInfo(row,$index)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :page-count="totalPage"
        :current-page.sync="pageNum" :hide-on-single-page="ifOnlyOnePage" style="margin: 1vw auto;text-align: center;"
        @current-change="getAllmenuInfo()">
      </el-pagination>
    </el-card>

    <el-dialog :title="dialogFunction" :visible.sync="ifOpenDialog" width="50%" center top="5vh" destroy-on-close
      @closed="closeDialog()">
      <el-form ref="form" :model="menuInfo" label-width="160px">
        <el-form-item label="字典类型">
          <el-input v-model="menuInfo.menuType"></el-input>
        </el-form-item>

        <el-form-item label="用途描述">
          <el-input v-model="menuInfo.description"></el-input>
        </el-form-item>

        <el-form-item label="编码">
          <el-input v-model="menuInfo.menuCd"></el-input>
        </el-form-item>

        <el-form-item label="编码值">
          <el-input v-model="menuInfo.menuValue"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFunction == 'Add Code' ? addmenuInfo() : updatemenuInfo()">Save</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getAllmenu,
    searchmenu,
    addmenu,
    deletemenu,
    getmenuWhenUpdate,
    updatemenu,
    batchDeletemenu
  } from '@/network/admin-menu.js'

  export default {
    name: "admin-code",
    data() {
      return {
        menuType: "",
        // Table变量
        tableKey: 0,
        menuInfos: null,
        tableLoading: true,
        // 分页控件变量
        pageSize: 8,
        totalPage: 1,
        pageNum: 1,
        ifOnlyOnePage: false,
        // 是否打开弹窗
        ifOpenDialog: false,
        dialogFunction: "Add Code",
        // 添加新商品
        menuInfo: {
          menuId: "",
          menuTitle: "",
          menuIcon: "",
          menuSort: "",
        }
      }
    },
    created() {
      this.getAllmenuInfo();
    },
    methods: {
      getAllmenuInfo() {
        var getAllmenuVO = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllmenu(getAllmenuVO).then(response => {
            this.menuInfos = response.data.list
            this.totalPage = response.data.totalPage
            this.pageNum = response.data.pageNum
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
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          searchmenu(searchmenuVO).then(response => {
            this.menuInfos = response.data.list
            this.totalPage = response.data.totalPage
            this.pageNum = response.data.pageNum
            resolve()
            this.tableLoading = false
          }).catch(error => {
            this.menuInfos = []
            reject(error);
            this.tableLoading = false
          })
        })
      },
      addmenuInfo() {
        this.menuInfo.userId = 1
        return new Promise((resolve, reject) => {
          addmenu(this.menuInfo).then(response => {
            this.$message.info("Add menu Successfully!")
            this.ifOpenDialog = false;
            this.getAllmenuInfo()
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      getmenuInfoWhenUpdate(row) {
        this.dialogFunction = "Modify Code"
        this.ifOpenDialog = true
        return new Promise((resolve, reject) => {
          getmenuWhenUpdate({
            menuId: row.menuId
          }).then(response => {
            this.menuInfo.menuId = row.menuId
            this.menuInfo.menuCd = response.data.menuCd
            this.menuInfo.menuType = response.data.menuType
            this.menuInfo.menuValue = response.data.menuValue
            this.menuInfo.description = response.data.description
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      updatemenuInfo() {
        this.menuInfo.userId = 1
        return new Promise((resolve, reject) => {
          updatemenu(this.menuInfo).then(response => {
            this.$message.info("Modify menu Successfully!")
            this.ifOpenDialog = false;
            resolve()
            this.getAllmenuInfo()
          }).catch(error => {
            reject(error);
          })
        })

      },
      deletemenuInfo(row, index) {
        return new Promise((resolve, reject) => {
          deletemenu({
            menuId: row.menuId
          }).then(response => {
            resolve()
            this.getAllmenuInfo()
          }).catch(error => {
            reject(error);
          })
        })
      },
      batchDeletemenu() {
        var data = this.$refs.menuTable.selection;
        console.log(data)
        var menuIds = []
        for (var i = 0; i < data.length; i++) {
          menuIds[i] = data[i].menuId
        }
        return new Promise((resolve, reject) => {
          batchDeletemenu(menuIds).then(response => {
            resolve()
            this.getAllmenuInfo()
          }).catch(error => {
            reject(error);
          })
        })
      },
      closeDialog() {
        this.menuInfo = {
          menuId: "",
          menuType: "",
          menuCd: "",
          menuValue: "",
          description: "",
          userId: ""
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
