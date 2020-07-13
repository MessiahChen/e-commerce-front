<template>
  <div>
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="Title:">
          <el-input v-model="searchForm.searchWord" placeholder="title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">Search</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tab-container">
      <el-tabs v-model="activeName" style="margin-top:2vh;" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="Awaiting Payment" name="AP">
          <el-table
            ref="apTable"
            :data="APlist"
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

            <el-table-column  align="center" label="Created Time" >
              <template slot-scope="scope">
                <span>{{ scope.row.productCreateTime }}</span>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Awaiting Shipment" name="AS">
          <el-table
            :data="ASlist"
            border
            fit
            highlight-current-row
            style="width: 100%">

            <el-table-column align="center" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTitle(scope.row.productTitle)">{{scope.row.productTitle}}</el-button>
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

            <el-table-column  align="center" label="Created Time" >
              <template slot-scope="scope">
                <span>{{ scope.row.productCreateTime }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Operation" >
              <template slot-scope="scope">
                <el-button type="primary" @click="onExpress(scope.row)"> Deliver</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Shiped" name="SH">
          <el-table
            :data="SHlist"
            border
            fit
            highlight-current-row
            style="width: 100%">

            <el-table-column align="center" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTitle(scope.row.productTitle)">{{scope.row.productTitle}}</el-button>
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
                <span>{{ scope.row.productNum * scope.row.productPrice }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Created Time" >
              <template slot-scope="scope">
                <span>{{ scope.row.productCreateTime }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Tracking No" >
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTrack(scope.row.TrackingNo)">{{scope.row.TrackingNo}}</el-button>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Operation" >
              <template slot-scope="scope">
                <el-button type="primary" @click="onCancel(scope.row)"> Cancel</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Completed Orders" name="CO">
          <el-table
            :data="COlist"
            border
            fit
            highlight-current-row
            style="width: 100%">

            <el-table-column align="center" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTitle(scope.row.productTitle)">{{scope.row.productTitle}}</el-button>
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

            <el-table-column  align="center" label="Created Time" >
              <template slot-scope="scope">
                <span>{{ scope.row.productCreateTime }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Tracking No" >
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTrack(scope.row.TrackingNo)">{{scope.row.TrackingNo}}</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Cancelled Orders" name="CA">
          <el-table
            :data="CAlist"
            border
            fit
            highlight-current-row
            style="width: 100%">

            <el-table-column align="center" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTitle(scope.row.productTitle)">{{scope.row.productTitle}}</el-button>
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

            <el-table-column  align="center" label="Created Time" >
              <template slot-scope="scope">
                <span>{{ scope.row.productCreateTime }}</span>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="send-express-container">
      <el-button type="primary" @click="onExpress({saoId:123})" > Deliver</el-button>
      <el-button type="primary" @click="onCancel({saoId:123})" > Cancel</el-button>
      <div class="dialog-container">
        <el-dialog :visible.sync="sendExpressVisiable" title="Send Express">
          <el-form ref="express" :model="express" label-width="120px">
            <el-form-item label="Tracking No：">
              <el-input v-model="express.track" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onConfirm">Confirm</el-button>
              <el-button @click="closeDialog">Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import
  {
    mvoGetSalList,
    sendExpress,
    cancal

  }
    from '@/network/order-management'
  import {changePassword, getAvailableMoney} from "@/network/wallet";

  export default {
    name: "mvo-order-management",
    data() {
      return {
        searchForm: {
          searchWord: ''
        },
        APlist: [],
        ASlist: [],
        SHlist: [],
        COlist: [],
        CAlist: [],
        listQuery: {
          page: 1,
          limit: 5,
          type: this.type
        },
        activeName: 'AP',
        sendExpressVisiable: false,
        express:{
          track: 0,
          saoid: '',
        },
        cancelSaoid: '',
        loading: false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.loading = true;

        return new Promise((resolve, reject) => {
          mvoGetSalList({
            i: 11
          }).then(response => {
            console.log('code');
            console.log(response.code)
            console.log(response)
            // 1. AwaitingPayment 2. AwaitingShipment 3. SHIPPED 已发货 4. Complete 已完成5. Canceled已取消
            for(let i = 0; i < response.data.length; i++){
              if(response.data[i].type == 1){
                // console.log('AP');
                this.APlist.push(response.data[i])
                console.log(this.APlist);
              }
              if(response.data[i].type == 2){
                // console.log('AS');
                this.ASlist.push(response.data[i])
              }
              if(response.data[i].type == 3){
                // console.log('SH');
                this.SHlist.push(response.data[i])
              }
              if(response.data[i].type == 4){
                // console.log('CO');
                this.COlist.push(response.data[i])
              }
              if(response.data[i].type == 5){
                // console.log('CA');
                this.CAlist.push(response.data[i])
              }
            }
            resolve()
            this.loading = false
          }).catch(error => {
            console.log(error);
            reject(error);
            this.loading = false
          })
        })
      },
      // 查询，查询出什么不知道，与后端沟通
      onSearch() {
        console.log(this.searchForm.searchWord);
        console.log(this.ASlist);
        for (let i=0;i<this.ASlist.length;i++){
          // console.log(this.ASlist[i].title);
          if(this.ASlist[i].title.indexOf(this.searchForm.searchWord) != -1){
            console.log(this.ASlist[i].title);
          }
        }
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },

      //跳转到其他界面：title、track
      //转到商品页
      gotoTitle(title){
        // console.log(title);
        this.$router.push({
          // path: '/title'
        });
      },
      //转到快递
      gotoTrack(){
        this.$router.push({
          // path: '/track'
        });
      },

      // 处理 onExpress 相关事件点击
      onExpress(item){
        this.express.saoid = item.saoId
        this.sendExpressVisiable = true;
      },

      // 处理 onCancel 相关事件点击
      onCancel(item){
        this.cancelSaoid = item.saoId
        console.log(this.cancelSaoid);
        return new Promise((resolve, reject) => {
          cancal({
            // 订单编号
            i: this.cancelSaoid
          }).then(response => {
            console.log('code');
            console.log(response.code)
            resolve()
            this.loading = false
          }).catch(error => {
            reject(error);
            this.loading = false
          })
        })

      },

      // 处理 onConfirm 相关事件点击
      onConfirm(){
        this.closeDialog();

        console.log(this.express.saoid);
        console.log(this.express.track)

        return new Promise((resolve, reject) => {
          sendExpress({
            //应该发送订单编号，快递单号
            saoId: 1,
            trackNo: this.express.track
          }).then(response => {
            console.log('code');
            console.log(response.code)
            resolve()
            this.loading = false
          }).catch(error => {
            reject(error);
            this.loading = false
          })
        })

      },

      closeDialog(){
        this.sendExpressVisiable = false;
      },

      depositClick(){
        this.sendExpressVisiable = true;
      },

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
