<template>
  <div class="pay-container">
    <div class="pay-item-container">
      <el-table
        ref="apTable"
        :data="payList"
        border
        fit
        highlight-current-row
        style="width: 100%">
        <el-table-column align="center" label="Title">
          <template slot-scope="scope">
            <el-button type="text" @click="gotoTitle(scope.row.productTitle)">{{ scope.row.productTitle }}</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Price">
          <template slot-scope="scope">
            <span>{{ scope.row.productPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="QTY">
          <template slot-scope="scope">
            <span>{{ scope.row.productNum }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Sku" >
          <template slot-scope="scope">
            <span>{{ scope.row.productSku }}</span>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="Order No" >
          <template slot-scope="scope">
            <span>{{ scope.row.productOrderNum }}</span>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="Total" >
          <template slot-scope="scope">
            <span>{{ scope.row.total }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="pay-form-container">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="Receiver">
          <el-input v-model="form.receiver" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="Mobile">
          <el-input v-model="form.mobile" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="ZIP Code">
          <el-input v-model="form.zipcode" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="Ship to">
          <el-cascader
            v-model="workarea"
            :options="options"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="Express Fee">
          <el-input :disabled="true" v-model="form.expressfee" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Pay Now</el-button>
        </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>

  import
  {
    getExpressFee
  }
    from '@/network/order-management'

  import area from '@/views/pay/select_area/select_area';


  export default {
    name: 'pay',
    data() {
      return {
        options: areajson,  //areajson为引入外部js文件的json数组名称
        workarea: ['110000', '110100', '110101'],
        form: {
          receiver: 'lilei',
          mobile: '13988888888',
          zipcode: '510000',
          expressfee: 0
        },
        payList: [],
        saoIdList: [],
        address:{
          province: 0,
          city: 0,
          district: 0
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        this.saoIdList.splice(0, this.saoIdList.length);
        for (let i = 0; i<this.payList.length; i++){
          // console.log(this.payList[i].saoId);
          this.saoIdList.push(this.payList[i].saoId)
          // console.log(this.payList[i].saoId);
        }
        console.log(this.saoIdList);
      },
      handleChange(value) {
        console.log(value);
        this.address.province = value[0]
        this.address.city = value[1]
        this.address.district = value[2]
        this.getExpressFee();
      },
      fetchData(){
        this.payList = this.$store.state.order.payList
        this.address.province = this.workarea[0]
        this.address.city = this.workarea[1]
        this.address.district = this.workarea[2]
        this.getExpressFee()
      },
      getExpressFee(){
        this.form.expressfee = 100
        // return new Promise((resolve, reject) => {
        //   getExpressFee({
        //     province: this.address.province,
        //   }).then(response => {
        //     console.log('code');
        //     console.log(response.code)
        //     this.form.expressfee = 100
        //     resolve()
        //     this.$router.push({
        //       path: '/bvo/bvoAvailableMoney'
        //     });
        //     this.loading = false
        //   }).catch(error => {
        //     reject(error);
        //     this.loading = false
        //   })
        // })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pay-container{

  }

  .pay-item-container{
    margin: 3vh auto;
    padding: 3vh;
  }

  .pay-form-container{
    width: 35%;
    margin:0 auto
  }
</style>
