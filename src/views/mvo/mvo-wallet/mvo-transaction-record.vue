<template>
  <div class="balance-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="Transaction Number" align="center" >
        <template slot-scope="scope">
          {{ scope.row.transactionNumber }}
        </template>
      </el-table-column>
      <el-table-column label="Available Money" align="center">
        <template slot-scope="scope">
          {{ scope.row.transactionMoney }}
        </template>
      </el-table-column>
      <el-table-column label="Create Time" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="Status" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import { getTransactionRecord } from '@/network/wallet'

  export default {
    name: 'mvo-transaction-record',
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
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getTransactionRecord(
          {
            accountName: this.$store.state.user.accountName
          }
        ).then(response => {
          this.list = response.data
          this.listLoading = false
        })
      }
    }
  }
</script>
