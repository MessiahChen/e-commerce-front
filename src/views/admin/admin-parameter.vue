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
          <el-table-column label="参数主键" align="center" >
            <template slot-scope="scope">
              {{ form.accountName }}
            </template>
          </el-table-column>
          <el-table-column label="参数值" align="center">
            <template slot-scope="scope">
              {{ scope.row.availableMoney }}
            </template>
          </el-table-column>
          <el-table-column label="参数说明" align="center">
            <template slot-scope="scope">
              {{ scope.row.availableMoney }}
            </template>
          </el-table-column>
          <el-table-column label="Operation" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="withdrawClick(scope.$index)" >改</el-button>
              <el-button type="primary" @click="goToRecord(scope.$index)" >删</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog-container">
          <el-dialog :visible.sync="dialogFormVisible" title="数字字典信息">
            <el-form ref="form" :model="form" label-width="150px">
              <el-form-item label="参数主键：">
                <el-input v-model="form.type" />
              </el-form-item>
              <el-form-item label="参数值：">
                <el-input v-model="form.desc" />
              </el-form-item>
              <el-form-item label="参数说明：">
                <el-input v-model="form.code" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onWithdraw">保存</el-button>
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
    name: "admin-parameter",
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
          type:'',
          desc:'',
          code:'',
          codeValue:''
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.form.accountName = this.$store.state.user.accountName
        this.listLoading = true
        return new Promise((resolve, reject) => {
          getAvailableMoney({
            accountName: '20200707'
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
      goToRecord(index){
        // return new Promise((resolve, reject) => {
        //   withDrawMoney({
        //     accountName: this.form.accountName,
        //     flow: this.form.flow,
        //     password: this.form.password
        //   }).then(response => {
        //     console.log('mvo-available-money onWithdraw() withDrawMoney code is ');
        //     console.log(response.code);
        //     this.$message({
        //       message: '删除成功',
        //       type: 'success'
        //     })
        //     this.closeDialog();
        //   }).catch(error => {
        //     console.log(error);
        //     reject(error);
        //     // this.$message.error('删除失败');
        //   })
        // })
        this.$message({
          message: index+'删除成功',
          type: 'success'
        })
        // this.fetchData();
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


