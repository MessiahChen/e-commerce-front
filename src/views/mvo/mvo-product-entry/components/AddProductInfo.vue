<template>
  <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
    <span>需要注意的是内容是默认不居中的</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        centerDialogVisible : false
      }
    },
    props: ['ifAddProduct'],
    watch: {
        // 如果 `question` 发生改变，这个函数就会运行
        ifAddProduct: function (newQuestion, oldQuestion) {
          this.centerDialogVisible = this.ifAddProduct
        }
      }
  }
</script>

<style>
</style>
