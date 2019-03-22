<template>
	<div id="adminPage">
		<div class="pageTitle">
			<h1>{{name}}</h1>
		</div>
		<div class="hr">
			<hr>
		</div>
		
		<section class="company-stuts">
			
		</section>


		<section class="news">
			<div>
				<div class="news-block-content" v-for="(newsRight, i) in newsRight">
					<div class="news-block-img"></div>
					<div style="height: 20vh; width: 20vw; margin-left: 1vw;">
						<div style="height: 10vh;">
							{{newsRight.newsTitle}}
						</div>
						<hr>
						<div style="height: 8vh;">
							read more...
						</div>
					</div>
				</div>
			</div>
		</section>
		
		
		
	</div>


</template>
<script>
	export default {
		data(){
			return{
				name:"管理系統-最新消息",
				
				token:'',
				recordData:{},
				newsRight:[
				
					{
						newsTitle:"最新消息1",
						newsPhoto:"",
						newsAbstract:"This is contents for this article, If you don't understand, please set me free to fly in the sky."
					},
					{
						newsTitle:"最新消息2",
						newsPhoto:"",
						newsAbstract:"This is contents for this article, If you don't understand, please set me free to fly in the sky."
					},
					{
						newsTitle:"最新消息3",
						newsPhoto:"",
						newsAbstract:"This is contents for this article, If you don't understand, please set me free to fly in the sky."
					},
					{
						newsTitle:"最新消息4",
						newsPhoto:"",
						newsAbstract:"This is contents for this article, If you don't understand, please set me free to fly in the sky."
					}
				]
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
		    			//console.log(tokenData);
		    			_self.token = tokenData.access_token;
		    			
		    		}
				});
			},
			getListRecord(){
				let _self = this;
				
				let args = "token="+_self.token;

				_self.ajax('get', "/testListRecord", args, function(){
					
					let recordData = JSON.parse(this.responseText);
					if(!recordData){
		    			dataErr();
		    		}else{
		    			//console.log(recordData);
		    			_self.recordData = recordData;
		    			
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
	section.news{
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
		div.news-block-content{
			width: 45vw;
			height:20vh;
			margin-top: 1vh;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
		div.news-block-img{
			width: 20vw;
			height:20vh;
			background-image: url('../img/portfolio-1.jpg');
			background-size:cover;
		}
</style>


