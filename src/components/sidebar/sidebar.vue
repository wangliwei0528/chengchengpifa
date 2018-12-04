<template>
  <div class="side">
    <div class="top">
      <img :src="this.cover"/>
      <p>{{this.title}}批发管理中心</p>
    </div>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="side-menu"
          background-color="rgba(0,198,176,0.1)"
          text-color="#00c680"
          active-text-color="#978bc8"
          :unique-opened="true"
          @select="selectMenu"
        >
          <el-submenu v-for="(val,index) in data" :key="index" :index="val.path?val.path:(index + '')">
            <template slot="title">
              <!--<i class="el-icon-caret-bottom"></i>-->
              <span style="padding-left: 20px">{{val.title}}</span>
            </template>
            <el-menu-item-group v-for="(val1,index) in val.child" :key="index">
              <el-menu-item :index="val1.path?val1.path:(index + '')" class="menu" style='padding: 0 20px 50px 70px'>
                {{val1.title}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  //过滤器
  function deelData(arr, curr) {
    let result = arr.filter(item => item.mata.title === curr.title)
    if (result.length > 0) {
      return result[0].path
    }
    return null
  }

  export default {
    name: "sidebar",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        data: [],
        title: '',
        cover:''
      }
    },
    created() {
      this.token = localStorage.getItem('token')
      this.cover = localStorage.getItem('cover')
      this.title = localStorage.getItem('title')
      this.$axios.get("/api/admin/module_index",
        {
          headers: {
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/vnd.myapp.v1_json'
          },
        }).then(
        (res) => {
          let childrens = this.$router.options.routes[1].children;
          for (let i in res.data.data) {
            res.data.data[i].path = null
            if (res.data.data[i].child.length > 0) {
              for (let l in res.data.data[i].child) {
                let child = res.data.data[i].child[l]
                child.path = deelData(childrens, child)
              }
            } else {
              res.data[i].path = deelData(childrens, res.data[i])
            }
          }
          this.data = res.data.data;
        })
    },
    methods: {
      selectMenu(index) {
        this.$router.push(index)
      }
    }

  }
</script>

<style scoped>
  .el-col-12 {
    width: 100%;
  }

  .side {
    width: 220px;
    height: 100vh;
    background-color: #1f183c;
    position: relative;
  }

  .top {
    text-align: center;
    width: 100%;
    height: 200px;
    /*margin-top: 40px;*/
    padding-top: 40px;
  }

  .top p {
    color: #fff;
    font-size: 16px;
    margin-top: 10px;
  }

  .side .top img {
    width: 80px;
    height: 80px;
  }

  .tac {
    width: 220px;
  }

  .menu {
    width: 100%;
    height: 0.5rem;
    padding-left: 70px;
    font-size: 0.28rem;
  }


</style>
<style>
  .side-menu {
    border-right: 0;
  }

  .el-menu-item-group .el-menu-item-group__title {
    padding: 0;
  }
  .el-submenu__title:hover {
    background-color: #302459 !important;
  }

  .el-menu-item {
    background-color: #1e183b !important;
  }

  .el-menu-item:hover {
    color: rgb(151, 139, 200) !important;
    /* background-color: rgba(0, 198, 176, 0.1) !important; */
  }
  .el-menu-item, .el-submenu__title{
    height: 50px;
    line-height: 50px;
  }
  .el-submenu .el-menu-item{

  }

</style>

