import Vue from 'vue'
import Router from 'vue-router'

// Components
import adminPage from '../components/adminPage.vue';
import employeesManagement from '../components/employeesManagement.vue';
// Coding
Vue.use(Router);

export default new Router({

	routes: [
	    {
			path: '/',
			name: 'adminPage',
			component: adminPage
	    },
	    {
	    	path: '/employeesManagement',
			name: 'employeesManagement',
			component: employeesManagement
	    }
	    
	    
	]	   
});