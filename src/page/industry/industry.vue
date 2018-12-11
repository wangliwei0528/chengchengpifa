<template>
  <div class="user">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>行业分类</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="menu_input" style="margin-top: 30px">
        <div>
          <span style="font-size: 16px;margin-right: 10px">行业名称</span>
          <span>
        <el-input
          placeholder="搜索行业名称"
          prefix-icon="el-icon-search"
          v-model="name"
          @keyup.enter.native="getTableData"
        >
        </el-input>
         <button icon="el-icon-search" class="newlyBuild" @click=getTableData>搜索</button>
      </span>
          <button class="modify1" @click="addrole()">
            新建
          </button>
        </div>
      </div>
    </div>

    <div class="center">
      <el-table
        :data="data"
        stripe
        style="width:100%;">
        <el-table-column label="行业分类列表">
          <el-table-column
            prop="sort"
            label="行业编号"
            align="center">
          </el-table-column>
          <el-table-column prop="title" label="一级行业" align="center">
          </el-table-column>
          <el-table-column prop="title1" label="二级行业" align="center">
          </el-table-column>
          <el-table-column prop="title2" label="三级行业" align="center">
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
            prop="instruction"
            label="行业说明"
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align="center">
            <template slot-scope="scope">
              <div :style="{color: scope.row.status==1?'#4F4F4F':'red'}">{{scope.row.status == 1?'启用':'禁用'}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="备注"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button @click="editClick(scope.$index, scope.row)" size="small" class="modify">修改</el-button>
              <el-button @click="deleteClick(scope.$index, scope.row)" size="small" class="delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>

      </el-table>
    </div>
    <div class="mask" v-if="mask" @click="mask1"></div>
    <div class="editrole" v-if="mask">
      <div class="editrole_top">
        <div>新建(修改)行业管理</div>
        <div @click="cancel">
          <button>×</button>
        </div>
      </div>
      <div class="editrole_center">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="选择级别" prop="inputRole1" style="width:400px">
            <el-radio v-model="inputRole1" label="1">一级</el-radio>
            <el-radio v-model="inputRole1" label="2">二级</el-radio>
            <el-radio v-model="inputRole1" label="3">三级</el-radio>
          </el-form-item>
          <el-form-item label="父类级别 " prop="inputRole2" style="width: 300px" v-if="inputRole1 != 1">
            <el-select v-model="value" style="width: 90px">
              <el-option
                v-for="item in first"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select v-model="value1" style="width: 90px" v-if="inputRole1==3">
              <el-option
                v-for="item in two"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序 " prop="inputSort" style="width: 300px">
            <el-input v-model.number="ruleForm.inputSort" placeholder="请输入排序" style="width: 100px" type='number'></el-input>
          </el-form-item>
          <el-form-item label="封面图" prop="img_path">
            <div class="fileBox">
              <span class="fileinput-button">
              <img :src="ruleForm.srcOthers2" alt="" width="178px" height="178px">
              <i v-show="!ruleForm.srcOthers2" class="el-icon-plus font"></i>
              <input ref="inputFileRef" type='file' name='img_path' @change="getFile($event)"
                     style="width: 178px;height: 178px;">
              </span>
            </div>
          </el-form-item>
          <el-form-item label="名称 " prop="inputName" style="width: 300px">
            <el-input v-model="ruleForm.inputName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="说明 " prop="inputExplain" style="width: 300px">
            <el-input v-model="ruleForm.inputExplain" placeholder="请输入说明"></el-input>
          </el-form-item>
          <el-form-item label="用户状态" prop="inputStatus1" style="width:300px">
            <el-radio v-model="inputStatus1" label="1">启用</el-radio>
            <el-radio v-model="inputStatus1" label="0">禁用</el-radio>
          </el-form-item>
          <el-form-item label="备注" prop="inputRemarks" style="width: 300px">
            <textarea placeholder="请输入备注" class="text" v-model="ruleForm.inputRemarks"></textarea>
          </el-form-item>
        </el-form>
      </div>
      <div class="editrole_bottom">
        <button @click="submission()" class="modify1" size="big">确定</button>
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
          inputRole: "",
          inputRemarks: "",
          inputStatus: "",
          inputExplain: '',
          inputName: '',
          inputSort: '',
          srcOthers2: ''
        },
        //添加用户表单验证规则
        rules: {
          inputRole1: [{required: true, message: '请选择级别'}],
          inputRole2: [{required: true, message: '请选择级别'}],
          inputSort: [{required: true, message: '请填写排序'}],
          inputStatus1: [{required: true, message: '请选择用户状态'}],
          inputName: [{required: true, message: '请填写名称'}],

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
        images:''
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
      getTableData() {
        axios.get("/api/admin/industry_index",
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
        this.inputRole1 = ''
        this.inputStatus1 = ''
        axios.get("api/admin/industry_create_show",
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            this.first = res.data.data.data.first;
            this.two = res.data.data.data.two;
          })
        axios.get("api/admin/industry_edit_show/" + row.id,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            this.industry = res.data.data.data.industry
            let {type, title, content, sort, status, instruction, cover, firstId, secondId} = this.industry
            this.ruleForm = {
              inputName: title,
              inputRemarks: content,
              inputSort: sort,
              inputExplain: instruction,
              srcOthers2: cover
            };
            this.inputRole1 = `${type}`
            this.inputStatus1 = `${status}`
            this.value = firstId;
            this.value1 = secondId;
          })

      },
      getCheckedNodes() {
        const vm = this
        let nodes = vm.$refs.tree.getCheckedNodes(true)
        let xx = nodes.map(itm => itm.id)
        return xx
      },
      addrole() {
        this.inputRole1 = ''
        this.ruleForm.inputName = ''
        this.ruleForm.inputSort = ''
        this.inputStatus1 = ''
        this.ruleForm.inputRemarks = ''
        this.ruleForm.inputExplain = '',
          this.ruleForm.srcOthers2 = ''

        this.mask = true;
        axios.get("api/admin/industry_create_show",
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            this.first = res.data.data.data.first;
            this.two = res.data.data.data.two;
          })
      },
      submission() {
        let value1 = [this.value, this.value1].filter(itm => itm != '' && itm != null)
        if (this.id) {
          //修改
          if (!this.imgUrl) {
            this.images = this.ruleForm.srcOthers2
          } else {
            this.images = this.imgUrl
          }
          let data = {
            type: this.inputRole1,
            title: this.ruleForm.inputName,
            sort: this.ruleForm.inputSort,
            parent: value1,
            status: this.inputStatus1,
            content: this.ruleForm.inputRemarks,
            instruction: this.ruleForm.inputExplain,
            cover: this.images,
            id: this.id
          }
          axios.post("api/admin/industry_edit",
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
          let data = {
            type: this.inputRole1,
            title: this.ruleForm.inputName,
            sort: this.ruleForm.inputSort,
            parent: value1,
            status: this.inputStatus1,
            content: this.ruleForm.inputRemarks,
            instruction: this.ruleForm.inputExplain,
            cover: this.imgUrl
          }
          axios.post("api/admin/industry_create",
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

        // this.form.img_path = event.target.files[0];
      },
      mask1() {
        this.mask = false;
      }
      ,
      cancel() {
        this.mask = false;
      }
      ,
      deleteClick(index, row) {
        axios.get("api/admin/industry_del/" + row.id,
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
      }
      ,
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        axios.get("/api/admin/industry_index",
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            },
            params: {
              page: currentPage
            }
          })
          .then(res => {
            this.data = res.data.data.data;
            this.total = res.data.total;
          })
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
