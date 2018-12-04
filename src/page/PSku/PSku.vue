<template>
  <div class="user">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品sku</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="menu_input" style="margin-top: 30px">
        <div>
          <span style="font-size: 16px;margin-right: 10px">产品名称</span>
          <span>
        <el-input
          placeholder="搜索产品名称"
          prefix-icon="el-icon-search"
          v-model="name"
          @keyup.enter.native="getTableData"
        >
        </el-input>
         <button icon="el-icon-search" class="newlyBuild" @click=getTableData>搜索</button>
      </span>
        </div>
      </div>
    </div>

    <div class="center">
      <el-table
        :data="data"
        stripe
        style="width:100%;">
        <el-table-column label="产品sku列表">
          <el-table-column
            prop="title"
            label="sku商品名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="cover"
            label="sku封面"
            align="center">
            <template slot-scope="scope">
              <img :src="scope.row.cover" style='width:80px;height:80px'>
            </template>
          </el-table-column>
          <el-table-column
            prop="cost"
            label="市场价格"
            align="center">
            <template slot-scope="scope">
              <div>{{scope.row.cost/100}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop='price'
            label="出售价格"
            align="center">
            <template slot-scope="scope">
              <div>{{scope.row.price/100}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="distribution"
            label="批发价格"
            align="center">
            <template slot-scope="scope">
              <div>{{scope.row.distribution/100}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="quality"
            label="库存"
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="商品状态"
            align="center">
            <template slot-scope="scope">
              <div :style="{color: scope.row.status==1?'#4F4F4F':'red'}">{{scope.row.status == 1?'启用':'禁用'}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="dateline"
            label="时间"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center">
            <template slot-scope="scope">
              <button @click="editClick(scope.$index, scope.row)" class="modify">修改</button>
              <el-button @click="deleteClick(scope.$index, scope.row)" size="small" class="delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>

      </el-table>
    </div>
    <div class="mask" v-if="mask" @click="mask1"></div>
    <div class="editrole" v-if="mask">
      <div class="editrole_top">
        <div>修改sku产品分类</div>
        <div @click="cancel">
          <button>×</button>
        </div>
      </div>
      <div class="editrole_center">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="市场价格" prop="inputPrice" style="width: 300px">
            <el-input v-model="ruleForm.inputPrice" placeholder="请输入商品名称" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="出售价格" prop="inputSell" style="width: 300px">
            <el-input v-model="ruleForm.inputSell" placeholder="请输入商品名称" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="批发价格" prop="inputTrade_price" style="width: 300px">
            <el-input v-model="ruleForm.inputTrade_price" placeholder="请输入商品名称" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="inputQuality" style="width: 300px">
            <el-input v-model="ruleForm.inputQuality" placeholder="请输入商品名称" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="商品状态" prop="inputStatus" style="width:300px" v-show="this.id">
            <el-radio v-model="ruleForm.inputStatus" label="1">启用</el-radio>
            <el-radio v-model="ruleForm.inputStatus" label="0">禁用</el-radio>
          </el-form-item>
          <el-form-item label="封面图" prop="img_path" width="300px">
            <div class="fileBox">
              <span class="fileinput-button">
              <img :src="ruleForm.srcOthers2" alt="" width="178px" height="178px">
              <i v-show="!ruleForm.srcOthers2" class="el-icon-plus font"></i>
              <input ref="inputFileRef" type='file' name='img_path' @change="getFile($event)"
                     style="width: 178px;height: 178px;">
              </span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="editrole_bottom">
        <button @click="submission()" class="modify1">确定</button>
        <button @click="cancel" class="modify1">取消</button>
      </div>
    </div>
    <div class="block" v-if="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[per_page]"
        :page-size="per_page"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>

    </div>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        data: [],
        mask: false,
        token: "",
        total: 0,
        currentPage: 1,
        page: 1,
        group_id: "",
        name: "",
        per_page: 1,
        pagination: true,
        data4: [],
        ruleForm: {
          inputPrice: '',
          inputSell: '',
          inputTrade_price: '',
          inputQuality: '',
          inputStatus: '',
          srcOthers2: ''
        },
        //添加用户表单验证规则
        rules: {
          inputPrice: [{required: true, message: '请输入市场价格'}],
          inputSell: [{required: true, message: '请输入出售价格'}],
          inputTrade_price: [{required: true, message: '请输入批发价格'}],
          inputQuality: [{required: true, message: '请输入剩余库存'}],
          img_path: [{required: true, message: '请选择图片'}],
          inputStatus: [{required: true, message: '请选择商户状态'}]
        },
        radio: 1,
        id: '',
        imgUrl: '',
        images: ''
      }
    },
    created() {
      this.token = localStorage.getItem('token')
      this.getTableData()
    },
    methods: {
      getTableData() {
        axios.get("/api/admin/skuLists",
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            },
            params: {
              page: this.page,
              title: this.name
            }
          })
          .then(res => {
            this.data = res.data.data.data;
            this.cost = this.data.map(itm => itm.cost / 100)
            this.price = this.data.map(itm => itm.price / 100)
            this.distribution = this.data.map(itm => itm.distribution / 100)

            if (res.data.data.total < res.data.data.per_page) {
              this.pagination = false;
            } else {
              this.pagination = true;
            }
            this.total = res.data.data.total;
            this.per_page = res.data.data.per_page;
          })
      },
      editClick(index, row) {
        this.id = row.id
        this.mask = true;
        axios.get("api/admin/skuEdit_show/" + row.id,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            this.industry = res.data.data;
            let {price, quality, sell, trade_price, cover, status} = this.industry
            this.ruleForm = {
              inputPrice: price,
              inputSell: sell,
              inputTrade_price: trade_price,
              inputQuality: quality,
              srcOthers2: cover,
              inputStatus: `${status}`
            };
          })
      },
      getFile(event) {
        let _this = this;
        var files = (this.ruleForm.img_path = event.target.files[0]);
        if (!event || !window.FileReader) return;
        let reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onloadend = function () {
          _this.ruleForm.srcOthers2 = this.result;
          let testFile = new FormData();
          testFile.append('img', files)
          // console.log(files, event, testFile.get('file'))
          let data = testFile
          axios.post("api/admin/upFile",
            data,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + _this.token,
                'Accept': 'application/vnd.lingmo.v1+json'
              }
            })
            .then(res => {
              _this.imgUrl = res.data.up_file;
              if (res.data.status == 200) {
                _this.$message({
                  message: res.data.message,
                  type: "success",
                })
              } else {
                _this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })

        };
      },
      // 提交
      submission() {
        if (!this.imgUrl) {
          this.images = this.ruleForm.srcOthers2
        } else {
          this.images = this.imgUrl
        }
        let data = {
          id: this.id,
          cover: this.images,
          price: this.ruleForm.inputPrice,
          sell: this.ruleForm.inputSell,
          trade_price: this.ruleForm.inputTrade_price,
          quality: this.ruleForm.inputQuality,
          status: this.ruleForm.inputStatus
        }
        axios.post("api/admin/skuEdit",
          data,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            if (res.data.data.data.status == 200) {
              this.$message({
                message: res.data.data.data.message,
                type: "success",
              })
              this.getTableData()
              this.mask = false
            } else {
              this.$message({
                message: res.data.data.data.message,
                type: "warning",
              })
            }
          })
      },
      mask1() {
        this.mask = false;
      },
      cancel() {
        this.mask = false;
      },
      deleteClick(index, row) {
        axios.get("api/admin/skuDel/" + row.id,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            this.getTableData()
            if (res.data.data.data.status == 200) {
              this.$message({
                message: res.data.data.data.message,
                type: "success",
              })
            } else {
              this.$message({
                message: res.data.data.data.message,
                type: "warning",
              })
            }
          })
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.page = currentPage
        this.getTableData()
      }
    }
  }
</script>
<style scoped>
  .fileBox {
    width: 178px;
  }

  .fileinput-button {
    height: 178px;
    width: 178px;
    float: left;
    display: flex;
    margin-top: 10px;
    margin-right: 50px;
    line-height: 150px;
    position: relative;
    color: #ccc;
    border: 1px solid #ccc;
    background-position: center 50px;
  }

  .fileinput-button input {
    position: absolute;
    left: 0px;
    top: 80px;
    opacity: 0;
    -ms-filter: "alpha(opacity=0)";
  }

  .font {
    font-size: 20px;
    position: absolute;
    left: 80px;
    top: 80px;
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

  editClick {
    background: #008;
  }

  .user {
    text-align: center;
  }

  .menu_input {
    text-align: center;
    margin-top: 10px;
  }

  .menu_input span:nth-child(2) {
    text-align: left;
    display: inline-block;
    width: 419px;
    background: #f7f4fc;
    border-radius: 10px;
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
  }

  .block {
    text-align: left;
    padding-left: 120px;
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
    width: 10rem;
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
    line-height: 60px;
    height: 60px;
    border-bottom: 1px solid #fafafa;
    font-size: 20px;
    display: block;
  }

  .editrole_top div:nth-child(1) {
    text-align: right;
    width: 300px;
    float: left;
    margin-right: 20px;
  }

  .editrole_top div:nth-child(2) {
    color: #00c6b0;
    border: 1px solid #00c6b0;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    float: right;
    margin-right: 10px;
    margin-top: 20px;
    position: relative;
  }

  .editrole_top button {
    position: absolute;
    bottom: -1px;
    right: 1px;
    border: 0;
    color: #00c6b0;
  }

  .editrole_center {
    text-align: left;
    height: 300px;
    overflow: auto;
    margin-top: 20px;
  }

  .editrole_bottom {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #fafafa;
  }

  .block {
    margin-top: 0.8rem;
    width: 100%;
    text-align: center;
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
    width: 86.5px;
    height: 40px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
  }

.delete:focus,.delete:hover{
    background: red !important;
    border: 0 ;
    color: #fff !important;
  }
   .el-button--small, .el-button--small.is-round {
    padding: 8px 17px;
}
.el-button+.el-button {
    margin-left: 0px;
}
</style>
<style>
  .el-table__empty-block {
    min-height: 600px;
  }

  .el-input__inner {
    border: 0;
    background: #fafafa;
    /*border-bottom-left-radius: 10px;*/
    /*border-top-left-radius: 10px;*/
    border-radius: 10px;
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
    width: 70%;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #333;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background: #00c6b0;
    border-color: #00c6b0;
  }
</style>
