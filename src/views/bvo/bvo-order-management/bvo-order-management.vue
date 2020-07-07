<template>
  <div>
    <div class="search-form">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="Title:">
        <el-input v-model="searchForm.key" placeholder="title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Search</el-button>
      </el-form-item>
    </el-form>
  </div>
    <div class="tab-container">
      <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="Awaiting Payment" name="AP">
          <el-table
            @selection-change="apChangeCheckBoxValue"
            :data="APlist"
            border
            fit
            highlight-current-row
            style="width: 100%">
            <el-table-column align="center" type="selection">
            </el-table-column>
            <el-table-column align="center" width="150px" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="intoTitle(scope.row.title)">{{scope.row.title}}</el-button>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="Price">
              <template slot-scope="scope">
                <span>{{ scope.row.SALES_PRICE }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="QTY">
              <template slot-scope="scope">
                <span>{{ scope.row.QTY }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Sku" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.skuNo }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Order No" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.ORDER_NO }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Total" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.total }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Operation" width="110">
              <el-button type="primary">Pay Now</el-button>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Awaiting Shipment" name="AS">
          <el-table :data="ASlist" border fit highlight-current-row style="width: 100%">
            <el-table-column
              v-loading="loading"
              align="center"
              label="ID"
              width="65"
              element-loading-text="请给我点时间！"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="150px" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="intoTitle(scope.row.title)">{{scope.row.title}}</el-button>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="Price">
              <template slot-scope="scope">
                <span>{{ scope.row.SALES_PRICE }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="QTY">
              <template slot-scope="scope">
                <span>{{ scope.row.QTY }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Sku" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.skuNo }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Order No" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.ORDER_NO }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Total" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.total }}</span>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Shiped" name="SH">
          <el-table :data="SHlist" border fit highlight-current-row style="width: 100%">
            <el-table-column
              v-loading="loading"
              align="center"
              label="ID"
              width="65"
              element-loading-text="请给我点时间！"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="150px" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="intoTitle(scope.row.title)">{{scope.row.title}}</el-button>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="Price">
              <template slot-scope="scope">
                <span>{{ scope.row.SALES_PRICE }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="QTY">
              <template slot-scope="scope">
                <span>{{ scope.row.QTY }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Sku" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.skuNo }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Order No" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.ORDER_NO }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Total" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.total }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Tracking No" width="110">
              <template slot-scope="scope">
                  <span>{{ scope.row.TrackingNo }}</span>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Completed Orders" name="CO">
          <el-table :data="COlist" border fit highlight-current-row style="width: 100%">
            <el-table-column
              v-loading="loading"
              align="center"
              label="ID"
              width="65"
              element-loading-text="请给我点时间！"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="150px" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="intoTitle(scope.row.title)">{{scope.row.title}}</el-button>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="Price">
              <template slot-scope="scope">
                <span>{{ scope.row.SALES_PRICE }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="QTY">
              <template slot-scope="scope">
                <span>{{ scope.row.QTY }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Sku" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.skuNo }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Order No" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.ORDER_NO }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Total" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.total }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Tracking No" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.TrackingNo }}</span>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Cancelled Orders" name="CA">
          <el-table :data="CAlist" border fit highlight-current-row style="width: 100%">
            <el-table-column
              v-loading="loading"
              align="center"
              label="ID"
              width="65"
              element-loading-text="请给我点时间！"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="150px" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="intoTitle(scope.row.title)">{{scope.row.title}}</el-button>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="Price">
              <template slot-scope="scope">
                <span>{{ scope.row.SALES_PRICE }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="QTY">
              <template slot-scope="scope">
                <span>{{ scope.row.QTY }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Sku" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.skuNo }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Order No" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.ORDER_NO }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Total" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.total }}</span>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {getOrderMangementData} from '@/network/order-management'

  import TabPane from "@/views/bvo/bvo-order-management/TabPane/TabPane";

    export default {
      name: "bvo-order-management",
      components:{
        TabPane
      },
      data() {
        return {
          apCheckBoxData:[],
          searchForm: {
            key: ''
          },
          APlist: null,
          ASlist: null,
          SHlist: null,
          COlist: null,
          CAlist: null,
          payList: [],
          listQuery: {
            page: 1,
            limit: 5,
            type: this.type
          },
          activeName: 'AP',
          loading: false
        }
      },
      created() {
        this.getList()
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        getList(){
          this.loading = true;
          getOrderMangementData().then(response => {
            this.APlist = response.data.items
            this.ASlist = response.data.items
            this.SHlist = response.data.items
            this.COlist = response.data.items
            this.CAlist = response.data.items
            this.loading = false
          })
        },
        intoTitle(){
          //转到商品页
        },
        addID(id){
          console.log(id)
          this.payList.push(id)
          console.log(this.payList);
        },
        apChangeCheckBoxValue(val){
          console.log(val);
          console.log(val[0].id)
          if(this.apCheckBoxData.indexOf(val[0].id)==-1){
            this.apCheckBoxData.push(val)
          }
          console.log(this.apCheckBoxData);
        }
      }
    }
</script>


<style scoped>
  .search-form{
    margin: 3vh;
  }
  .tab-container{
    margin: 3vh;
  }

</style>
