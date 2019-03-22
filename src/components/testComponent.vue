<template>
	<div id="testComponent">
		I'm a {{name}}.
		<br>
		<pre>
			{{message}}
		</pre>
	</div>


</template>
<script>
	export default {
		data(){
			return{
				name:"component",
				corpid: 'dingac8sxofjiifrelz7',
				SSOsecret:"3vJmsSV6624tmHyCc0SfdIgr0BXiWCdDlJEylPjPIOh_eX47WWk8OciJWeX0TLpR",
				owner: 'yichunsung',
				repo: 'vue-webpack-SSR-StepByStep',
				message:{}
			}
		},
		mounted(){
			this.getToken();
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
				let url = "https://oapi.dingtalk.com/gettoken"
				
				let args = "appkey="+_self.corpid+"&appsecret="+_self.SSOsecret;
				
				//let url = 'https://api.github.com/repos/'+_self.owner+"/"+_self.repo+"/readme";
				

				_self.ajax('get', "/testListRecord", "", function(){
					
					let tokenData = JSON.parse(this.responseText);
					if(!tokenData){
		    			dataErr();
		    		}else{
		    			console.log(tokenData);
		    			_self.message = tokenData;
		    			
		    		}
				})
			}
		}
	};

</script>
<style></style>