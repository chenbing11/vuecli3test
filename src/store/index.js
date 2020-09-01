import Vue from 'vue'
import Vuex from 'vuex'
import createLoadingPlugin from '../utils/vuex-loading';

Vue.use(Vuex);
function vuelocal(){
  return store=>{
    //查看本地是否保存数据
    //监视 subscribe
    let local= JSON.parse(localStorage.getItem('myVuex')) || store.state;
    store.replaceState(local);
    store.subscribe((mutation,state) => {
      let newState = JSON.parse(JSON.stringify(state));
      localStorage.setItem('myVuex',JSON.stringify(newState));
    })
  }
}

export default new Vuex.Store({
  plugins:[createLoadingPlugin(),vuelocal()],
  state: {
    number:1
  },
  mutations: {
    oneAsync(state,payload){
      state.number = state.number + payload;
    }
  },
  actions: {
    oneAsync ({commit}, payload) {
      return new Promise((resolve, reject)=>{
        setTimeout(() => {
          resolve();
          commit('oneAsync',payload)
        }, 2000);
      })
    }
  },
  modules: {
  }
})
