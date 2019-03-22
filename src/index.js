import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
// schedule package
import 'v2-datepicker/lib/index.css';   // v2 need to improt css
import V2Datepicker from 'v2-datepicker';

Vue.use(V2Datepicker);

new Vue({
  el: '#app',
  mounted : function(){
  	console.log('Hello Webpack and Vue !');	 
  },
  router,
  components:{
  	App
  },
  template: '<App />'
});