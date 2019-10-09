<template>
  <div class="app">
    <h1>{{msg}}</h1>
  </div>
</template>

<script> 
  export default {
    data(){
      return {
        msg: 'hello world'
      }
    }
  }
</script>

<style scope>
  .app{
    font-size: 24px;
  }
</style>