<template>
  <div class="modal">
    <div class="header">
       vue插件的方式
    </div>
    <div class="modal-button" @click="showModal">modal插件</div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'List',
  components: {
  },
  data(){
    return {

    }
  },
  methods:{
    showModal () {
      this.$iModal.show({
        // Type: 1,
        // Title: "html测试",
        // Content: `<div>
        //   <h3>黄鹤楼</h3>
        //   <p>昔人已辞黄鹤去</p>
        //   <p>此地空余黄鹤楼</p>
        //   <p>黄鹤一去不复返</p>
        //   <p>白云千载空悠悠</p>
        // </div>`,

        Type: 2,
        Title: '<h3>IFrame 测试</h3>',
        Content: 'https://blog.csdn.net/bomess/article/details/106672400',

        // Type: 3,
        // Title: "",
        // Content: `一起来使用氚云吧`,

        Width: '80%',
        ToolButtons: [{
          callback: () => {},
          text: '取消',
          loading: true,
        }, {
          callback: () => {},
          text: '确定',
          type: 'primary',
        }],
        OnHiddenCallback: function () {
          console.log('before hide');
        },
        OnShowCallback: function () {
          console.log('before show');
        },
      });

      // const iModal: any = $.IModal({
      //   Content: 'http://localhost:5500/home.html#/Home',
      //   OnShowCallback: null,
      //   OnHiddenCallback: null, //挪到IDialogModal执行
      //   Title: '',
      //   ShowHeader: true,
      //   ShowFooter: false,
      //   Type: 2, //2 =IsUrl
      //   Height: 500,
      //   Width: 820,
      //   // Params: params //弹框全局参数
      // });
      // iModal.show();
    }
  }
}
</script>
<style lang="less" >
  // @import "./../assets/style/varibles.less";
  @import "@/assets/style/varibles.less";
  .modal-button{
    width: 150px;
    height:32px;
    line-height: 32px;
    border-radius: 4px;
    border:1px solid #ccc;
  }
</style>
