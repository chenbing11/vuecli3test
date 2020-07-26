<template>
  <a-modal
    v-model="visible"
    wrapClassName="h3-imodal-container"
    :width="Width"
    :footer="null"
    :destroyOnClose="true"
    @ok="handleOk"
    @cancel="handleCancel">
    <slot name="title" v-show="ShowHeader">
      <div v-html="Title" class="header"></div>
    </slot>
    <slot name="defalut">
      <iframe class="mainer" frameborder="0" scrolling="yes" v-if="Type === 2" :src="Content"></iframe>
      <div class="mainer" v-else-if="Type === 1" v-html="Content"></div>
      <div class="mainer" v-else>{{Content}}</div>
    </slot>
    <slot name="footer" v-show="ShowFooter">
      <div class="footer">
        <a-button v-for="(item, index) in ToolButtons" style="margin-left: 20px;"
          :key="index"  :type="item.type" :loading="item.loading" :shape="item.shape"
          @click="handleClick(item)">
          {{ item.text }}
        </a-button>
      </div>
    </slot>
  </a-modal>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
// import { Modal, Button } from '@h3/antd-vue';
import { Modal, Button} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Modal);
Vue.use(Button);
export default {
  name: 'h3-imodal',
  components: {
   'a-modal': Modal,
   'a-button': Button
  },
  props:{
    Title:{
      default:'',
      type: String,
    },
    Type:{
      default: 0,
      type:Number,
    },
    ToolButtons:{
      default: ()=> [],
      type: Array
    },
    Content:{
      default: '',
      type: String
    },
    Width:{
      default: '80%',
      type: String
    },
    OnShowCallback:{
      default:()=>{},
      type:Function
    },
    OnHiddenCallback:{
      default: ()=>{},
      type: Function
    },
    ShowHeader:{
      default: true,
      type: Boolean
    },
    ShowFooter:{
      default:true,
      type:Boolean
    }
  },
  data(){
    return {
      visible:false
    }
  },
  methods:{
    show() {
      this.OnShowCallback();
      this.visible = true;
    },

    hide() {
      this.OnHiddenCallback();
      this.visible = false;
    },

    handleOk() {
      this.hide();
    },

    handleCancel() {
      this.hide();
    },

    handleClick(item) {
      item.callback();
      this.hide();
    }
  }
}
</script>
<style lang="less" >
  .h3-imodal-container {
    .ant-modal {
      top: 40px;
    }
    .ant-modal-body {
      position: relative;
      .header {
        margin-bottom: 15px;
      }
      .mainer {
        width: 100%;
        height: calc(60vh);
        border: none;
        outline: none;
        box-shadow: none;
      }
      .footer {
        margin-top: 15px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
