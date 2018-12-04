<template>
  <div class="user">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="menu_input" style="margin-top: 30px">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div style="float: left">
                <span style="font-size: 16px;float: left;margin-top: 5px">请选择地区</span>
                <el-cascader
                  placeholder="请选择"
                  :options="data2"
                  filterable
                  change-on-select
                  v-model="regionsValue"
                  style="margin-left: 20px;width: 300px"
                ></el-cascader>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-start bg-purple-light text-left">
              <div>
                <span style="font-size: 16px;display: inline-block;margin-top: 10px">请选择行业</span>
                <el-cascader
                  placeholder="请选择"
                  :options="industrys1"
                  v-model="industrysValue"
                  :props="props"
                  style="margin-left: 20px;width: 300px"
                ></el-cascader>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="menu_input1">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div style="float: left;margin-left: 50px">
                <span style="font-size: 16px;float: left;margin-top: 5px">账户</span>
                <el-input v-model="mobileName" style="margin-left: 20px;width: 300px" placeholder="请输入账号"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <div>
                <span style="font-size: 16px;margin-right: 10px;">商户名称</span>
                <span>
                  <el-input
                    placeholder="搜索商户名称"
                    v-model="name"
                    @keyup.enter.native="getTableData"
                    class="input_search"
                    style="width: 300px"
                  >
                  </el-input>
                  <button class="newlyBuild" @click=getTableData>搜索</button>
      </span>
                <button class="newlyBuild" @click="addrole()">
                  添加
                </button>
              </div>
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
        <el-table-column label="商品管理列表">
          <el-table-column
            prop="rtitle"
            label="地区名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ititle"
            label="行业名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="商户账号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="title"
            label="商户名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="用户状态"
            align="center">
            <template slot-scope="scope">
              <div :style="{color: scope.row.status==1?'#4F4F4F':'red'}">{{scope.row.status == 1?'启用':'禁用'}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="cover"
            label="商户封面"
            align="center">
            <template slot-scope="scope">
              <img :src="scope.row.cover" style='width:80px;height:80px'>
            </template>
          </el-table-column>
          <el-table-column
            prop="tel"
            label="联系方式"
            align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            label="商户地址"
            align="center">
          </el-table-column>
          <el-table-column
            prop="content"
            label="商户描述"
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
    <div class="mask" v-if="mask" @click="mask1"></div>
    <div class="editrole" v-if="mask">
      <div class="editrole_top">
        <div>添加(修改、详情)地域账户</div>
      </div>
      <div class="editrole_center">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="账户名称" prop="title" style="width: 500px">
            <el-input style="width:240px" v-model="ruleForm.title"></el-input>
            <span style="margin-left: 20px">批发管理中心</span>
          </el-form-item>
          <el-form-item label="选择区域 " prop="selectedOptions" style="width: 400px">
            <div class="block">
              <el-cascader
                placeholder="请选择"
                :options="data2"
                filterable
                change-on-select
                v-model="selectedOptions"
              ></el-cascader>
            </div>
          </el-form-item>
          <el-form-item label="全部行业 " prop="industry_id" style="width: 300px">
            <el-cascader
              :options="industrys"
              v-model="ruleForm.industry_id"
              :props="props1">
            </el-cascader>
          </el-form-item>
          <el-form-item label="账户" prop="mobile" style="width: 300px">
            <el-input v-model="ruleForm.mobile" placeholder="请输入账户"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" style="width: 300px" v-if="!id">
            <el-input v-model="ruleForm.pwd" placeholder="请输入账户"></el-input>
          </el-form-item>
          <el-form-item label="用户状态" prop="inputStatus" style="width:300px" v-show="this.id">
            <el-radio v-model="ruleForm.inputStatus" label="1">启用</el-radio>
            <el-radio v-model="ruleForm.inputStatus" label="0">禁用</el-radio>
          </el-form-item>
          <el-form-item label="封面图" prop="img_path">
            <div class="fileBox">
              <span class="fileinput-button">
              <img :src="srcOthers2" alt="" width="178px" height="178px">
              <i v-if="!srcOthers2" class="el-icon-plus font"></i>
              <input ref="inputFileRef" type='file' name='img_path' @change="getFile($event)"
                     style="width: 178px;height: 178px;">
              </span>
            </div>
          </el-form-item>
          <el-form-item label="详细地址" prop="address" style="width: 300px">
            <el-input v-model="ruleForm.address" placeholder="请输入您的详细地址"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="tel" style="width: 300px">
            <el-input v-model="ruleForm.tel" placeholder="请输入您的联系电话"></el-input>
          </el-form-item>
          <el-form-item label="选择角色 " prop="role_id" style="width: 300px">
            <el-select v-model="ruleForm.role_id" style="width:240px">
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="inputRemarks" style="width: 300px">
            <textarea placeholder="请输入备注" class="text" v-model="ruleForm.content"></textarea>
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
        layout="prev, pager, next"
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
        name: "",
        per_page: 0,
        pagination: true,
        ruleForm: {
          title: '',
          industry_id: [],
          mobile: '',
          pwd: '',
          inputStatus: '',
          address: '',
          tel: '',
          role_id: [],
          content: ''
        },
        //添加用户表单验证规则
        rules: {
          title: [{required: true, message: '请填写商户名称'}],
          selectedOptions: [{required: true, message: '请选择区域'}],
          industry_id: [{required: true, message: '请选择行业'}],
          mobile: [{required: true, message: '请填写商户账号'}],
          pwd: [{required: true, message: '请输入密码'}],
          inputStatus: [{required: true, message: '请添加用户状态'}],
          address: [{required: true, message: '请填写您的详细地址'}],
          tel: [{required: true, message: '请填写您的电话号码'}],
          role_id: [{required: true, message: '请选择角色'}],
          // inputRemarks: [{required: true, message: '请选择地图'}],
          img_path: [{required: true, message: '请选择图片'}],
        },
        radio: 1,
        value: '',
        value1: '',
        regions: [],
        industrys: [],
        roles: '',
        srcOthers2: "",
        selectedOptions: [],
        props: {
          value: 'id',
          label: 'title'
        },
        props1: {
          value: 'id',
          label: 'title'
        },
        imgUrl: '',
        edit: [],
        id: '',
        industrys1: [],
        industrysValue: [],
        mobileName: '',
        regionsValue: [],
        data2: [],
        images: ''
      }
    },
    created() {
      this.token = localStorage.getItem('token')
      this.getTableData()
      this.getGoodsList()
    },
    methods: {
      // 地址 json文件
      getGoodsList() {
        this.$axios.get('/static/area.json').then((res) => {
          this.data2 = res.data
        })
      },
      // 渲染页面
      getTableData() {
        let params = {
          page: this.page,
          title: this.name,
          industry_id: this.ruleForm.industry_id,
          mobile: this.ruleForm.mobile,
          region_id: this.ruleForm.region_id
        }
        const qs = require('qs')
        axios.get("/api/admin/wholesaler_index",
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            },
            params: params,
            paramsSerializer: function (params) {
              return qs.stringify(params)
            }
          })
          .then(res => {
            this.industrys1 = res.data.data.data.industrys;
            this.data = res.data.data.data.wholesalers.data;
            if (res.data.data.data.wholesalers.total < res.data.data.data.wholesalers.per_page) {
              this.pagination = false;
            } else {
              this.pagination = true;
            }
            this.total = res.data.data.data.wholesalers.total
            this.per_page = res.data.data.data.wholesalers.per_page;
          })
      },
// 编辑
      editClick(index, row) {
        this.id = row.id
        this.mask = true;
        // 渲染展示
        axios.get("api/admin/wholesaler_create_show",
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            this.regions = res.data.data.data.regions
            this.roles = res.data.data.data.roles;
            this.industrys = res.data.data.data.industrys;
          })
        // 添加渲染
        axios.get("api/admin/wholesaler_edit_show/" + row.id,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            this.edit = res.data.data;
            let {region_id, p_industry_id, role_id, mobile, title, address, cover, tel, content, pwd, status} = this.edit
            this.ruleForm = {
              role_id: role_id,
              industry_id: p_industry_id,
              mobile: mobile,
              title: title,
              address: address,
              tel: tel,
              content: content,
              pwd: pwd,
              inputStatus: `${status}`
            };

            this.selectedOptions = region_id
            // this.ruleForm.industry_id = p_industry_id
            this.srcOthers2 = cover
          })

      },
      // 新建
      addrole() {
        this.mask = true;
        this.selectedOptions = [];
        this.ruleForm.industry_id = [];
        this.ruleForm.role_id = '';
        this.ruleForm.mobile = "";
        this.ruleForm.title = '';
        this.ruleForm.address = '';
        this.ruleForm.tel = '';
        this.ruleForm.content = '';
        this.srcOthers2 = "";
        this.ruleForm.pwd = "";
        this.id = '';
        axios.get("api/admin/wholesaler_create_show",
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            this.regions = res.data.data.data.regions
            this.roles = res.data.data.data.roles;
            this.industrys = res.data.data.data.industrys;
          })
      },
      // 上传图片
      getFile(event) {
        let _this = this;
        var files = (this.ruleForm.img_path = event.target.files[0]);
        if (!event || !window.FileReader) return;
        let reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onloadend = function () {
          _this.srcOthers2 = this.result;
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

        // this.form.img_path = event.target.files[0];
      },
      // 提交
      submission() {
        if (this.id) {
          if (!this.imgUrl) {
            this.images = this.srcOthers2
          } else {
            this.images = this.imgUrl
          }
          //编辑添加商品
          let data = {
            region_id: this.selectedOptions,
            industry_id: this.ruleForm.industry_id,
            role_id: this.ruleForm.role_id,
            mobile: this.ruleForm.mobile,
            title: this.ruleForm.title,
            address: this.ruleForm.address,
            cover: this.images,
            tel: this.ruleForm.tel,
            content: this.ruleForm.content,
            pwd: this.ruleForm.pwd,
            status: '1',
            id: this.id
          }
          axios.post("api/admin/wholesaler_edit",
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
                this.mask = false;
              } else {
                this.$message({
                  message: res.data.data.data.message,
                  type: "warning",
                })
              }
            })
        } else {
          //添加商品
          let data = {
            region_id: this.selectedOptions,
            industry_id: this.ruleForm.industry_id,
            role_id: this.ruleForm.role_id,
            mobile: this.ruleForm.mobile,
            title: this.ruleForm.title,
            address: this.ruleForm.address,
            cover: this.imgUrl,
            tel: this.ruleForm.tel,
            content: this.ruleForm.content,
            pwd: this.ruleForm.pwd,
            status: this.ruleForm.inputStatus
          }
          axios.post("api/admin/wholesaler_create",
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
                this.mask = false;
              } else {
                this.$message({
                  message: res.data.data.data.message,
                  type: "warning",
                })
              }
            })
        }
      },
      // 遮罩层
      mask1() {
        this.mask = false;
      },
      // 取消、
      cancel() {
        this.mask = false;
      },
      // 删除
      deleteClick(index, row) {
        axios.get("api/admin/wholesaler_del/" + row.id,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            this.getTableData()
            if (res.data.status == 200) {
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

  .menu_input1 {
    margin-top: 14px;
  }

  .menu_input1 span:nth-child(2) {
    text-align: left;
    display: inline-block;
    width: 420px;
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
    width: 11.6rem;
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

  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }

  .el-pagination button:hover {
    color: #00c6b0;
  }

  .el-table thead.is-group th {
    background: #fafafa !important;
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
</style>
