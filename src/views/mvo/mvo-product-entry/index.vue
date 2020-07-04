<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Product Title：</span>
      <el-input v-model="productTitle" placeholder="Please input product title" style="width: 40vw;"></el-input>
      <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text">Search</el-button>
    </div>

    <el-table :key="tableKey" v-loading="tableLoading" :data="productInfo" border fit highlight-current-row style="width: 100%;">
      <el-table-column align="center" type="selection" width="80">
      </el-table-column>
      <el-table-column label="Product Title" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Product Price" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.retailPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="War Number" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.warNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="sku" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.skuCd }}</span>
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
    <el-pagination background layout="prev, pager, next" :total="1000" :hide-on-single-page="ifOnlyOnePage">
    </el-pagination>
  </el-card>
</template>

<script>
  import {getAllProduct} from '@/network/mvo-product-entry.js'
  import axios from 'axios'
  export default {
    name: "mvo-product-entry",
    data() {
      return {
        productTitle: "",
        tableKey: 0,

        productInfo: null,
        tableLoading: true,
        ifOnlyOnePage: false
      }
    },
    created() {
      this.getAllProductInfo();
    },
    methods: {
      getAllProductInfo() {
        var getAllProductVO = {
          manId: 1,
          pageNum: 1,
          pageSize: 1
        }
        axios.post('http://localhost:9040/productEntry/getAllProduct', getAllProductVO).then(response => {
          // post 成功，bairesponse.data 为返回的数据
          console.log(response.data.data.list)
          this.productInfo = response.data.data.list;
        }).catch(error => {
          // 请求失败du
          console.log(error)
        })
        this.tableLoading = false
        // return new Promise((resolve, reject) => {
        //   getAllProduct(getAllProductVO).then(response => {
        //     console.log(response.data)
        //     resolve()
        //     this.$router.push({
        //       path: '/bvo/bvoAvailableMoney'
        //     });
        //     this.loading = false
        //   }).catch(error => {
        //     reject(error);
        //     this.$router.push({
        //       path: '/bvo/bvoAvailableMoney'
        //     });
        //     this.loading = false
        //   })
        //   setTimeout(() => {
        //     this.tableLoading = false
        //   }, 1000)
        // })
      },
      handleUpdate(row) {

      },
      handleDelete(row, index) {

      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "src/styles/btn.scss";
</style>
