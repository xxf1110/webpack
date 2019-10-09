import Vue from "vue";
import './css/index.css'
import App from "./app.vue";


if(module.hot){
  module.hot.accept()
} 

new Vue({ 
  render: h => h(App)
}).$mount('#root')