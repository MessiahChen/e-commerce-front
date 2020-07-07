<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Product Title：</span>
        <el-input v-model="productTitle" placeholder="Please input product title" style="width: 40vw;"></el-input>
        <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text" @click="searchProductImageByTitle()">Search</el-button>
        <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text" @click="openAddDialog()">Add</el-button>
        <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text" @click="batchDeleteproductCat()">Delete</el-button>
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
        <el-table-column label="Actions" align="center" width="250px" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="getProductCatWhenUpdate(row)">
              Edit
            </el-button>
            <el-button size="mini" type="danger" @click="deleteproductCat(row,$index)">
              Delete
            </el-button>
            <el-button size="mini" type="success" v-if="row.status!='入仓中'">{{proOperation(row)}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :page-count="totalPage" :current-page="pageNum"
        :hide-on-single-page="ifOnlyOnePage" style="margin: 1vw auto;text-align: center;">
      </el-pagination>
    </el-card>

    <el-dialog title="Product Infomation" :visible.sync="ifOpenAddDialog" width="70%" center top="5vh" @closed="closeAddDialog()">

      <el-form ref="form" :model="productImage" label-width="150px">
        <el-form-item label="Product Title">
          <el-select v-model="productImage.proId" clearable placeholder="请选择">
            <el-option v-for="item in productImages" :key="item.proId" :label="item.title" :value="item.proId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Product Category">
          <el-cascader v-model="productImage.category" :options="productCats" :props="{ value: 'catId', label: 'catName', children :'viceCats'}"></el-cascader>
        </el-form-item>

        <el-form-item label="Upload Images">
          <el-button class="pan-btn light-blue-btn" type="text">选择图片</el-button>
          <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text">上传图片</el-button>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenAddDialog = false">Cancel</el-button>
        <el-button type="primary" @click="addProductCategory()">Save</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Product Infomation" :visible.sync="ifOpenUpdateDialog" width="70%" center top="5vh" @closed="closeUpdateDialog()">

      <el-form ref="form" :model="productUpdateImage" label-width="150px">
        <el-form-item label="Product Title">
          <el-input disabled v-model="productUpdateImage.title"></el-input>
        </el-form-item>

        <el-form-item label="Product Category">
          <el-cascader v-model="productUpdateImage.category" :options="productCats" :props="{ value: 'catId', label: 'catName', children :'viceCats'}"></el-cascader>
        </el-form-item>

        <el-form-item label="Upload Images">
          <el-button class="pan-btn light-blue-btn" type="text">选择图片</el-button>
          <el-button class="pan-btn light-blue-btn" style="margin-left: 1vw;" type="text">上传图片</el-button>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenUpdateDialog = false">Cancel</el-button>
        <el-button type="primary" @click="updateProductCategory()">Save</el-button>
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
        ifOpenAddDialog: false,
        ifOpenUpdateDialog: false,
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
          proId: "",
          userId: "",
          category: []
        },
        productUpdateImage: {
          proId: "",
          title: "",
          userId: "",
          category: []
        }
      }
    },
    computed: {
      proOperation() {
        return function(row) {
          var operation = "";
          if (row.status == "待入仓") {
            operation = "入仓"
          } else if (row.status == "待上架") {
            operation = "上架"
          } else if (row.status == "上架中") {
            operation = "下架"
          }
          return operation
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
            this.tableLoading = false
          }).catch(error => {
            reject(error);
            this.tableLoading = false
          })
        })
      },
      openAddDialog() {
        this.getAllImageCategory();
        this.ifOpenAddDialog = true;
      },
      getAllImageCategory() {
        return new Promise((resolve, reject) => {
          getAllCategory().then(response => {
            this.productCats = response.data
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      addProductCategory() {
        console.log(this.productImage)
        return new Promise((resolve, reject) => {
          addProduct(this.productImage).then(response => {
            console.log(response)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      uploadImages() {

      },
      closeAddDialog() {
        this.productImage = {
          proId: "",
          userId: "",
          category: []
        }
      },
      getProductCatWhenUpdate(row) {
        this.ifOpenUpdateDialog = true
        this.productUpdateImage.proId = row.proId
        this.productUpdateImage.title = row.title
        this.getAllImageCategory();
      },
      updateProductCategory() {
        var productCatUpdateVO = {
          proId: this.productUpdateImage.proId,
          userId: this.productUpdateImage.userId,
          category: this.productUpdateImage.category
        }
        return new Promise((resolve, reject) => {
          updateProduct(productCatUpdateVO).then(response => {
            console.log(response)
            this.getAllproductImage()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      closeUpdateDialog() {
        this.productUpdateImage = {
          proId: "",
          title: "",
          userId: "",
          category: []
        }
      },
      batchDeleteproductCat() {

        this.getAllproductImage()
      },
      deleteproductCat(row, index) {

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
