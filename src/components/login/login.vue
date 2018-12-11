<template>
  <div>
    <div class="login_body">
      <p class="welcome_text">欢迎进入澄城县产品批发管理中心</p>
      <div class="login_form">
        <p>welcome</p>
        <div class="user"><span style="font-size: 0.3rem">用户名</span>
          <input placeholder="请输入你的账号" type="username" id="username" v-model="username"
                 maxlength="11" @keyup.enter.native="login" style='padding-left: 10px;'/>
        </div>
        <p id='checkUserNameResult'></p>
        <div class="pass"><span style="font-size: 0.3rem">密 码  </span>
          <input placeholder="请输入你的密码" type="password" id="password" v-model="password"
                 maxlength="20" @keyup.enter.native="login" style='padding-left: 10px;'/>
        </div>
        <p id="checkPasswordResult"></p>
        <div class="bottom">
          <el-button @click="login()">登录</el-button>
          <!-- <span>忘记密码 ？</span> -->
        </div>

      </div>
    </div>
    <div class="login_bottom">
      <p>客服:400-123-1254</p>
      <p>技术支持:陕西妈妈树有限公司</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "hello",
    data() {
      return {
        username: "",
        password: "",
        data: '',
        wholesaler: []
      }
    },
    created() {
      localStorage.removeItem('token')
    },
     mounted() {
      this.date();
    },
    methods: {
      login() {
        let validate = this.check()
        if (validate) {
          let data = {
            mobile: this.username,
            pwd: this.password
          }
          this.$axios.post("/api/admin/login", data, {
            headers: {
              'Accept': 'application/vnd.lingmo.v1+json'
            },
          }).then(
            (res) => {
              console.log(res)
              this.wholesaler = res.data.data.wholesaler;
              this.data = res.data;
              this.token = res.data.data.token;
              this.expires_in = res.data.data.expires_in;
              if (res.data.status == 200) {
                this.$message({
                  message: res.data.data.message,
                  type: "success"
                });
                localStorage.setItem('token', this.token)
                localStorage.setItem('cover', this.wholesaler.cover)
                localStorage.setItem('title', this.wholesaler.title)
                localStorage.setItem('id', this.wholesaler.id)
                localStorage.setItem('expires_in', this.expires_in)
                this.$router.push({path: "/Home", query: {wholesaler: this.wholesaler}});
                // this.$router.push("/Home");
              } else {
                this.$message({
                  message: res.data.data.message,
                  type: "warning"
                });
              }
            })
        }
        // this.$router.push("/Home");
      },
      check() {
        var $username = document.getElementById("username").value;
        var $userpwd = document.getElementById("password").value;
        var checkPasswordResult = document.getElementById("checkPasswordResult");
        if ($username == '') {
          checkUserNameResult.innerHTML = "*用户名不能为空";
          return false;
        } else if (/^[A-Za-z\u4e00-\u9fa5]\{1\}[\s\S]*$/.test($username)) {
          checkUserNameResult.innerHTML = "*用户名格式不正确";
          return false;
        } else if ($userpwd == '') {
          checkPasswordResult.innerHTML = "*密码不能为空";
          return false;
        } else if ($userpwd.length < 6 || $userpwd.length > 20) {
          checkPasswordResult.innerHTML = "*密码6-20个字符之间";
          return false;
        } else {
          checkUserNameResult.innerHTML = "";
          checkPasswordResult.innerHTML = ""
          return true;
        }
      }
    }

  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    list-style: none;
    text-decoration: none;
  }

  .login_body {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #FFF;
    text-align: center;
  }

  .login_bottom {
    width: 100%;
    position: fixed;
    text-align: center;
    bottom: 0;
    color: #FFF;
    margin-bottom: 20px;
  }

  .welcome_text {
    font-size: 30px;
  }

  .login_form {
    margin-top: 20px;
    margin-left: 20px;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }

  .login_form p:nth-child(1) {
    font-size: 24px;
  }

  .login_form label {
    display: block;
    margin: 20px 0;
  }

  .login_form label input {
    padding: 5px;
    border-radius: 2px;
    border: 1px solid #000;
    /*box-shadow: 0 0 0.1rem #fff;*/
  }

  .user {
    background: rgba(255, 255, 255, 0.2);
    margin: 20px;
    border-radius: 6px;
    padding: 6px 2px 8px 2px;
  }

  .pass {
    background: rgba(255, 255, 255, 0.2);
    margin: 20px;
    border-radius: 6px;
    padding: 6px 2px 8px 2px;
  }

  #checkUserNameResult {
    height: 0.05rem;
    margin-left: 2rem;
    line-height: 0.05rem;
    color: #ff0005;
    font-size: 0.26rem;
    text-align: left;
  }

  #checkPasswordResult {
    height: 0.05rem;
    margin-left: 2rem;
    line-height: 0.05rem;
    color: #ff0005;
    font-size: 0.26rem;
    text-align: left;
  }

  .el-button {
    color: #fff;
    width: 140px;
    padding: 0.2rem 0.46rem;
    margin-top: 0.3rem;
    margin-left: 40px;
    font-size: 0.3rem;
    background: rgba(255, 255, 255, 0.2);
    border: 0;
  }

  .el-input {
    color: #ffffff;
    padding: 0 0.1rem;
    height: 0.6rem;
    width: 5rem;
  }

  .bottom {
    width: 90%;
    margin-left: 16px;
    margin-bottom: 20px;
  }

  .bottom span {
    float: right;
    margin-top: 30px;
  }

  input {
    background: rgba(255, 255, 255, 0) !important;
    font-size: 14px;
    height: 30px;
    border: 0;
    color: #ffffff;
  }

</style>
<style>

  .el-button:focus, .el-button:hover {
    background: rgba(255, 255, 255, 0.4) !important;
    border: 0 !important;
    color: #fff !important;
  }
</style>
