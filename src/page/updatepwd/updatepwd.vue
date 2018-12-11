<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="editrole_center">
      <el-form ref="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="新密码" prop="pwd" style="width: 300px">
          <el-input v-model="pwd" placeholder="请输入密码" style="width:300px" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repwd" style="width: 300px">
          <el-input v-model="repwd" placeholder="请再次输入密码" style="width:300px" type="password"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="editrole_bottom">
      <button @click="submission()" class="modify1">确定</button>
      <button @click="cancel" class="modify1">取消</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pwd: "",
      repwd: "",
      rules: {
        pwd: [{ required: true, message: "请输入密码" }],
        repwd: [{ required: true, message: "请再次输入密码" }]
      }
    };
  },
   mounted() {
      this.date();
    },
  methods: {
    //判断两次密码是否一致
    submission() {
      if (this.pwd !== this.repwd) {
        this.$message({
          message: "两次密码不一致",
          type: "warning"
        });
      } else if (this.pwd == this.repwd) {
        let data = {
          id: localStorage.getItem("id"),
          pwd: this.pwd
        };
        this.$axios
          .post("/api/admin/pwdEdit", data, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/vnd.lingmo.v1+json"
            }
          })
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                message: res.data.data.data.message,
                type: "success"
              });
              this.$router.push("/");
              localStorage.clear()
            } else {
              this.$message({
                message: res.data.data.data.message,
                type: "warning"
              });
            }
          });
      }
    },
    cancel() {
      this.$router.push("/Home");
    }
  }
};
</script>
<style scoped>
#inputs input {
  width: 200px;
  height: 20px;
}

#inputs button {
  width: 40px;
  height: 26px;
  margin-left: 5px;
}

#inputs > div:nth-child(1) button {
  width: 40px;
  height: 26px;
  margin-left: 0;
}

#inputs > div {
  margin-top: 5px;
}

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
  /* height: 300px; */
  overflow: auto;
  margin-top: 20px;
}

.editrole_bottom {
  width: 300px;
  height: 60px;
  line-height: 60px;
  margin: 30px auto;
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
.delete:focus,
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

