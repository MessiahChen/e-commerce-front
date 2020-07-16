<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <el-button class="pan-btn light-blue-btn" type="text" @click="ifOpenDialog = true">添加</el-button>
      </div>

      <el-table ref="roleTable" v-loading="tableLoading" :data="roleInfos" border fit highlight-current-row style="width: 100%;">
        <el-table-column align="center" type="index" width="50px">
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="{row}">
            <span>{{ row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="getRoleInfoWhenUpdate(row)">
              菜单权限
            </el-button>
            <el-button type="primary" size="mini" @click="getRoleInfoWhenUpdate(row)">
              Edit
            </el-button>
            <el-button size="mini" type="danger" @click="deleteRoleInfo(row,$index)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :page-count="totalPage"
        :current-page.sync="pageNum" :hide-on-single-page="ifOnlyOnePage" style="margin: 1vw auto;text-align: center;"
        @current-change="getAllRoleInfo()">
      </el-pagination>
    </el-card>

    <el-dialog :title="dialogFunction" :visible.sync="ifOpenDialog" width="50%" center top="5vh" destroy-on-close
      @closed="closeDialog()">
      <el-form ref="form" :model="roleInfo" label-width="160px">
        <el-form-item label="字典类型">
          <el-input v-model="roleInfo.roleType"></el-input>
        </el-form-item>

        <el-form-item label="用途描述">
          <el-input v-model="roleInfo.description"></el-input>
        </el-form-item>

        <el-form-item label="编码">
          <el-input v-model="roleInfo.roleCd"></el-input>
        </el-form-item>

        <el-form-item label="编码值">
          <el-input v-model="roleInfo.roleValue"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFunction == 'Add Code' ? addRoleInfo() : updateRoleInfo()">Save</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getAllRole,
    addRole,
    deleteRole,
    updateRole,
  } from '@/network/admin-role.js'

  export default {
    name: "admin-code",
    data() {
      return {
        roleType: "",
        // Table变量
        tableKey: 0,
        roleInfos: [{
          roleId: "",
          roleName: "",
        }],
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
        roleInfo: {
          roleId: "",
          roleName: "",
        }
      }
    },
    created() {
      this.getAllRoleInfo();
    },
    methods: {
      getAllRoleInfo() {
        var getAllRoleVO = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllRole(getAllRoleVO).then(response => {
            this.roleInfos = response.data.list
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
      searchRoleByType() {
        var searchRoleVO = {
          roleType: this.roleType,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          searchRole(searchRoleVO).then(response => {
            this.roleInfos = response.data.list
            this.totalPage = response.data.totalPage
            this.pageNum = response.data.pageNum
            resolve()
            this.tableLoading = false
          }).catch(error => {
            this.roleInfos = []
            reject(error);
            this.tableLoading = false
          })
        })
      },
      addRoleInfo() {
        this.roleInfo.userId = 1
        return new Promise((resolve, reject) => {
          addRole(this.roleInfo).then(response => {
            this.$message.info("Add Role Successfully!")
            this.ifOpenDialog = false;
            this.getAllRoleInfo()
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      getRoleInfoWhenUpdate(row) {
        this.dialogFunction = "Modify Code"
        this.ifOpenDialog = true
        return new Promise((resolve, reject) => {
          getRoleWhenUpdate({
            roleId: row.roleId
          }).then(response => {
            this.roleInfo.roleId = row.roleId
            this.roleInfo.roleCd = response.data.roleCd
            this.roleInfo.roleType = response.data.roleType
            this.roleInfo.roleValue = response.data.roleValue
            this.roleInfo.description = response.data.description
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      updateRoleInfo() {
        this.roleInfo.userId = 1
        return new Promise((resolve, reject) => {
          updateRole(this.roleInfo).then(response => {
            this.$message.info("Modify Role Successfully!")
            this.ifOpenDialog = false;
            resolve()
            this.getAllRoleInfo()
          }).catch(error => {
            reject(error);
          })
        })

      },
      deleteRoleInfo(row, index) {
        return new Promise((resolve, reject) => {
          deleteRole({
            roleId: row.roleId
          }).then(response => {
            resolve()
            this.getAllRoleInfo()
          }).catch(error => {
            reject(error);
          })
        })
      },
      batchDeleteRole() {
        var data = this.$refs.roleTable.selection;
        console.log(data)
        var roleIds = []
        for (var i = 0; i < data.length; i++) {
          roleIds[i] = data[i].roleId
        }
        return new Promise((resolve, reject) => {
          batchDeleteRole(roleIds).then(response => {
            resolve()
            this.getAllRoleInfo()
          }).catch(error => {
            reject(error);
          })
        })
      },
      closeDialog() {
        this.roleInfo = {
          roleId: "",
          roleType: "",
          roleCd: "",
          roleValue: "",
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
