<<<<<<< HEAD
<template>
  <div style="margin: 60px; white-space:nowrap;">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="Name:" prop="name">
        <el-col :span="8">
          <el-input v-model="ruleForm.name" placeholder="Please enter the name" :value="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="E-mail" prop="email">
        <el-col :span="8">
          <el-input v-model="ruleForm.email" placeholder="Please enter the e-mail" :value="ruleForm.email" }}></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Phone" prop="phone">
        <el-col :span="8">
          <el-input v-model="ruleForm.phone" placeholder="Please enter the phone" :value="ruleForm.phone"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
        <el-button @click="toStores('ruleForm')">My Stores</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    getBVOInfo,
    initBVOInfo,
    updateBVOInfo
  } from '@/network/bvo-info.js'

  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          email: '',
          phone: '',
        },
        rules: {
          name: [{
            required: true,
            message: 'Please enter the name',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: 'Please enter the e-mail',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: 'Please enter the phone number',
            trigger: 'blur'
          }]
        },
        bvoInfo: {
          dsrId: "",
          name: "",
          createdBy: "",
          creationDate: "",
          lastUpdateBy: "",
          lastUpdateDate: "",
          callCnt: "",
          remark: "",
          stsCd: "",
          registerDate: "",
          email: "",
          phoneNumber: ""
        }
      };
    },
    methods: {
      getBVOInfo() {
        var getBVOInfoVO = {
          dsrId: 1
        }
        return new Promise((resolve, reject) => {
          getBVOInfo(getBVOInfoVO).then(response => {
            this.ruleForm.name = response.data.name;
            this.ruleForm.email = response.data.email;
            this.ruleForm.phone = response.data.phonenumber;
            console.log("陈冠林");
          }).catch(error => {
            reject(error);
          })
        })
      },
      initBVOInfo() {
        return new Promise((resolve, reject) => {
          initBVOInfo(this.bvoInfo).then(response => {
            this.$message.info("BVO Info Inited Successfully!");
            this.getBVOInfo();
            resolve();
          }).catch(error => {
            reject(error);
          })
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      toStores(formName) {
        this.$router.push({
          path: '/bvo/storeManagement'
        });
      }
    },
    mounted() {
      this.getBVOInfo();
    }
  }
=======
<template>
  <div style="margin: 60px; white-space:nowrap;">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="Name:" prop="name">
        <el-col :span="8">
          <el-input v-model="ruleForm.name" placeholder="Please enter the name" :value="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="E-mail" prop="email">
        <el-col :span="8">
          <el-input v-model="ruleForm.email" placeholder="Please enter the e-mail" :value="ruleForm.email"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Phone" prop="phone">
        <el-col :span="8">
          <el-input v-model="ruleForm.phone" placeholder="Please enter the phone" :value="ruleForm.phone"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
        <el-button @click="toStores('ruleForm')">My Stores</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    getBVOInfo,
    initBVOInfo,
    updateBVOInfo
  } from '@/network/bvo-info.js'

  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          email: '',
          phone: '',
        },
        rules: {
          name: [{
            required: true,
            message: 'Please enter the name',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: 'Please enter the e-mail',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: 'Please enter the phone number',
            trigger: 'blur'
          }]
        },
        bvoInfo:{
          dsrId:'',
          name:'',
          createdBy:'',
          creationDate:'',
          lastUpdateBy:'',
          lastUpdateDate:'',
          callCnt:'',
          remark:'',
          stsCd:'',
          registerDate:'',
          email:'',
          phoneNumber:''
        }
      };
    },
    methods: {
      getBVOInfo(){
        var getBVOInfoVO = {
          dsrId: 1
        }
        return new Promise((resolve, reject) => {
          getBVOInfo(getBVOInfoVO).then(response => {
            this.ruleForm.name = response.data.name;
            this.ruleForm.email = response.data.email;
            this.ruleForm.phone = response.data.phonenumber;
          }).catch(error => {
            reject(error);
          })
        })
      },
      initBVOInfo(){
        return new Promise((resolve, reject) => {
          initBVOInfo(this.bvoInfo).then(response => {
            this.$message.info("Init Successfully");
            this.getBVOInfo();
            resolve();
          }).catch(error => {
            reject(error);
          })
        })
      },
      updateBVOInfo(){
        return new Promise((resolve, reject) => {
          updateBVOInfo(this.bvoInfo).then(response => {
            this.$message.info("Update Successfully");
            resolve();
            this.getBVOInfo();
          }).catch(error => {
            reject(error);
          })
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      toStores(formName) {
        this.$router.push({
          path: '/bvo/storeManagement'
        });
      }
    },
    mounted() {
      // TODO: 1.获取当前User的dsrId(man_buyer_id)
      //       2.判断当前User对应dsr是否有数据。
      this.getBVOInfo();
    }
  }
>>>>>>> 06ce482308db75f6480e5e203172f86d1d01987f
</script>
