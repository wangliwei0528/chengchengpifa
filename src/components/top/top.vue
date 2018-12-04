<template>
  <div class="top">
    <div class="cea">
      <el-col :span="19">
        <div class="grid-content bg-purple">1</div>
      </el-col>
      <el-col :span="3">
        <button type="text" class="signOut">管理员管理</button>
      </el-col>
      <el-col :span="2" class="out">
        <button type="text" @click="signOut()" class="signOut1">退出</button>
      </el-col>
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
        this.$message({
          message: '退出成功',
          type: "success",
        })
      },
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
