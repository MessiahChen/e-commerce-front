<template>
  <div style="margin: 60px; white-space:nowrap;">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">

      <h2>My Stores</h2>

      <el-table :data="amazonData" style="width: 100%; margin-bottom: 30px" :header-cell-style="{color: '#0f81ff'}">
        <el-table-column prop="name" label="Amazon">
        </el-table-column>
      </el-table>

      <el-table :data="ebayData" style="width: 100%" :header-cell-style="{color: '#0f81ff'}">
        <el-table-column prop="name" label="Ebay">
        </el-table-column>
      </el-table>

      <el-form-item style="margin-top: 30px;">
        <el-button type="primary" @click="toChoose('ruleForm')">Add a new store</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        amazonData: [{
          name: 'store_001'
        }, {
          name: 'store_002'
        },{
          name: 'store_003'
        }],
        ebayData: [{
          name: 'store_001'
        }, {
          name: 'store_002'
        },{
          name: 'store_003'
        }]
      }
    },
    methods: {
      toChoose(formName) {
        this.$router.push({
          path: '/bvo/bvoChoose'
        });
      }
    }
  }
</script>
