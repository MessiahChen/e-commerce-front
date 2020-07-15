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
          // TODO
          dsrId: '4'
        }
        return new Promise((resolve, reject) => {
          getBVOInfo(getBVOInfoVO).then(response => {
            this.ruleForm.name = response.data.name;
            this.ruleForm.email = response.data.email;
            this.ruleForm.phone = response.data.phoneNumber;
          }).catch(error => {
            reject(error);
          })
        })
      },
      initBVOInfo(){
        this.readInfo();
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
        this.readInfo();
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
      readInfo(){
        this.bvoInfo.name = this.ruleForm.name;
        this.bvoInfo.email = this.ruleForm.email;
        this.bvoInfo.phoneNumber = this.ruleForm.phone;
        // TODO
        this.bvoInfo.dsrId = '4';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // if(this.ruleForm.name == '' && this.ruleForm.email == ''
            // && this.ruleForm.phone == ''){
            //   this.initBVOInfo();
            // } else {
              this.updateBVOInfo();
            // }
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
</script>
