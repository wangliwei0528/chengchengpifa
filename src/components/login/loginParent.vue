<template>
  <div class="body">
    <login></login>
  </div>
</template>

<script>
  import login from "./login";

  export default {
    name: "loginParent",
    components: {
      login
    }
  }
</script>

<style scope>
  .body {
    background: url("/../../../static/image/01.png") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    border-top: 1px solid transparent;
  }
</style>
