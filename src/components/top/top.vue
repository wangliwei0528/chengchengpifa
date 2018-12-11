<template>
  <div class="top">
    <div class="cea">
      <el-col :span="19">
        <div class="grid-content bg-purple">1</div>
      </el-col>
      <el-col :span="3">
        <el-dropdown>
						<span>
							<!-- [{{admin.role.title}}] {{admin.mobile}} -->
							<button type="text" class="signOut">管理员管理</button>
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="password" style='color:#00c6b0'>
                <button type="text" @click="updatepwd" class="signOut1">修改密码</button>
              </el-dropdown-item>
							<el-dropdown-item @click="signOut()" style='color:#00c6b0'> 
                <button type="text" @click="signOut()" class="signOut1">退出系统</button>
              </el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
        <!-- <button type="text" class="signOut">管理员管理</button> -->
      </el-col>
      <!-- <el-col :span="2" class="out">
        <button type="text" @click="signOut()" class="signOut1">退出</button>
      </el-col> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: "top",
    data() {
      return {}
    },
    methods: {
      signOut() {
        this.$router.push("/");
        localStorage.clear()
        this.$message({
          message: '退出成功',
          type: "success",
        })
      },
      updatepwd(){
        this.$router.push({name:'updatepwd'})
      }
    }
  }
</script>

<style scoped>
  .signOut1 {
    color: #00c6b0;
    background: #ffff;
    border: 0;
    font-size: 13px;
    font-weight: 500;
  }

  .signOut1:hover {
    color: #00c6b0;
    background: #ffff
  }
  .signOut {
    color: #00c6b0;
    background: #ffff;
    border: 0;
    font-size: 13px;
    font-weight: 500;
  }

  .signOut:hover {
    color: #00c6b0;
    background: #ffff
  }

  body {
    background: #fff;
  }

  .top {
    width: 100%;
    height: 1.2rem;
    padding-left: 240px;
    line-height: 1.2rem;
    color: #fff;
    font-size: 0.36rem;
    text-align: left;
    /*padding-left: 0.4rem;*/
    border-bottom: 2px solid #f9f7fd;
  }

  .el-button--text {
    font-size: 0.24rem;
    margin-left: 0.4rem;
    color: #00c6b0;
  }

</style>
