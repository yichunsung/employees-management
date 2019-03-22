<template>
	<div id="employeesAdd">
		
		<div class="add-new-employees-section">
			<div class="form-block" id="formBlock">
				<label for="fname">員工姓名</label>
				<input type="text" name="name" v-model="addNewMember.name"><br>

				<label for="fname">員工職位</label>
				<input type="text" name="position" v-model="addNewMember.position"> <br>

				<label for="fname">員工手機</label>
				<input type="number" name="mobile" v-model="addNewMember.mobile"><br>

				<label for="fname">聯絡電話</label>
				<input type="number" name="tel" v-model="addNewMember.tel"><br>

				<label for="fname">電子郵件</label>
				<input type="email" name="Email" v-model="addNewMember.email"><br>

				<label for="fname">註記欄位</label>
				<input type="text" name="Remark" v-model="addNewMember.remark"><br>

				

				<br>
				<div class="button" @click="addNewMemberToApp()"> 送出 </div>
			</div>
		
		</div>

		<div>
			
		</div>


	</div>
</template>
<script>
	export default {
		data(){
			return{
				token:'',
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
		    			console.log(tokenData);
		    			_self.token = tokenData.access_token;
		    			
		    		}
				});
			},
			addNewMemberToApp(){
				let _self = this;

				let args ='token='+_self.token+'&name='+_self.addNewMember.name+'&position='+_self.addNewMember.position+'&mobile='+_self.addNewMember.mobile+'&tel='+_self.addNewMember.tel+'&remark='+_self.addNewMember.remark+'&email='+_self.addNewMember.email;


				_self.ajax('get', "/addNewMember", args, function(){
					
					 if(this.responseText == 'ok'){
					 	console.log('Save successfully !!');
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
		
	}
	div.table-frame{
		margin-top: 3vh;
		width: 100vw;
		
		display: flex;
		justify-content: center;
		align-items: center;
	}
	input[type=text], select, textarea {
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
	
	label {
		padding: 12px 12px 12px 0;
		display: inline-block;
	}

	
</style>