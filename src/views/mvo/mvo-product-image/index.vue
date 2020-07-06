<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Product Title：</span>
        <el-input v-model="productTitle" placeholder="Please input product title" style="width: 40vw;"></el-input>
        <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text" @click="searchProductImageByTitle()">Search</el-button>
        <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text" @click="openAddDialog()">Add</el-button>
        <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text" @click="batchDeleteproductImage()">Delete</el-button>
      </div>

      <el-table ref="productTable" v-loading="tableLoading" :data="productImages" border fit highlight-current-row
        style="width: 100%;">
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
        <el-table-column label="Image" align="center">
          <template slot-scope="{row}">
            <span>{{ row.imageUri }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" width="150px" align="center">
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

    <el-dialog title="Product Infomation" :visible.sync="ifOpenDialog" width="70%" center top="5vh">

      <el-form ref="form" :model="productImage" label-width="150px">
        <el-form-item label="Product Title">
          <el-input v-model="productImage.title"></el-input>
        </el-form-item>

        <el-form-item label="Product Category">
          <el-cascader v-model="productCat" :options="productCats" :props="{ value: 'catId', label: 'catName', children :'viceCats'}"></el-cascader>
        </el-form-item>

        <el-form-item label="Upload Images">
          <el-button class="pan-btn light-blue-btn" type="text">选择图片</el-button>
          <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text">上传图片</el-button>
        </el-form-item>

      </el-form>


      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="ifOpenDialog = false">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getAllProduct,
    searchProduct,
    addProduct,
    deleteProduct,
    getProductWhenUpdate,
    updateProduct,
    getAllCategory
  } from '@/network/mvo-product-image.js'
  export default {
    name: "mvo-product-image",
    data() {
      return {
        productTitle: "",
        // Table变量
        tableKey: 0,
        productImages: null,
        tableLoading: true,
        // 分页控件变量
        pageSize: 10,
        totalPage: 1,
        pageNum: 1,
        ifOnlyOnePage: false,
        // 是否打开弹窗
        ifOpenDialog: false,
        // 已选商品分类
        productCat: "",
        productCats: [{
          catId: 1,
          catName: "ceshi",
          viceCats: [{
            catId: 2,
            catName: "ceshi2",
          }]
        }],
        // 添加新商品
        productImage: {
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
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllProduct(getAllProductImageVO).then(response => {
            this.productImages = response.data.list
            this.totalPage = response.data.totalPage
            this.pageNum = response.data.pageNum
            resolve()
            console.log(response.data)
            console.log(this.pageSize)
            console.log(this.totalPage)
            console.log(this.pageNum)
            this.tableLoading = false
          }).catch(error => {
            reject(error);
            this.tableLoading = false
          })
        })
      },
      searchProductImageByTitle() {
        var searchProductImageVO = {
          manId: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.productTitle
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          searchProduct(searchProductImageVO).then(response => {
            this.productImages = response.data.list
            this.totalPage = response.data.totalPage
            this.pageNum = response.data.pageNum
            resolve()
            console.log(response.data)
            console.log(this.pageSize)
            console.log(this.totalPage)
            console.log(this.pageNum)
            this.tableLoading = false
          }).catch(error => {
            reject(error);
            this.tableLoading = false
          })
        })
      },
      openAddDialog() {
        // this.getAllImageCategory();
        this.ifOpenDialog = true;
      },
      getAllImageCategory() {
        return new Promise((resolve, reject) => {
          getAllCategory().then(response => {
            this.productCats = response.data.list
            resolve()
            console.log(response.data)
            console.log(this.pageSize)
            console.log(this.totalPage)
            console.log(this.pageNum)
          }).catch(error => {
            reject(error);
          })
        })
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
