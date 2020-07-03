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
          {{ scope.row.recordId }}
        </template>
      </el-table-column>
      <el-table-column label="Available Money" align="center">
        <template slot-scope="scope">
          {{ scope.row.balance }}
        </template>
      </el-table-column>
      <el-table-column label="Create Time" align="center">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column label="State" align="center">
        <template slot-scope="scope">
          {{ scope.row.state }}
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import { getTransactionRecord } from '@/network/bvo'

  export default {
    name: 'bvo-transaction-record',
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
        getTransactionRecord().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      }
    }
  }
</script>
