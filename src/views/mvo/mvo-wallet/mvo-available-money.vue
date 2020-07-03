<template>
  <div>
    <div class="availableMoney-container">
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
            {{ scope.row.account }}
          </template>
        </el-table-column>
        <el-table-column label="Available Money" align="center">
          <template slot-scope="scope">
            {{ scope.row.avaliable }}
          </template>
        </el-table-column>
        <el-table-column label="Operation" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="dialogFormVisible = true" >withdraw</el-button>

            <div class="dialog-container">
              <el-dialog :visible.sync="dialogFormVisible" title="Withdraw">
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="Money Amout">
                    <el-input v-model="form.sum" />
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

          </template>
        </el-table-column>
        <el-table-column label="Record" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="goToRecord" >record</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  import {
    getAvailableMoney,
    withDrawMoney
  } from '@/network/bvo'

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
        form: {
          sum:'',
          password:''
        },
        params:{
          sum:'',
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
        this.form.sum = '';
        this.form.password = ''
      },
      onWithdraw(){
        this.params.sum = this.form.sum;
        this.params.password = this.form.password;
        withDrawMoney(this.params).then(response => {
          console.log(response.code);
        });
        this.closeDialog();
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
  .availableMoney-container{
    padding: 3vh;
  }
</style>
