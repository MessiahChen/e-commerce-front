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
          <el-table :data="list" border fit highlight-current-row style="width: 100%">
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

            <el-table-column  align="center" label="Operation" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.skuNo }}</span>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Awaiting Shipment" name="AS">
          <el-table :data="list" border fit highlight-current-row style="width: 100%">
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
          <el-table :data="list" border fit highlight-current-row style="width: 100%">
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
          <el-table :data="list" border fit highlight-current-row style="width: 100%">
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
          <el-table :data="list" border fit highlight-current-row style="width: 100%">
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
  import {getOrderMangementData} from '@/network/orderManagement'

  import TabPane from "@/views/bvo/bvo-order-management/TabPane/TabPane";

    export default {
      name: "bvo-order-management",
      components:{
        TabPane
      },
      data() {
        return {
          searchForm: {
            key: ''
          },
          list: null,
          listQuery: {
            page: 1,
            limit: 5,
            type: this.type
          },
          activeName: 'AP',
          loading: false
        }
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
          getOrderMangementData(this.listQuery).then(response => {
            this.list = response.data.items
            this.loading = false
          })
        },
        intoTitle(){
          //转到商品页
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
