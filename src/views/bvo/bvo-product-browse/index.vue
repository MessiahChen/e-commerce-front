<template>
  <div>
    <div class="seckill-content">
      <h3 style="margin-left: 15px;">类型1</h3>
      <el-card class="seckill-item" v-for="product in products" :key="product.proId" shadow="hover">
        <div class="seckill-item-img">
          <router-link to="/goodsList"><img :src="product.image"></router-link>
        </div>
        <div class="seckill-item-info">
          <p>{{product.title}}</p>
          <p>
            <span class="seckill-price text-danger">
              <svg-icon icon-class="money" />{{product.minRetailPrice}}
            </span>
            <span class="seckill-retail-price"><s>{{product.retailPrice}}</s></span>
          </p>
        </div>
      </el-card>
    </div>
  </div>


</template>

<script>
  export default {
    name: "bvo-goods-view",
    data() {
      return {
        currentDate: new Date(),
        products: [{
          proId: 1,
          image: "https://e-commerce-oss.oss-cn-beijing.aliyuncs.com/images/1593771713868.png",
          title: "笔记本电脑",
          minRetailPrice: 123,
          retailPrice: 12
        }],

      };
    }
  }
</script>

<style scoped>
  .seckill-content {
    width: 100%;
    height: 280px;
  }

  .seckill-item {
    width: 16vw;
    height: 38vh;
    margin-top: 15px;
    margin-left: 15px;
    padding: 0px;
    /*   box-shadow: 0px 0px 8px #ccc; */
    cursor: pointer;
    float: left;
  }

  .seckill-item-img {
    width: 200px;
    height: 200px;
    margin: 0px auto;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }

  .seckill-item-img img {
    width: 170px;
    height: 170px;
    margin-left: 15px;
    margin-top: 15px;
    transition: margin-top 0.3s;
  }

  .seckill-item-img:hover img {
    margin-top: 6px;
    transition: margin-top 0.3s;
  }

  .seckill-item-info {
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 12px;
  }

  .seckill-item-info i:first-child {
    font-size: 14px;
  }

  .svg-icon {
    width: 15px;
    height: 15px;
  }

  .seckill-price {
    margin-right: 5px;
    font-size: 25px;
    font-weight: bold;
    color: #ff0000;
  }

  .seckill-retail-price {
    color: #ff0000;
  }
</style>
