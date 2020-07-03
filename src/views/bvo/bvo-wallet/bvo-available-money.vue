<template>
  <div>
    <div class="availableMoney-container">
      <div class="password-change-container">
        <el-button type="primary" @click="changePasswordVisible = true" >Change Password</el-button>
        <div class="dialog-container">
          <el-dialog :visible.sync="changePasswordVisible" title="Withdraw">
            <el-form ref="passwordForm" :model="passwordForm" label-width="120px">
              <el-form-item label="Old Password">
                <el-input v-model="passwordForm.oldPassword" />
              </el-form-item>
              <el-form-item label="New Password">
                <el-input type="password" v-model="passwordForm.newPassword" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onConfirm">Confirm</el-button>
                <el-button @click="closeDialog">Cancel</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
      <div class="table-container">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="Account Name" align="center" >
            <template slot-scope="scope" >
              {{ scope.row.accountName }}
            </template>
          </el-table-column>
          <el-table-column label="Available Money" align="center">
            <template slot-scope="scope">
              {{ scope.row.avaliableMoney }}
            </template>
          </el-table-column>
          <el-table-column label="Operation" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="withdrawClick(scope.$index)" >withdraw</el-button>
            </template>
          </el-table-column>
          <el-table-column label="Record" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="goToRecord" >record</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog-container">
          <el-dialog :visible.sync="dialogFormVisible" title="Withdraw">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="Money Amout">
                <el-input v-model="form.withdrawingMoney" />
              </el-form-item>
              <el-form-item label="Password">
                <el-input type="password" v-model="form.password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onWithdraw">Withdraw</el-button>
                <el-button @click="closeDialog">Cancel</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import
  {
    getAvailableMoney,
    withDrawMoney,
    updatePassword
  }
  from '@/network/wallet'

  export default {
    name: "bvo-available-money",
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        dialogFormVisible: false,
        changePasswordVisible: false,
        passwordForm:{
          oldPassword: '',
          newPassword: ''
        },
        form: {
          accountName:'',
          withdrawingMoney:'',
          password:''
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getAvailableMoney().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      },
      closeDialog(){
        this.dialogFormVisible = false;
        this.changePasswordVisible = false;
        this.form.withdrawingMoney = '';
        this.form.password = '';
        this.passwordForm.oldPassword = '';
        this.passwordForm.newPassword = ''
      },
      onConfirm(){
        updatePassword({
          oldPassword:this.passwordForm.oldPassword,
          newPassword:this.passwordForm.newPassword
        }).then(response => {
          console.log(response.code);
        });
        this.closeDialog();
      },
      withdrawClick(index){
        console.log(index);
        this.dialogFormVisible = true;
        // this.form.accountName = this.list[index].accountName;
        this.form.accountName = index;
      },
      onWithdraw(){
        withDrawMoney({
          accountName: this.form.accountName,
          withDrawMoney: this.form.withdrawingMoney,
          password: this.form.password
        }).then(response => {
          console.log(response.code);
        });
        this.closeDialog();
      },
      goToRecord(){
        this.$router.push({
          path: '/bvo/bvoTransactionRecord'
        })
      }
    }
  }
</script>

<style scoped>
  .password-change-container{
    padding: 3vh;
  }
  .table-container{
    padding: 3vh;
  }
  .availableMoney-container{
    padding-bottom: 3vh;
  }
</style>
