<template>
  <div class="user">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="menu_input" style="margin-top: 30px">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div>
                <span style="font-size: 16px;display: inline-block;margin-top: 10px">选择分类</span>
                <el-cascader
                  placeholder="请选择"
                  :options="categorys"
                  v-model="ruleForm.categorys"
                  :props="props"
                  style="margin-left: 20px;width: 150px"
                ></el-cascader>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <div >
                <span style="font-size: 16px;display: inline-block;margin-top: 10px">选择品牌</span>
                <el-cascader
                  placeholder="请选择"
                  :options="brands"
                  v-model="ruleForm.brands"
                  :props="props"
                  style="margin-left: 20px;width: 150px"
                ></el-cascader>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div>
                <span style="font-size: 16px;margin-right: 10px">产品分类</span>
                <span>
                    <el-input
                      placeholder="搜索商品名称"
                      prefix-icon="el-icon-search"
                      v-model="name"
                      @keyup.enter.native="getTableData"
                       style="width: 150px"
                    >
                    </el-input>
                     <button icon="el-icon-search" class="newlyBuild" @click=getTableData>搜索</button>
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <button class="newlyBuild" @click="addrole()">新建</button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="center">
      <el-table
        :data="data"
        stripe
        style="width:100%;">
        <el-table-column label="产品列表">
          <el-table-column
            prop="ctitle"
            label="分类名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="btitle"
            label="品牌名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="utitle"
            label="单位名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="title"
            label="商品名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="cover"
            label="商户封面"
            align="center">
            <template slot-scope="scope">
              <img :src="scope.row.cover" style='width:50px;height:50px'>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="出售价格"
            align="center">
          </el-table-column>
          <el-table-column
            prop="sell"
            label="市场价格"
            align="center">
          </el-table-column>
          <el-table-column
            prop="trade_price"
            label="批发价格"
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="产品状态"
            align="center">
            <template slot-scope="scope">
              <div :style="{color: scope.row.status==1?'#4F4F4F':'red'}">{{scope.row.status == 1?'启用':'禁用'}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="时间"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <button @click="editClick(scope.$index, scope.row)" size="small" class="modify">修改</button>
              <el-button @click="deleteClick(scope.$index, scope.row)" size="small" class="delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>

      </el-table>
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
        inputRole: "",
        inputRemarks: '',
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
          inputName: '',
          inputSort: '',
          srcOthers2: '',
          inputStatus: '',
          brands: [],
          categorys: []
        },
        //添加用户表单验证规则
        rules: {
          inputName: [{required: true, message: '请填写标题名称'}],
          inputSort: [{required: true, message: '请填写排序'}],
          img_path: [{required: true, message: '请选择图片'}],
          inputStatus: [{required: true, message: '请选择用户状态'}]
        },
        radio: 1,
        first: [],
        two: [],
        three: [],
        value: '',
        value1: '',
        inputRole1: '',
        inputStatus1: '',
        id: '',
        imgUrl: '',
        brands: [],
        categorys: [],
        props: {
          value: 'id',
          label: 'title'
        },
        props1: {
          value: 'id',
          label: 'title'
        },
      }
    },
    created() {
      this.token = localStorage.getItem('token')
      this.getTableData()
    },
     mounted() {
      this.date();
    },
    methods: {
      // 渲染页面
      getTableData() {

        axios.get("/api/admin/good_index",
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            },
            params: {
              page: this.page,
              title: this.name,
              category_id: this.ruleForm.categorys,
              brand_id: this.ruleForm.brands
            }
          })
          .then(res => {
            this.data = res.data.data.data.goods.data;
            this.brands = res.data.data.data.brands;
            this.categorys = res.data.data.data.categorys;
            if (res.data.data.data.goods.total < res.data.data.data.goods.per_page) {
              this.pagination = false;
            } else {
              this.pagination = true;
            }
            this.total = res.data.data.data.goods.total;
            this.per_page = res.data.data.data.goods.per_page;
          })
      },
      editClick(index, row) {
        axios.get("/api/admin/good_edit_show/" + row.id,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            },
          })
          .then(res => {
            console.log(res)
            let edit = res.data.data;
            this.$router.push({path: "/EditPlist", query: {Id: row.id, edit: edit}});
          })
      },
      // 新建
      addrole() {
        this.$router.push({path: "/NewPlist",});
      },
      // submission() {
      //   if (this.id) {
      //     //修改
      //     let data = {
      //       title: this.ruleForm.inputName,
      //       sort: this.ruleForm.inputSort,
      //       cover: this.ruleForm.srcOthers2,
      //       id:this.id,
      //       status:this.ruleForm.inputStatus
      //     }
      //     axios.post("api/admin/category_cate_edit",
      //       data,
      //       {
      //         headers: {
      //           'Authorization': 'Bearer ' + this.token,
      //           'Accept': 'application/vnd.lingmo.v1+json'
      //         }
      //       })
      //       .then(res => {
      //         if (res.data.data.data.status == 200) {
      //           this.$message({
      //             message: res.data.data.data.message,
      //             type: "success",
      //           })
      //           this.getTableData()
      //           this.mask = false;
      //         } else {
      //           this.$message({
      //             message: res.data.data.data.message,
      //             type: "warning",
      //           })
      //         }
      //       })
      //   } else {
      //     let data = {
      //       title: this.ruleForm.inputName,
      //       sort: this.ruleForm.inputSort,
      //       cover: this.imgUrl
      //     }
      //     axios.post("api/admin/category_cate_create",
      //       data,
      //       {
      //         headers: {
      //           'Authorization': 'Bearer ' + this.token,
      //           'Accept': 'application/vnd.lingmo.v1+json'
      //         }
      //       })
      //       .then(res => {
      //         if (res.data.data.data.status == 200) {
      //           this.$message({
      //             message: res.data.data.data.message,
      //             type: "success",
      //           })
      //           this.getTableData()
      //           this.mask = false;
      //         } else {
      //           this.$message({
      //             message: res.data.data.data.message,
      //             type: "warning",
      //           })
      //         }
      //       })
      //   }
      // },
      // getFile(event) {
      //   let _this = this;
      //   var files = (this.ruleForm.img_path = event.target.files[0]);
      //   if (!event || !window.FileReader) return;
      //   let reader = new FileReader();
      //   reader.readAsDataURL(files);
      //   reader.onloadend = function () {
      //     _this.ruleForm.srcOthers2 = this.result;
      //     let testFile = new FormData();
      //     testFile.append('img', files)
      //     // console.log(files, event, testFile.get('file'))
      //     let data = testFile
      //     axios.post("api/admin/upFile",
      //       data,
      //       {
      //         headers: {
      //           'Content-Type': 'multipart/form-data',
      //           'Authorization': 'Bearer ' + _this.token,
      //           'Accept': 'application/vnd.lingmo.v1+json'
      //         }
      //       })
      //       .then(res => {
      //         _this.imgUrl = res.data.up_file;
      //         if(res.data.status == 200){
      //           _this.$message({
      //             message: res.data.message,
      //             type: "success",
      //           })
      //         }else {
      //           _this.$message({
      //             message: res.data.message,
      //             type: "warning",
      //           })
      //         }
      //       })
      //
      //   };
      //
      //   // this.form.img_path = event.target.files[0];
      // },
      // 遮罩层
      mask1() {
        this.mask = false;
      },
      // 取消
      cancel() {
        this.mask = false;
      },
      // 删除
      deleteClick(index, row) {
        axios.get("api/admin/good_del/" + row.id,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          }).then(res => {
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
      // 分页
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
    width: 240px;
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

.delete:hover{
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
