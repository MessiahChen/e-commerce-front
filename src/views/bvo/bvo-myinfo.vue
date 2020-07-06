<template>
  <div style="margin: 60px; white-space:nowrap;">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="Name:" prop="name">
        <el-col :span="8">
          <el-input v-model="ruleForm.name" placeholder="Please enter the name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="E-mail" prop="email">
        <el-col :span="8">
          <el-input v-model="ruleForm.email" placeholder="Please enter the e-mail"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Phone" prop="phone">
        <el-col :span="8">
          <el-input v-model="ruleForm.phone" placeholder="Please enter the phone"></el-input>
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
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          email: '',
          phone:'',
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
        }
      };
    },
    methods: {
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
    }
  }
</script>
