<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Product Title：</span>
      <el-input v-model="productTitle" placeholder="Please input product title" style="width: 40vw;"></el-input>
      <el-button style="float: right; padding: 3px 0" type="text">Search</el-button>
    </div>

    <el-table :key="tableKey" v-loading="tableLoading" :data="productInfo" border fit highlight-current-row style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column label="ID" prop="proId" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.proId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Product Title" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    name: "mvo-product-entry",
    data() {
      return {
        productTitle: "",
        tableKey: 0,

        productInfo: null,
        tableLoading: true,
      }
    },
    created() {
      setTimeout(() => {
        this.tableLoading = false
      }, 1000)
    },
    methods: {
      handleUpdate(row) {

      },
      handleDelete(row, index) {

      }
    }
  }
</script>

<style scoped>

</style>
