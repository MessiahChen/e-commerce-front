<template>
  <div class="dashboard-container" align="center">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-image :src="imgSrc" width="100%" height="100%" alt="ECO电商平台" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data(){
    return {
      imgSrc:require('@/assets/images/orange-icon.png'),
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
