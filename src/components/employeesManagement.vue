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
			this.getToken();
		},
		mounted(){
			
			//this.getListRecord();
		},
		methods:{
			ajax(method, src, args, callback){
			    let req=new XMLHttpRequest();
			      if(method.toLowerCase()=="post"){
			        req.open(method, src);
			        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			        req.onload=callback;
			        req.send(args);
			      }else{
			        req.open(method, src+"?"+args);
			        req.onload=callback;
			        req.send();
			      }
			},
			getToken(){
				let _self = this;
				
				_self.ajax('get', "/testToken", "", function(){
					
					let tokenData = JSON.parse(this.responseText);
					if(!tokenData){
		    			dataErr();
		    		}else{
		    			//console.log(tokenData);
		    			_self.token = tokenData.access_token;
		    			
		    		}
				});
			},
			getMemberList(){
				let _self = this;
				
				let args = "token="+_self.token;

				_self.ajax('get', "/employeesList", args, function(){
					
					let employeesList = JSON.parse(this.responseText);
					if(!employeesList){
		    			dataErr();
		    		}else{
		    			console.log(employeesList);
		    			_self.employeesList = employeesList.userlist;
		    			
		    		}
				});
			},
			openAddMemberForm(){
				let _self = this;
				let formBlock = document.getElementById('formBlock');
				if(formBlock.style.display != "block"){
					formBlock.style.display = "block";
				}else{
					formBlock.style.display = "none";
				}
				

			},
			addNewMemberToApp(){
				let _self = this;

				let args ='token='+_self.token+'&name='+_self.addNewMember.name+'&position='+_self.addNewMember.position+'&mobile='+_self.addNewMember.mobile+'&tel='+_self.addNewMember.tel+'&remark='+_self.addNewMember.remark+'&email='+_self.addNewMember.email;


				_self.ajax('get', "/addNewMember", args, function(){
					
					 if(this.responseText == 'ok'){
					 	console.log('Save successfully !!');
					 }else{
					 	console.log('error');
					 }
				});
			}
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