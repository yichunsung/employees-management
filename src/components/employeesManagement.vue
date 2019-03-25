<template>
	<div id="employeesManagement">
		<div class="pageTitle">
			<h1>{{name}}</h1>
		</div>
		<div class="hr">
			<hr>
		</div>

		<div class="table-frame">
			<div class="button" @click="currentView = 'employeesList'">
				查詢公司職員列表
			</div>

			<div class="button" @click="currentView = 'employeesAdd'">
				新增公司職員
			</div>
			
		</div>

		<component :is="currentView"></component>

		
		
	</div>


</template>
<script>

	import employeesList from './employeesManagement/employeesList.vue';
	import employeesAdd from './employeesManagement/employeesAdd.vue';
	import employeesDelete from './employeesManagement/employeesDelete.vue';
	import employeesDetail from './employeesManagement/employeesDetail.vue';

	export default {
		data(){
			return{
				name:"Employees List",
				token:'',
				employeesList:[],
				addNewMember:{
					name:'',
					position:'',
					mobile:'',
					tel:'',
					remark:'',
					email:''
				},
				currentView:'employeesList'
			}
		},
		components:{
			employeesList,
			employeesAdd,
			employeesDelete,
			employeesDetail
		},
		beforeMount(){
			
		},
		mounted(){
			
			//this.getListRecord();
		},
		methods:{
			
		}

	};

</script>
<style scoped>
	div.pageTitle{
		width: 100vw;
		height: 8vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	div.hr{
		width: 100vw;
		height: 8vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
		div.hr>hr{
			width: 100px;
		}

	div.button{
		margin-left: 1vw;
		width: 140px;
		height: 40px;
		background-color: #568ea6;
		color: #f2f2f2;
		
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: 0.4s
	}
		div.button:hover{
			background-color: #457387;
			color: #f2f2f2;
		}
	div.add-new-employees-section{
		margin-top: 2vh; 
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;

	}
	div.form-block{
		width: 50vw;
		display: none;
	}
	div.table-frame{
		margin-top: 3vh;
		width: 100vw;
		
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>