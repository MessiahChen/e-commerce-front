<template>
  <div class="w960 mgt30">
    <el-cascader
      :options="options"
      change-on-select
    ></el-cascader>
  </div>
</template>

<script scoped>
  import areajson from '@/views/pay/select_area/select_area';  //引入外部js文件
  //注意：上述代码中的 areaJS 可以写为以下任意格式：areaJS/areaJs/areajs
  //建议：注意驼峰命名法的使用
  export default {
    name: "select_area.vue",
    data() {
      return {
        options: areajson,  //areajson为引入外部js文件的json数组名称
      };
    }
  };
</script>

<style>
</style>

