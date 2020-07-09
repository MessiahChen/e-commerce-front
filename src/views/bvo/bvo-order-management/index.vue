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
      <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="Awaiting Payment" name="AP">
          <el-table
            ref="apTable"
            @selection-change="handleAPSelectionChange"
            :data="APlist"
            border
            fit
            highlight-current-row
            style="width: 100%">
            <el-table-column width="80%" align="center" type="selection">
            </el-table-column>
            <el-table-column align="center" width="150px" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTitle(scope.row.productTitle)">{{ scope.row.productTitle }}</el-button>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="Price">
              <template slot-scope="scope">
                <span>{{ scope.row.productPrice }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="QTY">
              <template slot-scope="scope">
                <span>{{ scope.row.productNum }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Sku" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.productSku }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Order No" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.productOrderNum }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Total" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.total }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Operation" width="130">
              <template slot-scope="scope">
                <el-button type="primary" @click="payNow(scope.row)">Pay Now</el-button>
              </template>
            </el-table-column>

          </el-table>
          <el-button type="primary" style="margin-top: 5vh " @click="payNowSelected">Pay Now Above selected</el-button>
        </el-tab-pane>
        <el-tab-pane label="Awaiting Shipment" name="AS">
          <el-table :data="ASlist" border fit highlight-current-row style="width: 100%">

            <el-table-column width="80%" align="center" type="selection">
            </el-table-column>

            <el-table-column align="center" width="150px" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTitle(scope.row.productTitle)">{{scope.row.productTitle}}</el-button>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="Price">
              <template slot-scope="scope">
                <span>{{ scope.row.productPrice }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="QTY">
              <template slot-scope="scope">
                <span>{{ scope.row.productNum }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Sku" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.productSku }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Order No" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.productOrderNum }}</span>
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

            <el-table-column width="80%" align="center" type="selection">
            </el-table-column>

            <el-table-column align="center" width="150px" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTitle(scope.row.productTitle)">{{scope.row.productTitle}}</el-button>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="Price">
              <template slot-scope="scope">
                <span>{{ scope.row.productPrice }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="QTY">
              <template slot-scope="scope">
                <span>{{ scope.row.productNum }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Sku" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.productSku }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Order No" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.productOrderNum }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Total" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.total }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Tracking No" width="110">
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTrack(scope.row.TrackingNo)">{{scope.row.TrackingNo}}</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Completed Orders" name="CO">
          <el-table :data="COlist" border fit highlight-current-row style="width: 100%">

            <el-table-column width="80%" align="center" type="selection">
            </el-table-column>

            <el-table-column align="center" width="150px" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTitle(scope.row.productTitle)">{{scope.row.productTitle}}</el-button>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="Price">
              <template slot-scope="scope">
                <span>{{ scope.row.productPrice }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="QTY">
              <template slot-scope="scope">
                <span>{{ scope.row.productNum }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Sku" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.productSku }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Order No" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.productOrderNum }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Total" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.total }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Tracking No" width="110">
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTrack(scope.row.TrackingNo)">{{scope.row.TrackingNo}}</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Cancelled Orders" name="CA">
          <el-table :data="CAlist" border fit highlight-current-row style="width: 100%">

            <el-table-column width="80%" align="center" type="selection">
            </el-table-column>

            <el-table-column align="center" width="150px" label="Title">
              <template slot-scope="scope">
                <el-button type="text" @click="gotoTitle(scope.row.productTitle)">{{scope.row.productTitle}}</el-button>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="Price">
              <template slot-scope="scope">
                <span>{{ scope.row.productPrice }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="QTY">
              <template slot-scope="scope">
                <span>{{ scope.row.productNum }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Sku" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.productSku }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="Order No" width="110">
              <template slot-scope="scope">
                <span>{{ scope.row.productOrderNum }}</span>
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
  import
  {
    getVosByDsrId
  }
  from '@/network/order-management'

    export default {
      name: "bvo-order-management",
      data() {
        return {
          apSelection:[],
          searchForm: {
            searchWord: ''
          },
          APlist: [],
          ASlist: [],
          SHlist: [],
          COlist: [],
          CAlist: [],
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
        this.fetchData()
      },
      methods: {
        fetchData(){
          this.loading = true;

          return new Promise((resolve, reject) => {
            getVosByDsrId({
              i:1
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

        //跳转到其他界面：title、pay、track
        //转到商品页
        gotoTitle(title){
          // console.log(title);
          this.$router.push({
            // path: '/title'
          });
        },
        //转到付款
        gotoPay(){
          console.log(this.paylist);
          this.$store.commit('order/SET_PAYLIST',this.paylist)
          //跳转到pay界面
          this.$router.push({
            path: '/pay/pay'
          });

        },
        //转到快递
        gotoTrack(){
          this.$router.push({
            // path: '/track'
          });
        },

        // 处理ap的选择
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.apTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.apTable.clearSelection();
          }
        },
        handleAPSelectionChange(val) {
          this.apSelection = val;
        },

        // 处理pay相关事件点击
        payNow(item){
          console.log('bvo-order-management payNow() item');
          this.paylist.splice(0, this.paylist.length)
          this.paylist.push(item)
          this.gotoPay();
        },
        payNowSelected(){
          this.paylist.splice(0, this.paylist.length)
          this.paylist = this.apSelection
          this.gotoPay();
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
