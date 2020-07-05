<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Product Title：</span>
        <el-input v-model="productTitle" placeholder="Please input product title" style="width: 40vw;"></el-input>
        <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text" @click="searchProductByTitle()">Search</el-button>
        <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text" @click="ifOpenDialog = true">Add</el-button>
        <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text" @click="batchDeleteproductImage()">Delete</el-button>
      </div>

      <el-table ref="productTable" v-loading="tableLoading" :data="productImage" border fit highlight-current-row style="width: 100%;">
        <el-table-column align="center" type="selection" width="100px">
        </el-table-column>
        <el-table-column label="Product Title" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Category" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Image" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.imageUri }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" align="center">
          <template slot-scope="{row}">
            <span>{{ row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              Edit
            </el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="deleteproductImage(row,$index)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :page-count="totalPage" :current-page="pageNum"
        :hide-on-single-page="ifOnlyOnePage" style="margin: 1vw auto;text-align: center;">
      </el-pagination>
    </el-card>

    <el-dialog title="Add Product" :visible.sync="ifOpenDialog" width="80%" center top="5vh">
      <div class="dialog-span">
        <el-form ref="form" :model="newproductImage" label-width="150px">
          <el-form-item label="商品标题">
            <el-input v-model="newproductImage.title"></el-input>
          </el-form-item>
          <el-form-item label="长">
            <el-input v-model="newproductImage.length"></el-input>
          </el-form-item>
          <el-form-item label="宽">
            <el-input v-model="newproductImage.width"></el-input>
          </el-form-item>
          <el-form-item label="高">
            <el-input v-model="newproductImage.height"></el-input>
          </el-form-item>
          <el-form-item label="重量">
            <el-input v-model="newproductImage.weight"></el-input>
          </el-form-item>

          <el-form-item label="商品sku编码">
            <el-input v-model="newproductImage.skuCd"></el-input>
          </el-form-item>

          <el-form-item label="商品ean编码">
            <el-input v-model="newproductImage.ean"></el-input>
          </el-form-item>

          <el-form-item label="商品型号">
            <el-input v-model="newproductImage.model"></el-input>
          </el-form-item>

          <el-form-item label="借卖价格">
            <el-input v-model="newproductImage.retailPrice"></el-input>
          </el-form-item>

          <el-form-item label="保修期">
            <el-input v-model="newproductImage.warrantyDay"></el-input>
          </el-form-item>
        </el-form>
      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="ifOpenDialog = false">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    name: "mvo-product-image",
    data() {
      return {
        productTitle: "",
        // Table变量
        tableKey: 0,
        productImage: null,
        tableLoading: true,
        // 分页控件变量
        pageSize: 10,
        totalPage: 1,
        pageNum: 1,
        ifOnlyOnePage: false,
        // 是否打开弹窗
        ifOpenDialog: false,
        // 添加新商品
        newproductImage: {
          ean: "",
          height: "",
          length: "",
          model: "",
          retailPrice: "",
          skuCd: "",
          title: "",
          upc: "",
          userId: "",
          warrantyDay: "",
          weight: "",
          width: ""
        }
      }
    },
    created() {
      this.getAllproductImage();
    },
    methods: {
      getAllproductImage() {
        var getAllProductImageVO = {
          manId: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        axios.post('http://localhost:9040/productImage/getAllProductImage', getAllProductImageVO).then(response => {
          if(response.data.code == "200"){
            this.productImage = response.data.data.list
            this.totalPage = response.data.data.totalPage
            this.pageNum = response.data.data.pageNum
            this.tableLoading = false
          }else{
            this.$message.warning(response.data.message);
            this.tableLoading = false
          }
        }).catch(error => {
          console.log(error)
          this.tableLoading = false
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
      searchProductByTitle() {
        var searchProductVO = {
          manId: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.productTitle
        }
        this.tableLoading = true
        axios.post('http://localhost:9040/productEntry/searchProductByTitle', searchProductVO).then(response => {
          console.log(response.data)
          if(response.data.code == "200"){
            this.productImage = response.data.data.list
            this.totalPage = response.data.data.totalPage
            this.pageNum = response.data.data.pageNum
            this.tableLoading = false
          }else{
            this.$message.warning(response.data.message);
            this.tableLoading = false
          }
        }).catch(error => {
          console.log(error)
          this.tableLoading = false
        })
      },
      handleUpdate(row) {

      },
      batchDeleteproductImage() {
        var data = this.$refs.productTable.selection;
        for (var i = 0; i < data.length; i++) {
          axios.delete('http://localhost:9040/productEntry/deleteproductImage?proId=' + data[i].proId).then(response => {
            console.log(response.data)
          }).catch(error => {
            console.log(error)
          })
        }
        this.getAllproductImage()
      },
      deleteproductImage(row, index) {
        axios.delete('http://localhost:9040/productEntry/deleteproductImage?proId=' + row.proId).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
        this.getAllproductImage()
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "src/styles/btn.scss";

  .dialog-span {
    // width: 50%;
    // display: flex;
    // align-items: center;
  }
</style>
