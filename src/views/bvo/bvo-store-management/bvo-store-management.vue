<template>
  <div style="margin: 60px; white-space:nowrap;">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item>
        <el-button type="primary" @click="toChoose('ruleForm')">Add a new store</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
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
