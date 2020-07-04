<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class="footer">
       <div class="center">点击查看</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<style lang="less" >
  // @import "./../assets/style/varibles.less";
  @import "@/assets/style/varibles.less";
  .footer{
     font-size: @baseFontSize;
     height: 60px;
     display: flex;
     justify-content: center;
     align-items: center;
     .center{
       height:30px;
       line-height: 30px;
       background: @basebg;
     }
   }
</style>
