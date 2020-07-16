<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>Product Title：</span>
        <el-input v-model="productTitle" placeholder="Please input product title" style="width: 40vw;"></el-input>
        <el-button class="pan-btn tiffany-btn" type="text" @click="searchProductByTitle()">Search</el-button>
        <el-button class="pan-btn light-blue-btn" type="text" @click="openAddDialog()">Add</el-button>
        <el-button class="pan-btn pink-btn" type="text" @click="batchDeleteProductInfo()">Delete</el-button>
      </div>

      <el-table ref="productTable" v-loading="tableLoading" :data="productInfos" border fit highlight-current-row style="width: 100%;">
        <el-table-column align="center" type="selection" width="100px">
        </el-table-column>
        <el-table-column label="Product Title" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Product Price" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.retailPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="War Number" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.warNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="sku" align="center">
          <template slot-scope="{row}">
            <span>{{ row.skuCd }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="getProductInfoWhenUpdate(row)">
              Edit
            </el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="deleteProductInfo(row,$index)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :page-count="totalPage"
        :current-page.sync="pageNum" :hide-on-single-page="ifOnlyOnePage" style="margin: 1vw auto;text-align: center;"
        @current-change="getAllProductInfo()">
      </el-pagination>
    </el-card>

    <el-dialog :title="dialogFunction" :visible.sync="ifOpenDialog" width="75%" center top="5vh" destroy-on-close
      @closed="closeDialog()">
      <el-form ref="form" :model="productInfo" label-width="160px" :rules="addRules">
        <el-form-item label="商品标题" prop="title">
          <el-input v-model="productInfo.title"></el-input>
        </el-form-item>
        <div style="display: flex; flex-direction: row;margin-left: 75px;">
          <el-form-item label="长" label-width="70px" style="width: 13vw;" prop="length">
            <el-input v-model="productInfo.length"></el-input>
          </el-form-item>
          <el-form-item label="宽" label-width="70px" style="width: 13vw;" prop="width">
            <el-input v-model="productInfo.width"></el-input>
          </el-form-item>
          <el-form-item label="高" label-width="70px" style="width: 13vw;" prop="height">
            <el-input v-model="productInfo.height"></el-input>
          </el-form-item>
          <el-form-item label="重量" label-width="70px" style="width: 13vw;" prop="weight">
            <el-input v-model="productInfo.weight"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="商品sku编码" prop="skuCd">
          <el-input v-model="productInfo.skuCd"></el-input>
        </el-form-item>

        <el-form-item label="商品ean编码" prop="ean">
          <el-input v-model="productInfo.ean"></el-input>
        </el-form-item>

        <el-form-item label="商品型号" prop="model">
          <el-input v-model="productInfo.model"></el-input>
        </el-form-item>

        <el-form-item label="借卖价格" prop="retailPrice">
          <el-input v-model="productInfo.retailPrice"></el-input>
        </el-form-item>

        <el-form-item label="保修期" prop="warrantyDay">
          <el-input v-model="productInfo.warrantyDay"></el-input>
        </el-form-item>

        <el-form-item label="eBay Description" style="margin-bottom: 12vh;">
          <ebayEditor id="ebayTextEditor" ref="ebayTextEditor" :fileName="'file'" :canCrop="canCrop" :uploadUrl="uploadUrl"
            v-model="productInfo.ebayDescription"></ebayEditor>
        </el-form-item>

        <el-form-item label="Amazon Description" style="margin-top: 12vh; margin-bottom: 120px;">
          <amazonEditor id="amazonTextEditor" ref="amazonTextEditor" :fileName="'file'" :canCrop="canCrop" :uploadUrl="uploadUrl"
            v-model="productInfo.amazonDescription"></amazonEditor>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFunction == 'Add Product' ? addProductInfo() : updateProductInfo()">{{dialogFunction}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  // import {
  //   quillEditor
  // } from 'vue-quill-editor'

  import ebayEditor from '@/components/Quilleditor/index.vue'
  import amazonEditor from '@/components/Quilleditor/index.vue'

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {
    getAllProduct,
    searchProduct,
    addProduct,
    deleteProduct,
    getProductWhenUpdate,
    updateProduct,
    batchDeletePro
  } from '@/network/mvo-product-entry.js'

  export default {
    name: "mvo-product-entry",
    data() {
      return {
        productTitle: "",
        // Table变量
        tableKey: 0,
        productInfos: null,
        tableLoading: true,
        // 分页控件变量
        pageSize: 8,
        totalPage: 1,
        pageNum: 1,
        ifOnlyOnePage: false,
        // 是否打开弹窗
        ifOpenDialog: false,
        dialogFunction: "Add Product",
        // 添加新商品
        productInfo: {
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
          width: "",
          manId: 1,
          ebayDescription: "",
          amazonDescription: ""
        },
        // 副文本编辑器
        ebayContent: "",
        amazonContent: "",
        canCrop: false,
        /*测试上传图片的接口，返回结构为{url:''}*/
        uploadUrl: 'http://localhost:9040/upload/uploadImage',
        addRules: {
          title: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 100,
              message: '商品标题中包含搜索关键字，品牌名，颜色，大小，型号。',
              trigger: 'blur'
            }
          ],
          width: [{
            required: true,
            message: '请填写宽度',
            trigger: 'blur'
          }],
          height: [{
            required: true,
            message: '请填写高度',
            trigger: 'blur'
          }],
          length: [{
            required: true,
            message: '请填写长度',
            trigger: 'blur'
          }],
          weight: [{
            required: true,
            message: '请填写重量',
            trigger: 'blur'
          }],
          skuCd: [{
            required: true,
            message: '请填写sku',
            trigger: 'blur'
          }],
          ean: [{
            required: true,
            message: '请填写ean',
            trigger: 'change'
          }],
          model: [{
            required: true,
            message: '请填写型号',
            trigger: 'change'
          }],
          retailPrice: [{
            required: true,
            message: '请填写价格',
            trigger: 'change'
          }],
          warrantyDay: [{
            required: true,
            message: '请填写保修期',
            trigger: 'blur'
          }]
        }
      }
    },
    components: {
      // quillEditor,
      ebayEditor,
      amazonEditor
    },
    created() {
      this.getAllProductInfo();
    },
    methods: {
      getAllProductInfo() {
        var getAllProductVO = {
          manId: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllProduct(getAllProductVO).then(response => {
            this.productInfos = response.data.list
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
      searchProductByTitle() {
        var searchProductVO = {
          manId: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.productTitle
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          searchProduct(searchProductVO).then(response => {
            this.productInfos = response.data.list
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
      addProductInfo() {
        console.log(this.productInfo.ebayDescription)
        console.log(this.productInfo.amazonDescription)
        return new Promise((resolve, reject) => {
          addProduct(this.productInfo).then(response => {
            this.$message.info("Add Product Successfully!")
            this.ifOpenDialog = false;
            this.getAllProductInfo()
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      getProductInfoWhenUpdate(row) {
        this.dialogFunction = "Modify Product"
        this.ifOpenDialog = true
        return new Promise((resolve, reject) => {
          getProductWhenUpdate({
            proId: row.proId
          }).then(response => {
            this.productInfo = {
              proId: row.proId,

              ean: response.data.ean,
              height: response.data.height,
              length: response.data.length,
              model: response.data.model,
              retailPrice: response.data.retailPrice,
              skuCd: response.data.skuCd,
              title: response.data.title,
              upc: response.data.upc,
              userId: "",
              warrantyDay: response.data.warrantyDay,
              weight: response.data.weight,
              width: response.data.width,
              ebayDescription: response.data.ebayDescription,
              amazonDescription: response.data.amazonDescription
            }
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      batchDeleteProductInfo() {
        var data = this.$refs.productTable.selection;
        console.log(data)

        var proIds = []
        for (var i = 0; i < data.length; i++) {
          proIds[i] = data[i].proId
        }

        return new Promise((resolve, reject) => {
          batchDeletePro(proIds).then(response => {
            resolve()
            this.getAllProductInfo()()
          }).catch(error => {
            reject(error);
          })
        })
      },
      deleteProductInfo(row, index) {
        return new Promise((resolve, reject) => {
          deleteProduct({
            proId: row.proId
          }).then(response => {
            resolve()
            this.getAllProductInfo()
          }).catch(error => {
            reject(error);
          })
        })
      },
      updateProductInfo() {
        return new Promise((resolve, reject) => {
          updateProduct(this.productInfo).then(response => {
            this.$message.info("Modify Product Successfully!")
            this.ifOpenDialog = false;
            resolve()
            this.getAllProductInfo()
          }).catch(error => {
            reject(error);
          })
        })

      },
      closeDialog() {
        this.productInfo = {
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
          width: "",
          manId: 1,
          ebayDescription: "",
          amazonDescription: ""
        }
      },
      changeit() {
        console.log(this.pageNum)
      },
      haha() {
        console.log(this.ebayContent)
        console.log(this.amazonContent)
      },
      openAddDialog(){
        this.ifOpenDialog = true
        this.dialogFunction = "Add Product"
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "src/styles/btn.scss";

  .pan-btn {
    margin-left: 1vw;
    width: 130px;
  }

  .box-card {
    border-bottom: none;
  }

  .el-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .el-form-item {
    width: 60vw;
  }
</style>
