<template>
  <div style="margin: 60px; white-space:nowrap;">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">

      <h2>Company Information</h2>
      <el-table :data="companyData" border style="width: 100%">
        <el-table-column prop="cn" label="Company Name (CN)" width="180">
        </el-table-column>
        <el-table-column prop="en" label="Company Name (EN)" width="180">
        </el-table-column>
        <el-table-column prop="type" label="GMC Report Type">
        </el-table-column>
        </el-table-column>
        <el-table-column prop="url" label="GMC Report URL">
        </el-table-column>
        </el-table-column>
        <el-table-column prop="coperation" label="Operation">
          <el-button type="primary" circle size='small' icon="el-icon-edit" @click="editCompany('ruleForm')" ></el-button>
        </el-table-column>
      </el-table>

      <h2>Brand Information</h2>
      <el-table :data="brandData" border style="width: 100%">
        <el-table-column align="center" type="selection" width="100px">
        </el-table-column>
        <el-table-column prop="bname" label="Brand Name">
        </el-table-column>
        </el-table-column>
        <el-table-column prop="logo" label="Brand Logo">
        </el-table-column>
        </el-table-column>
        <el-table-column prop="boperation" label="Operation">
          <el-button type="primary" circle size='small' icon="el-icon-edit" @click="editCompany('ruleForm')"></el-button>
          <el-button type="danger" circle size='small' icon="el-icon-delete" @click="editCompany('ruleForm')"></el-button>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        companyData: [{
          cn: '东软',
          en: 'NeuSoft',
          type: 'AAA',
          url: 'www.baidu.com',
          coperation: ''
        }],
        brandData: [{
          bname: 'NAME',
          logo: '',
          boperation:''
        }]
      }
    },
    methods: {
      editCompany(formName) {
        this.$router.push({
          path: '/mvo/mvoCompanyInfo'
        });
      }
    }
  }
</script>
