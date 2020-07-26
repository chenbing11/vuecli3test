
import IModal from '@/components/h3-imodal/index.vue';
import Vue from 'vue';

// import { VueConstructor } from 'vue/types/umd';
// const $H3IModal: any = {};
// $H3IModal.install = (Vue: VueConstructor<Vue>) => {
//   const Ctor = Vue.extend(H3IModal);
//   const instance: any = new Ctor();
//   instance.$mount();
//   document.body.appendChild(instance.$el);
//   Vue.prototype.$iModal = instance;
// }

let instance = null;
let initInstance = ()=>{
  const Ctor = Vue.extend(IModal);
  instance = new Ctor().$mount();
  document.body.appendChild(instance.$el)
}

const H3IModal = {
  show(options){
    if(!instance){
      initInstance();
    }
    Object.assign(instance,options);
    instance.show()
  }
}

export default H3IModal;