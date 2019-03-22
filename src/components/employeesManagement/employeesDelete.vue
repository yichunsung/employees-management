<template>
	<div id="employeesList">
		

		<div class="table-frame">
			<div style="width: 50vw;">
				<!--
				<input type="text" placeholder="輸入搜尋內容" v-model="searchValue"/>
				<br>
				<br>
				<div class="button" @click="check">刪除</div>
				-->
				<br>
				<br>

				<table id="customers">
					<tr>
						<th>user Id</th>
				    	<th>姓名</th>
				    	<th>刪除鍵 </th>
				    	
				 	</tr>
				 	<tr v-for="(employeesList, i) in employeesList">
				    	<td>{{employeesList.userid}}</td>
				    	<td>
				    		{{employeesList.name}}
				    		
				    	</td>
				    	<td>
				    		<span style="cursor: pointer;" @click="deleteMember(i)">X</span>
				    	</td>
			  		</tr>
				</table>
			</div>
			
		</div>
		
	</div>


</template>
<script>
	export default {
		data(){
			return{
				name:"Employees List",
				token:'',
				searchValue:'',
				employeesList:[],
				addNewMember:{
					name:'',
					position:'',
					mobile:'',
					tel:'',
					remark:'',
					email:''
				}
			}
		},
		beforeMount(){
			this.getMemberList();
		},
		mounted(){
			
			//this.getListRecord();
		},
		computed:{
			filtered_dbData(){
				const _self = this;
				let searched = _self.employeesList.map(obj => {
				if ( Object.keys(obj).some( key => obj[key].toString().indexOf(_self.searchValue) != -1 ) ){

					return obj;
				}
			  	
				});
				return searched.filter(obj => obj != undefined);
		    }
		},
		methods:{
			check(i){
				const _self = this;
				alert(_self.employeesList[i].userid);
			},
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
			getMemberList(){
				let _self = this;
				
				_self.ajax('get', "/testToken", "", function(){
					
					let tokenData = JSON.parse(this.responseText);
					if(!tokenData){
		    			dataErr();
		    		}else{
		    			
		    			_self.token = tokenData.access_token;
		    			let args = "token="+tokenData.access_token;
		    			_self.ajax('get', "/employeesList", args, function(){
										
							let employeesList = JSON.parse(this.responseText);
							if(!employeesList){
				    			dataErr();
				    		}else{
				    			
				    			_self.employeesList = employeesList.userlist;
				    			
				    		}
						});
		    		}
				});
			},

			deleteMember(i){
				let _self = this;
				let userId = _self.employeesList[i].userid;
				let args ='token='+_self.token+'&userId='+userId;


				_self.ajax('get', "/deleteMember", args, function(){
					
					 if(this.responseText == 'ok'){
					 	console.log('Delete successfully !!');
					 	location.reload();
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
		color: #333;
		
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: 0.4s
	}
		div.button:hover{
			background-color: #457387;
			color: #333;
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
	#customers {
	  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
	  border-collapse: collapse;
	  width: 50vw;
	}

	#customers td, #customers th {
	  border: 1px solid #ddd;
	  padding: 8px;
	}

	#customers tr:nth-child(even){background-color: #f2f2f2;}

	#customers tr:hover {background-color: #ddd;}

	#customers th {
	  padding-top: 12px;
	  padding-bottom: 12px;
	  text-align: left;
	  background-color: #568ea6;
	  color: white;
	}
	input[type=text], select, textarea {
		width: 30vw;
		padding: 12px;
		border: 1px solid #ccc;
		border-radius: 4px;
		resize: vertical;
	}
	input[type=date]{
		width: 30vw;
		padding: 12px;
		border: 1px solid #ccc;
		border-radius: 4px;
		resize: vertical;
	}
	input[type=number]{
		width: 30vw;
		padding: 12px;
		border: 1px solid #ccc;
		border-radius: 4px;
		resize: vertical;
	}
	input[type=email]{
		width: 30vw;
		padding: 12px;
		border: 1px solid #ccc;
		border-radius: 4px;
		resize: vertical;
	}
	input[type=time]{
		width: 30vw;
		padding: 12px;
		border: 1px solid #ccc;
		border-radius: 4px;
		resize: vertical;
	}
	label {
		padding: 12px 12px 12px 0;
		display: inline-block;
	}

	input[type=submit] {
		background-color: #4CAF50;
		color: white;
		padding: 12px 20px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		float: right;
	}

	input[type=submit]:hover {
		background-color: #45a049;
	}	
</style>