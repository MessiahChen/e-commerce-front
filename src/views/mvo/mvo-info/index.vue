<template>
  <div style="margin: 60px; white-space:nowrap;">

    <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">

      <h2>Company Information</h2>
      <el-table :data="companyData" border style="width: 100%">
        <el-table-column prop="cn" label="Company Name (CN)" width="180">
        </el-table-column>
        <el-table-column prop="en" label="Company Name (EN)" width="180">
        </el-table-column>
        <el-table-column prop="type" label="GMC Report Type">
        </el-table-column>
        <el-table-column prop="url" label="GMC Report URL">
        </el-table-column>
        <el-table-column prop="coperation" label="Operation">
          <el-button type="primary" circle size='small' icon="el-icon-edit" @click="editCompany('ruleForm')"></el-button>
        </el-table-column>
      </el-table>

      <h2>Brand Information</h2>
      <el-table :data="brandData" border style="width: 100%; margin-bottom: 30px;">
        <el-table-column align="center" type="selection" width="100px">
        </el-table-column>
        <el-table-column prop="nameEn" label="Brand Name">
        </el-table-column>
        <el-table-column prop="remark" label="Brand Logo">
          <template slot-scope="{row}">
            <img :src="row.remark" alt="" style="width: 200px;">
          </template>
        </el-table-column>
        <el-table-column prop="boperation" label="Operation">
          <template slot-scope="{row,$index}">
            <el-button type="primary" circle size='small' icon="el-icon-edit" @click="editBrand(row)"></el-button>
            <el-button type="danger" circle size='small' icon="el-icon-delete" @click="deleteBrand(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="addBrand('ruleForm')">Add Brand</el-button>
    </el-form>

    <div class="dialog-container">
      <el-dialog :visible.sync="dialogFormVisible" title="Brand Information">
        <el-form ref="form" :model="temp" label-width="120px">
          <el-form-item label="Brand Name">
            <el-col :span="12">
              <el-input v-model="temp.nameEn" placeholder="Please enter the brand name" />
            </el-col>
          </el-form-item>
          <el-form-item label="Brand Logo">
            <el-upload ref="upload" :action="uploadUrl" accept="image/png, image/jpeg" list-type="picture-card"
              :auto-upload="false" :file-list="urlList" :http-request="uploadSectionFile(params)" :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-upload" @click="uploadLogo()">Upload Logo</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveBrand">Save</el-button>
            <el-button type="info" @click="closeDialog">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    getCompany,
    initCompany,
    updateCompany
  } from '@/network/mvo/mvo-man-info.js'
  import {
    getBrands,
    addBrand,
    deleteBrand,
    updateBrand,
    uploadLogo
  } from '@/network/mvo/mvo-brand-info.js'

  export default {
    data() {
      return {
        dialogFormVisible: false,
        temp: [{
          brdId: '',
          manId: '',
          nameEn: '',
          nameCn: '',
          remark: '',
          createdBy: '',
          creationDate: '',
          lastUpdateBy: '',
          lastUpdateDate: '',
          callCnt: '',
          stsCd: ''
        }],
        companyData: [{
          cn: '',
          en: '',
          type: '',
          url: '',
          coperation: ''
        }],
        brandData: [],
        pageSize: 10,
        pageNum: 1,
        dialogImageUrl: ''
      }
    },
    methods: {
      getCompany() {
        var getCompanyVO = {
          // TODO
          manId: '1'
        }
        return new Promise((resolve, reject) => {
          getCompany(getCompanyVO).then(response => {
            this.companyData = [{
              cn: response.data.nameCn,
              en: response.data.nameEn,
              type: response.data.gmcReportType,
              url: response.data.gmcReportUrl,
              coperation: ''
            }];
            resolve();
          }).catch(error => {
            reject(error);
          })
        })
      },
      getBrands() {
        var getAllBrandVO = {
          // TODO
          manId: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        return new Promise((resolve, reject) => {
          getBrands(getAllBrandVO).then(response => {
            this.totalPage = response.data.totalPage;
            this.pageNum = response.data.pageNum;
            var list = response.data.list;
            for (let i in response.data.list) {
              this.brandData.push({
                brdId: list[i].brdId,
                nameEn: list[i].nameEn,
                remark: list[i].remark,
                manId: list[i].manId,
                nameCn: list[i].nameCn,
                createdBy: list[i].createdBy,
                creationDate: list[i].creationDate,
                lastUpdateBy: list[i].lastUpdateBy,
                lastUpdateDate: list[i].lastUpdateDate,
                callCnt: list[i].callCnt,
                stsCd: list[i].stsCd
              });
            }
            resolve()
            console.log(response.data)
            console.log(response.data.list)
            console.log(this.pageSize)
            console.log(this.totalPage)
            console.log(this.pageNum)
          }).catch(error => {
            reject(error);
          })
        })
      },
      deleteBrand(row) {
        return new Promise((resolve, reject) => {
          deleteBrand({
            brdId: row.brdId
          }).then(response => {
            resolve();
            this.getBrands();
            location.reload();
          }).catch(error => {
            reject(error);
          })
        })
      },
      editCompany(formName) {
        this.$router.push({
          path: '/mvo/mvoCompanyInfo'
        });
      },
      resetTemp() {
        this.temp = {
          brdId: '',
          manId: '',
          nameEn: '',
          nameCn: '',
          remark: '',
          createdBy: '',
          creationDate: '',
          lastUpdateBy: '',
          lastUpdateDate: '',
          callCnt: '',
          stsCd: ''
        }
      },
      editBrand(row) {
        console.log();
        this.resetTemp();
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      },
      addBrand(formName) {
        this.resetTemp();
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      },
      closeDialog() {
        this.dialogFormVisible = false;
      },
      saveEditedBrand(formName) {
        var brandUpdateVO = {
          brdId: row.proId,
          manId: row.manId,
          nameEn: this.temp.nameEn,
          nameCn: row.nameCn,
          remark: this.temp.remark,
          createdBy: row.createdBy,
          creationDate: row.creationDate,
          // TODO
          lastUpdateBy: row.lastUpdateBy,
          lastUpdateDate: row.lastUpdateDate,
          callCnt: row.callCnt,
          stsCd: row.stsCd
        }
        return new Promise((resolve, reject) => {
          updateBrand(brandUpdateVO).then(response => {
            console.log(response)
            this.dialogFormVisible = false;
            this.getBrands();
            resolve();
            this.$refs['form'].validate((valid) => {
              if (valid) {
                this.brandData.unshift(this.temp);
                this.dialogFormVisible = false;
                this.$notify({
                  title: 'Success',
                  message: 'Created Successfully',
                  type: 'success',
                  duration: 2000
                });
              }
            });
          }).catch(error => {
            reject(error)
          })
        })
      },
      saveAddededBrand(formName) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.brandData.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            });
          }
        });
      },
      uploadSectionFile(params) {
        console.log(params)
        console.log(this.$refs.upload.uploadFiles)
        console.log("result")

        var uploadFileVO = new FormData();
        uploadFileVO.append("file", params.file);

        return new Promise((resolve, reject) => {
          uploadImage(imageVO).then(response => {
            console.log(response)
            if (response.code == 20000) {
              console.log(response)
            }
          }).catch(error => {
            reject(error);
          })
        })
      },
      // handleDelete(row, index) {
      //   this.$notify({
      //     title: 'Success',
      //     message: 'Delete Successfully',
      //     type: 'success',
      //     duration: 2000
      //   })
      //   // this.brandData.splice(index, 1)
      //   console.log(row);
      // },
      //   handleSubmit() {
      //     const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      //     if (!this.checkAllSuccess()) {
      //       this.$message(
      //         'Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!'
      //       )
      //       return
      //     }
      //     this.$emit('successCBK', arr)
      //     this.listObj = {}
      //     this.fileList = []
      //     this.dialogVisible = false
      //   },
      //   handleSuccess(response, file) {
      //     const uid = file.uid
      //     const objKeyArr = Object.keys(this.listObj)
      //     for (let i = 0, len = objKeyArr.length; i < len; i++) {
      //       if (this.listObj[objKeyArr[i]].uid === uid) {
      //         this.listObj[objKeyArr[i]].url = response.files.file
      //         this.listObj[objKeyArr[i]].hasSuccess = true
      //         return
      //       }
      //     }
      //   },
      //   handleRemove(file) {
      //     const uid = file.uid
      //     const objKeyArr = Object.keys(this.listObj)
      //     for (let i = 0, len = objKeyArr.length; i < len; i++) {
      //       if (this.listObj[objKeyArr[i]].uid === uid) {
      //         delete this.listObj[objKeyArr[i]]
      //         return
      //       }
      //     }
      //   },
      //   beforeUpload(file) {
      //     const _self = this
      //     const _URL = window.URL || window.webkitURL
      //     const fileName = file.uid
      //     this.listObj[fileName] = {}
      //     return new Promise((resolve, reject) => {
      //       const img = new Image()
      //       img.src = _URL.createObjectURL(file)
      //       img.onload = function() {
      //         _self.listObj[fileName] = {
      //           hasSuccess: false,
      //           uid: file.uid,
      //           width: this.width,
      //           height: this.height
      //         }
      //       }
      //       resolve(true)
      //     })
      //   }
    },
    mounted() {
      this.getCompany();
      this.getBrands();
    }
  }
</script>
