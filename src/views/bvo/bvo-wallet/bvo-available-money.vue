<template>
  <div>
    <div class="availableMoney-container">
      <div class="password-change-container">
        <el-button type="primary" @click="changePasswordVisible = true" >Change Password</el-button>
        <div class="dialog-container">
          <el-dialog :visible.sync="changePasswordVisible" title="Change password">
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
              {{ form.accountName }}
            </template>
          </el-table-column>
          <el-table-column label="Available Money" align="center">
            <template slot-scope="scope">
              {{ scope.row.availableMoney }}
            </template>
          </el-table-column>
          <el-table-column label="Operation" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="depositClick()" >deposit</el-button>
            </template>
          </el-table-column>
          <el-table-column label="Record" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="goToRecord" >record</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog-container">
          <el-dialog :visible.sync="dialogFormVisible" title="Deposit">
            <el-form ref="form" :model="form" label-width="150px">
              <el-form-item label="Deposit Amount：$">
                <el-input v-model="form.flow" />
              </el-form-item>
              <el-form-item label="Password">
                <el-input type="password" v-model="form.password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onDeposit">Deposit</el-button>
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
    depositMoney,
    changePassword, walletRegister
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
          flow: '',
          password:''
        }
      }
    },
    created() {
      this.fetchData()
    },
    computed:{
      getAccountName(){
        return this.$store.state.user.accountName
      }
    },
    methods: {
      fetchData() {
        this.form.accountName = this.getAccountName
        this.listLoading = true
        return new Promise((resolve, reject) => {
          getAvailableMoney({
            accountName: this.form.accountName
          }).then(response => {
            this.list = response.data;
            this.listLoading = false
          }).catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      closeDialog(){
        this.dialogFormVisible = false;
        this.changePasswordVisible = false;
        this.form.flow = '';
        this.form.password = '';
        this.passwordForm.oldPassword = '';
        this.passwordForm.newPassword = ''
      },

      onConfirm(){
        return new Promise((resolve, reject) => {
          changePassword({
            accountName:this.form.accountName,
            oldPassword:this.passwordForm.oldPassword,
            newPassword:this.passwordForm.newPassword
          }).then(response => {
            console.log('bvo-available-money onConfirm() changePasssword code is ');
            console.log(response.code);
            this.closeDialog();
          }).catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      depositClick(){
        this.dialogFormVisible = true;
      },
      onDeposit(){
        return new Promise((resolve, reject) => {
          depositMoney({
            accountName: this.form.accountName,
            flow: this.form.flow,
            password: this.form.password
          }).then(response => {
            console.log('bvo-available-money onDeposit() changePasssword code is ');
            console.log(response.code);
            this.closeDialog();
          }).catch(error => {
            console.log(error);
            reject(error);
          })
        })
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
