<template>
  <div class="user">
    <div class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="menu_input" style="margin-top: 30px">
        <span style="font-size: 16px;margin-right: 10px">菜单名称</span>
        <span>
          <el-input
            placeholder="搜索菜单名称"
            prefix-icon="el-icon-search"
            v-model="name"
            @keyup.enter.native="getTableData"
          ></el-input>
          <button icon="el-icon-search" class="newlyBuild" @click="getTableData">搜索</button>
        </span>
        <button class="modify1" @click="addrole()">新建</button>
      </div>
    </div>

    <div class="center">
      <el-table :data="data" stripe style="width:100%;">
        <el-table-column label="角色管理列表">
          <el-table-column prop="id" label="角色ID" align="center"></el-table-column>
          <el-table-column prop="title" label="角色" align="center"></el-table-column>
          <el-table-column prop="content" label="备注" align="center"></el-table-column>
          <el-table-column prop="created_at" label="时间" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <button @click="editClick(scope.$index, scope.row)" size="small" class="modify">修改</button>
              <el-button
                @click="deleteClick(scope.$index, scope.row)"
                size="small"
                class="delete"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="mask" v-if="mask" @click="mask1"></div>
    <div class="editrole" v-if="mask">
      <div class="editrole_top">
        <div>新建(修改)角色管理</div>
        <div @click="cancel">
          <button>×</button>
        </div>
      </div>
      <div class="editrole_center">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="inputRole" style="width:300px">
            <el-input v-model="ruleForm.inputRole" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="备注 " prop="inputRemarks" style="width: 300px">
            <el-input v-model="ruleForm.inputRemarks" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="权限 " prop="tips" style="width: 300px">
            <div class="block">
              <el-tree :data="data4" show-checkbox node-key="id" ref="tree">
                <span class="custom-tree-node" slot-scope="{node, data}">{{node.label}}</span>
              </el-tree>
            </div>
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
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
      id: 0,
      pagination: true,
      data4: [],
      data1: [],
      ruleForm: {
        inputRole: "",
        inputRemarks: ""
      },
      //添加用户表单验证规则
      rules: {
        inputRole: [{ required: true, message: "请输入角色名称" }],
        inputRemarks: [{ required: true, message: "请输入角色备注" }],
        tips: [{ required: true, message: "请选择权限" }]
      },
      id: ""
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    this.getTableData();
  },
  mounted() {
    this.date();
  },
  methods: {
    getTableData() {
      //角色管理列表
      axios
        .get("/api/admin/role_index", {
          headers: {
            Authorization: "Bearer " + this.token,
            Accept: "application/vnd.lingmo.v1+json"
          },
          params: {
            page: this.currentPage,
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
        });
    },

    editClick(index, row) {
      this.id = row.id;
      this.mask = true;
      //展示权限显示
      axios
        .get("api/admin/role_create_show", {
          headers: {
            Authorization: "Bearer " + this.token,
            Accept: "application/vnd.lingmo.v1+json"
          }
        })
        .then(res => {
          // console.log(res)
          let resdata = [];
          this.treeData(res.data.data, resdata);
          this.data4 = resdata;
        });
      //角色编辑展示
      axios
        .get("api/admin/role_edit_show/" + row.id, {
          headers: {
            Authorization: "Bearer " + this.token,
            Accept: "application/vnd.lingmo.v1+json"
          }
        })
        .then(res => {
          console.log(res)
          this.data1 = res.data.data.roles;
          this.getTableData();
          let { title, content } = this.data1;
          this.ruleForm = {
            inputRole: title,
            inputRemarks: content
          };
          this.$refs.tree.setCheckedKeys(res.data.data.permissions);
        });
    },
    //得到所有id
    getCheckedNodes() {
      const vm = this;
      let nodes = vm.$refs.tree.getCheckedNodes(true);
      let id = nodes.map(itm => itm.id);
      return id;
    },
    addrole() {
      //新建角色
      this.mask = true;
      this.ruleForm.inputRole = "";
      this.ruleForm.inputRemarks = "";
      axios
        .get("api/admin/role_create_show", {
          headers: {
            Authorization: "Bearer " + this.token,
            Accept: "application/vnd.lingmo.v1+json"
          }
        })
        .then(res => {
          console.log(res)
          let resdata = [];
          this.treeData(res.data.data, resdata);
          this.data4 = resdata;
        });
    },
    submission() {
      if (this.id) {
        //修改确定提交
        let datas = {
          title: this.ruleForm.inputRole,
          data: this.getCheckedNodes(),
          content: this.ruleForm.inputRemarks,
          id: this.data1.id
        };
        axios
          .post("api/admin/role_edit", datas, {
            headers: {
              Authorization: "Bearer " + this.token,
              Accept: "application/vnd.lingmo.v1+json"
            }
          })
          .then(res => {
            if (res.data.data.status == 200) {
              this.$message({
                message: res.data.data.message,
                type: "success"
              });
              this.getTableData();
              this.mask = false;
            } else {
              this.$message({
                message: res.data.data.message,
                type: "warning"
              });
            }
          });
      } else {
        //添加确定提交
        let datas = {
          title: this.ruleForm.inputRole,
          data: this.getCheckedNodes(),
          content: this.ruleForm.inputRemarks
        };
        axios
          .post("api/admin/role_create", datas, {
            headers: {
              Authorization: "Bearer " + this.token,
              Accept: "application/vnd.lingmo.v1+json"
            }
          })
          .then(res => {
            if (res.data.data.status == 200) {
              this.$message({
                message: res.data.data.message,
                type: "success"
              });
              this.getTableData();
              this.mask = false;
            } else {
              this.$message({
                message: res.data.data.message,
                type: "warning"
              });
            }
          });
      }
    },
    treeData(data, container) {
      const vm = this;
      data.forEach(itm => {
        let { id, child, title, parent } = itm;
        let tmpItm = {
          id: id,
          label: title,
          children: [],
          parent: parent
        };
        if (itm.child && itm.child.length > 0) {
          vm.treeData(itm.child, tmpItm.children);
        }
        container.push(tmpItm);
      });
    },
    mask1() {
      this.mask = false;
    },
    cancel() {
      this.mask = false;
    },
    deleteClick(index, row) {
      //删除角色
      axios
        .get("api/admin/role_del/" + row.id, {
          headers: {
            Authorization: "Bearer " + this.token,
            Accept: "application/vnd.lingmo.v1+json"
          }
        })
        .then(res => {
          if (res.data.status == 200) {
            if (!res.data.data) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
            } else if (res.data.data.status !== 200) {
              this.$message({
                message: res.data.data.data.message,
                type: "warning"
              });
            }
            this.getTableData();
          }
        });
    },
    handleCurrentChange(currentPage) {
      //分页
      this.currentPage = currentPage;
      this.page = currentPage;
      this.getTableData();
    }
  }
};
</script>
<style scoped>
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

.role {
  font-size: 0.3rem;
  display: inline;
}

.role1 {
  font-size: 0.3rem;
  text-align: left;
  margin-left: 50px;
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
.delete:hover {
  background: red !important;
  border: 0;
  color: #fff !important;
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
  background: #fafafa !important;
  border-bottom-left-radius: 10px !important;
  border-top-left-radius: 10px !important;
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

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #00c6b0 !important;
  border-color: #00c6b0 !important;
}
</style>
