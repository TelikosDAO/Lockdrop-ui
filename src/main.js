/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker';
import Vuex from 'vuex';
import 'es6-promise/auto'
import VueSmoothScroll from 'vue2-smooth-scroll'
const Web3 = require("web3");

const infuraKey = "d9cfa420001b4d6a9ab961286b8e7ff7"

if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
}
else if (window.web3)
{   window.web3 = new Web3(window.web3.currentProvider);
}
else { 
    window.web3 = new Web3('https://ropsten.infura.io/v3/' + infuraKey);
}


Vue.use(VueSmoothScroll)
Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.use(Argon);

const store = new Vuex.Store({
  state: {
    abi: require('./contract.abi.json'),
    lockabi: require('./lock.abi.json'),
    telikosabi: require('./telikos.abi.json'),
    contractAddr: "0xA81a85A8A51900Cc7A7bd86DdC6250754480a147",
    telikosAddr: null,
    genesisBlock: 8512076,
    pending: false,
    messages: [],
  },
  mutations: {
    setPending(state, val) {
      state.pending = val      
    },
    addMessage(state, val) {
      state.messages.push(val)
    },
  },
  getters: {
    ABI: state => {
      return state.abi;
    },
    LockABI: state => {
      return state.abi
    },
    TelikosABI: state => {
      return state.telikosabi
    },    
    ContractAddr: state => {
      return state.contractAddr;
    },
    TelikosAddr: state => {
      return state.telikosAddr;
    },    
    Pending: state => {
      return state.pending
    },
    Messages: state => {
      return state.messages
    },
    GenesisBlock: state => {
      return state.genesisBlock;
    },
  }  
});
window.web3.displayWei = function(wei) {
  let deci = -1
  
  if(!wei)
      return "0.0"
  wei = window.web3.utils.fromWei(wei.toString())      
  deci = wei.toString().indexOf('.')
  if(deci  == -1 )
      return wei
  deci = Math.min(wei.length, deci+3)
  return wei.substr(0, deci+1)
  }
window.web3.displayAddr = function(addr) {
  var output = addr.substr(0, 7)
  output = output + '...' + output.substr(-5, 5)
  return output
} ,

new Vue({
  store,  
  router,
  render: h => h(App)
}).$mount("#app");
