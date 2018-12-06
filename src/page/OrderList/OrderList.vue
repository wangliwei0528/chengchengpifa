<template>
  <div class="user">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="menu_input" style="margin-top: 30px">
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <div>
                <span style="font-size: 16px;float: left;margin-right: 4px">订单编号</span>
                <el-input v-model="serial" style="width: 150px;float: left; margin-left: 10px"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple-light">
              <div>
                <span
                  style="font-size: 16px;float: left;margin-top: 5px"
                >收&nbsp;&nbsp;货&nbsp;&nbsp;人</span>
                <el-input v-model="name" style="width: 150px;float: left; margin-left: 10px"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <div>
                <span style="font-size: 16px;float: left;margin-top: 5px">订单状态</span>
                <el-select
                  v-model="ruleForm.logistic"
                  style="width: 150px;float: left; margin-left: 10px"
                >
                  <el-option
                    v-for="item in logistic"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </el-col>
          <el-col :span="3"></el-col>
        </el-row>
      </div>
      <div class="menu_input1">
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <div>
                <span style="font-size: 16px;float: left;margin-top: 5px">联系电话</span>
                <el-input v-model="mobile" style="width: 150px;float: left; margin-left: 10px"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple-light">
              <div>
                <span style="font-size: 16px;float: left;margin-top: 5px;">开始时间</span>
                <div class="block">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择开始时间"
                    style="width: 150px;float: left; margin-left: 10px"
                  ></el-date-picker>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <span style="font-size: 16px;float: left;margin-top: 5px">结束时间</span>
              <div class="block">
                <el-date-picker
                  v-model="value2"
                  type="date"
                  placeholder="选择结束时间"
                  style="width: 150px;float: left;margin-left: 10px"
                ></el-date-picker>
              </div>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <button class="newlyBuild" @click="getTableData">搜索</button>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple"></div>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="center">
      <el-table :data="data" stripe style="width:100%;">
        <el-table-column label="订单列表">
          <el-table-column prop="serial" label="订单编号" align="center"></el-table-column>
          <el-table-column prop="title" label="收货人名称" align="center"></el-table-column>
          <el-table-column prop="logistic_title" label="物流公司" align="center"></el-table-column>
          <el-table-column prop="trade_no" label="物流单号" align="center"></el-table-column>
          <el-table-column prop="mobile" label="收货电话" align="center"></el-table-column>
          <el-table-column prop="status" label="订单状态" align="center">
            <template slot-scope="scope">
              <code v-if="scope.row.status == 0">待支付</code>
              <code v-if="scope.row.status == 1">待发货</code>
              <code v-if="scope.row.status == 2">待收货</code>
              <code v-if="scope.row.status == 3">已完成</code>
              <code v-if="scope.row.status == 4">退款申请中</code>
              <code v-if="scope.row.status == 5">退款已完成</code>
              <code v-if="scope.row.status == 6">已结算</code>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="开始时间" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <button @click="editClick(scope.$index, scope.row)" size="small" class="modify">详情</button>
              <button
                @click="DeliverGoods(scope.$index, scope.row)"
                class="modify"
                :style="{background: scope.row.receive == 0?'#f2524c':'#00c6b0'}"
              >
                <code v-if="scope.row.status == 0">待支付</code>
                <code v-if="scope.row.status == 1">待发货</code>
                <code v-if="scope.row.status == 2">待收货</code>
                <code v-if="scope.row.status == 3">已完成</code>
                <code v-if="scope.row.status == 4">退款申请中</code>
                <code v-if="scope.row.status == 5">退款已完成</code>
                <code v-if="scope.row.status == 6">已结算</code>
              </button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="mask" v-if="mask" @click="mask_"></div>
    <div class="editrole1" v-if="mask2">
      <div class="editrole_top">
        <div>发货</div>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="快递公司 " prop="name" style="width: 300px">
          <el-input v-model="ruleForm.name" placeholder="请输入排序" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="快递单号 " prop="odd" style="width: 300px">
          <el-input v-model="ruleForm.odd" placeholder="请输入排序" style="width: 300px" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div class="editrole_bottom">
        <el-button @click="sure">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </div>
    <div class="editrole" v-if="mask1">
      <div class="editrole_top">
        <div>订单详情</div>
      </div>
      <div class="editrole_center">
        <div class="title">
          <div class="title_left">订单编号</div>
          <div class="title_right">{{list.serial}}</div>
        </div>
        <div class="title">
          <div class="title_left">发&nbsp;&nbsp;货&nbsp;&nbsp;人</div>
          <div class="title_right">{{list.fahuoperson}}</div>
        </div>
        <div class="title">
          <div class="title_left">发货电话</div>
          <div class="title_right">{{list.fahuotel}}</div>
        </div>
        <div class="title">
          <div class="title_left">发货地址</div>
          <div class="title_right">{{list.fahuoaddress}}</div>
        </div>
        <div class="title">
          <div class="title_left">收&nbsp;&nbsp;货&nbsp;&nbsp;人</div>
          <div class="title_right">{{list.title}}</div>
        </div>
        <div class="title">
          <div class="title_left">收货电话</div>
          <div class="title_right">{{list.mobile}}</div>
        </div>
        <div class="title">
          <div class="title_left">收货地址</div>
          <div class="title_right">{{list.address}}</div>
        </div>
        <div class="title">
          <div class="title_left">发货时间</div>
          <div class="title_right">{{list.created_at}}</div>
        </div>
        <div class="title">
          <div class="title_left1">货物名称</div>
          <div class="title_left2" style="height: 2rem">
            <div class="title_right1" v-for="(val,index) in list.goods" :key='index'>{{val.title}} × {{val.qty}}</div>
          </div>
        </div>
        <div class="title">
          <div class="title_left">订单状态</div>
          <div class="title_right" v-if="list.status == 0">待支付</div>
          <div class="title_right" v-if="list.status == 1">待发货</div>
          <div class="title_right" v-if="list.status == 2">待收货</div>
          <div class="title_right" v-if="list.status == 3">已完成</div>
          <div class="title_right" v-if="list.status == 4">退款申请中</div>
          <div class="title_right" v-if="list.status == 5">退款已完成</div>
          <div class="title_right" v-if="list.status == 6">已结算</div>
        </div>
        <div class="title">
          <div class="title_left">货物数量</div>
          <div class="title_right">{{list.goodNums}}</div>
        </div>
        <div v-show="list.status != '0'&&list.status != '1'">
          <div class="title">
            <div class="title_left">物流公司</div>
            <div class="title_right">{{list.logisticName}}</div>
          </div>
          <div class="title">
            <div class="title_left">物流编号</div>
            <div class="title_right">{{list.logistic_number}}</div>
          </div>
          <div class="title">
            <div class="title_left1">物流状态</div>
            <div class="title_left2" style='width:600px'>
              <div class="title_right1">{{list.logisticMessage.Status}}</div>
              <ul>
                <li v-for="(item,index) in goodsStatus" :key="index">
                  <span class="title_right1">{{item.TrackDate}}</span>
                  <span class="title_right1">{{item.ShortStatus}}</span>
                  <span class="title_right1">{{item.TrackStatus}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="editrole_bottom">
        <button @click="cancel" class="modify1">确定</button>
      </div>
    </div>

    <div class="block" v-if="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[per_page]"
        :page-size="per_page"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      goodsStatus: [],
      data: [],
      mask: false,
      mask1: false,
      mask2: false,
      token: "",
      total: 0,
      currentPage: 1,
      page: 1,
      group_id: "",
      name: "",
      per_page: 0,
      pagination: true,
      data2: [],
      logistic: "",
      radio: 1,
      list: [],
      serial: "",
      mobile: "",
      status: "",
      value1: "",
      value2: "",
      ruleForm: {
        name: "",
        odd: "",
        logistic: ""
      },
      rules: {},
      id: ""
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    this.getTableData();
    this.getGoodsList();
  },
  methods: {
    // 地址 json文件
    getGoodsList() {
      this.$axios.get("/static/area.json").then(res => {
        this.data2 = res.data;
      });
    },
    getTableData() {
      axios
        .get("/api/admin/order_index", {
          headers: {
            Authorization: "Bearer " + this.token,
            Accept: "application/vnd.lingmo.v1+json"
          },
          params: {
            page: this.page,
            serial: this.serial,
            name: this.name,
            mobile: this.mobile,
            status: this.ruleForm.logistic,
            starttime: this.value1,
            endtime: this.value2
          }
        })
        .then(res => {
          console.log(res);
          this.data = res.data.data.data.orders.data;
          this.logistic = res.data.data.data.logistic;
          if (
            res.data.data.data.orders.total < res.data.data.data.orders.per_page
          ) {
            this.pagination = false;
          } else {
            this.pagination = true;
          }
          this.total = res.data.data.data.orders.total;
          this.per_page = res.data.data.data.orders.per_page;
        });
    },

    editClick(index, row) {
      axios
        .get("api/admin/order_detail/" + row.id, {
          headers: {
            Authorization: "Bearer " + this.token,
            Accept: "application/vnd.lingmo.v1+json"
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            if (!res.data.data.data) {
              this.list = res.data.data;
              if (this.list.logisticMessage) {
                this.goodsStatus = this.list.logisticMessage.TrackList.reverse();
              }

              this.mask = true;
              this.mask1 = true;
            } else if (res.data.data.status !== 200) {
              this.$message({
                message: res.data.data.data.message,
                type: "warning"
              });
            }
          }
        });
    },
    getCheckedNodes() {
      const vm = this;
      let nodes = vm.$refs.tree.getCheckedNodes(true);
      let xx = nodes.map(itm => itm.id);
      return xx;
    },
    mask_() {
      this.mask = false;
      this.mask1 = false;
      this.mask2 = false;
    },
    cancel() {
      this.mask = false;
      this.mask1 = false;
      this.mask2 = false;
    },
    // 发货
    DeliverGoods(index, row) {
      this.id = row.id;
      if (row.receive == 0) {
        this.mask = true;
        this.mask2 = true;
      }
    },
    sure() {
      let data = {
        name: this.ruleForm.name,
        number: this.ruleForm.odd,
        id: this.id
      };
      axios
        .post("api/admin/logistic_send", data, {
          headers: {
            Authorization: "Bearer " + this.token,
            Accept: "application/vnd.lingmo.v1+json"
          }
        })
        .then(res => {
          if (res.data.data.data.status == 200) {
            this.$message({
              message: res.data.data.data.message,
              type: "success"
            });
            this.getTableData();
            this.mask = false;
            this.mask2 = false;
          } else {
            this.$message({
              message: res.data.data.data.message,
              type: "warning"
            });
          }
        });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.page = currentPage;
      this.getTableData();
    }
  }
};
</script>
<style scoped>
.menu_input1 {
  margin-top: 14px;
}

.menu_input2 {
  margin-top: 130px;
}

.text {
  width: 100%;
  border: 0;
  background: #fafafa;
  padding: 10px;
  border-radius: 10px;
  height: 100px;
}

.select {
  float: left;
  margin-left: 20px;
  width: 200px;
}

.delete {
  border: 1px solid #ff6a6d !important;
  background: #ffffff !important;
  color: #ff6a6d !important;
}

.user {
  text-align: center;
}

.menu_input {
  margin-top: 10px;
}

.el-input {
  width: 328px;
}

.el-button {
  border: 0;
  border-radius: 10px;
  background: #00c6b0;
  color: #fff;
}

.center {
  margin-top: 40px;
}

th {
  font-weight: bold;
  color: #000;
}

.el-table th > .cell {
  position: relative;
  word-wrap: normal;
  text-overflow: ellipsis;
  vertical-align: middle;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 24px;
  color: #333 !important;
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.editrole {
  width: 15.5rem;
  padding: 0 0.2rem 0 0.2rem;
  background: #ffffff;
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  border-radius: 0.1rem;
}

.editrole1 {
  width: 10.5rem;
  padding: 0 0.2rem 0 0.2rem;
  background: #ffffff;
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  border-radius: 0.1rem;
}

.editrole_top {
  text-align: center;
  line-height: 60px;
  height: 60px;
  border-bottom: 1px solid #fafafa;
  font-size: 20px;
}

.editrole_top span {
  position: absolute;
  bottom: -21px;
  right: 2px;
}

.editrole_center {
  text-align: left;
  height: 500px;
  overflow: auto;
  margin-top: 20px;
}

.editrole_center .title {
  width: 400px;
  margin-left: 30px;
  font-size: 15px;
  margin-bottom: 15px;
}

.editrole_center .title_left {
  display: inline-block;
  vertical-align: middle;
}

.editrole_center .title_left1 {
  float: left;
}

.editrole_center .title_left2 {
  width: 300px;
  border-radius: 10px;
  background: #fafafa;
  margin-left: 80px;
  height: 3.5rem;
  overflow: auto;
  padding: 0.2rem;
}

.editrole_center .title_right1 {
  color: #b5b5b5;
  margin-bottom: 10px;
}

.editrole_center .title_right {
  vertical-align: middle;
  display: inline-block;
  background: #fafafa;
  width: 300px;
  height: 40px;
  line-height: 40px;
  margin-left: 20px;
  padding: 0 0.2rem;
  color: #b5b5b5;
  border-radius: 10px;
}

.editrole_bottom {
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #fafafa;
}

.modify {
  background-color: #00c6b0;
  color: #fff;
  border: 0;
  width: 60px;
  height: 30px;
  border-radius: 10px;
}

.modify1 {
  background-color: #00c6b0;
  color: #fff;
  border: 0;
  width: 70px;
  height: 40px;
  border-radius: 10px;
  font-size: 15px;
}

.newlyBuild {
  background-color: #00c6b0;
  color: #fff;
  border: 0;
  width: 90px;
  height: 40px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
}

.el-input__inner {
  border: 0 !important;
  background: #fafafa;
  /*background: #fafafa !important;*/
  border-radius: 10px !important;
}
.el-button--small,
.el-button--small.is-round {
  padding: 8px 17px;
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>
<style>
.el-table__empty-block {
  min-height: 600px;
}

.el-input__inner {
  border: 0 !important;
  background: #fafafa;
  /*background: #fafafa !important;*/
  border-radius: 10px !important;
  /*width: 270px;*/
}

.el-pager li.active {
  color: #00c6b0;
  cursor: default;
}

.el-pager li:hover {
  color: #00c6b0;
  cursor: default;
}

.el-pagination button:hover {
  color: #00c6b0;
}

.el-table thead.is-group th {
  background: #fafafa !important;
}

.el-form-item__content {
  width: 100%;
}

.el-radio__input.is-checked + .el-radio__label {
  color: #333;
}

.el-radio__input.is-checked .el-radio__inner {
  background: #00c6b0;
  border-color: #00c6b0;
}

.el-form-item__label {
  color: #333;
}

.el-button:focus,
.el-button:hover {
  color: #ffffff;
  background: #00c6b0;
  border-radius: 10px;
}

.el-table th > .cell {
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.el-table__empty-block {
  background: #fafafa;
}
</style>
