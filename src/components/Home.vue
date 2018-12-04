<template>
  <div>
    <div class="left">
      <sidebar></sidebar>
    </div>
    <div class="right-container">
      <Top class="top"></Top>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import Top from './top/top'
  import sidebar from './sidebar/sidebar'

  export default {
    name: "Home",
    components: {Top, sidebar}
  }
</script>

<style scoped>
  .left {
    height: 100vh;
    width: 220px;
    position:fixed;
    top: 0;
    left: 0;
  }
  .right-container {
    margin-left: 230px;
    overflow: hidden;
  }
  .main {
    padding: 16px 30px 30px 30px;
  }
</style>
