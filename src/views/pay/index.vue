<template>
  <div class="pay-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="Receiver">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Ship to">
        <el-cascader
          v-model="workarea"
          :options="options"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

  import area from '@/views/pay/select_area/select_area';

  export default {
    name: 'pay',
    data() {
      return {
        options: areajson,  //areajson为引入外部js文件的json数组名称
        workarea: ['110000', '110100', '110101'],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleChange(value) {
        console.log(value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pay-container{

  }
</style>
