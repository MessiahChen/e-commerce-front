<template>
  <div>
    <div class="availableMoney-container">
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
            <template slot-scope="scope">
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
            <el-form ref="form" :model="form" label-width="150px">
              <el-form-item label="Money Amout : $">
                <el-input v-model="form.flow" />
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
  }
    from '@/network/wallet'

  export default {
    name: "mvo-available-money",
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
        form: {
          accountName:'',
          flow:'',
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
        this.form.flow = '';
        this.form.password = '';
      },
      withdrawClick(){
        console.log(this.form.accountName)
        this.dialogFormVisible = true;
      },
      onWithdraw(){
        return new Promise((resolve, reject) => {
          withDrawMoney({
            accountName: this.form.accountName,
            flow: this.form.flow,
            password: this.form.password
          }).then(response => {
            console.log('mvo-available-money onWithdraw() withDrawMoney code is ');
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
          path: '/mvo/mvoTransactionRecord'
        })
      }
    }
  }
</script>

<style scoped>
  .table-container{
    padding: 3vh;
  }
  .availableMoney-container{
    padding-bottom: 3vh;
  }
</style>
