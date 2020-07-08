<template>
  <div class="bvo-product-detail">
    <!-- 商品信息展示 -->
    <ShowGoods></ShowGoods>
    <!-- 商品详细展示 -->
    <ShowGoodsDetail></ShowGoodsDetail>
  </div>

</template>

<script>
  import ShowGoods from "@/views/bvo/bvo-product-detail/components/ShowGoods.vue"
  import ShowGoodsDetail from "@/views/bvo/bvo-product-detail/components/ShowGoodsDetail.vue"
  export default {
    name: "bvo-product-detail",
    components: {
      ShowGoods,
      ShowGoodsDetail
    }
  }
</script>

<style>
</style>
