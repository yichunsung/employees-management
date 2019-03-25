<template>
	<div id="employeesList">

		<!-- 查詢出勤狀況 彈出視窗 -->
		<!-- ==== 查詢出勤狀況 框架底層 ==== -->
		<section class = "detail-window" id = "recordPanel">
		  <!-- ==== 查詢出勤狀況 背景框架層 ==== -->
			
			<div class = "detail-window-bg"></div>

			<!-- ==== 查詢出勤狀況 背景度調整 ==== -->
			<div class = "detail-window-bgOpacity" ></div>
			<!-- ==== 查詢出勤狀況 最上層框架 ==== -->
			<div class = "detail-window-section">

				<main class = "detail-window-content">

					<div class="detail-txt">
						<div class="detail-button" @click="recordWindowClose()">
							<i class="fa fa-times"></i>
						</div>
						<div class="detail-cont">

							<div id = "recordP">
								<span class="detail-title" id ="newsTitle">
									<!--標題-->
									查詢出勤狀況
									<br>
								</span> 
								
								<span class="detail-publishTime" id = "newsTime">
									<!--時間-->
								</span>
								
								<span class="detail-article" id = "newsArticle">
									<!--內容-->
									{{memberRecord.name}}
									<br>
									
									<!--
									<v2-datepicker-range lang="en" format="yyyy-MM-DD" v-model="memberRecord.date"></v2-datepicker-range>
									-->
									開始時間：<br>
									<input type="number" name="startTimeYY" style="width: 8vw;" v-model="memberRecord.startTimeYY">
									年
									<input type="number" name="startTimemm" v-model="memberRecord.startTimemm">
									月
									<input type="number" name="startTimeDD" v-model="memberRecord.startTimeDD">
									日
									<input type="number" name="startTimeHH" v-model="memberRecord.startTimeHH">
									時
									<input type="number" name="startTimeMM" v-model="memberRecord.startTimeMM">
									分
									<!--
									<input type="number" name="startTimeSS" v-model="memberRecord.startTimeSS">
									秒-->
									<br>

									結束時間：<br>
									<input type="number" name="endTimeYY" style="width: 8vw;" v-model="memberRecord.endTimeYY">
									年
									<input type="number" name="endTimemm" v-model="memberRecord.endTimemm">
									月
									<input type="number" name="endTimeDD" v-model="memberRecord.endTimeDD">
									日
									<input type="number" name="endTimeHH" v-model="memberRecord.endTimeHH">
									時
									<input type="number" name="endTimeMM" v-model="memberRecord.endTimeMM">
									分
									<!--
									<input type="number" name="endTimeSS" v-model="memberRecord.endTimeSS">
									秒-->
									<br>
									<button @click="getMemberRecord()">出席狀況查詢</button>
									<br>

								</span>
							</div>

							<div id = "recordP">
								
								<table id="record">
									<tr>
										<th>日期</th>
								    	<th>狀態</th>
								    	<th>時間</th>
								    	<th>備註</th>
								 	</tr>
								 	<tr v-for="(recordData, i) in memberRecord.record">
								    	<td>
								    		{{new Date(recordData.workDate)}}
								    	</td>
								    	<td>
								    		{{recordData.checkType}}
								    	</td>
								    	<td>
								    		{{new Date(recordData.userCheckTime)}}
								    	</td>
								    	<td>
								    		{{recordData.timeResult}}
								    	</td>
							  		</tr>
								</table>
								
							</div>

						</div>
					</div>
				</main>

			</div>
		</section>
		<!-- 查詢出勤狀況 彈出視窗結束 -->




		<!-- 檢視員工資料 彈出視窗 -->
		<!-- ==== 檢視員工資料 框架底層 ==== -->
		<section class = "detail-window" id = "detailWindow">
		  <!-- ==== 檢視員工資料 背景框架層 ==== -->
			
			<div class = "detail-window-bg"></div>

			<!-- ==== 檢視員工資料 背景度調整 ==== -->
			<div class = "detail-window-bgOpacity" ></div>
			<!-- ==== 檢視員工資料 最上層框架 ==== -->
			<div class = "detail-window-section">

				<main class = "detail-window-content">

					<div class="detail-txt">
						<div class="detail-button" @click="windowClose()">
							<i class="fa fa-times"></i>
						</div>
						<div class="detail-cont">
							<div id = "detailP">
								<span class="detail-title" id ="newsTitle">
									<!--標題-->
									{{memberDetail.name}}
								</span> 
								<br>
								<span class="detail-publishTime" id = "newsTime">
									<!--時間-->
								</span>
								<br>
								<span class="detail-article" id = "newsArticle">
									<!--內容-->
									{{memberDetail.position}}
									<br>
									{{memberDetail.mobile}}
									<br>
									{{memberDetail.tel}}
									<br>
									{{memberDetail.email}}
									<br>
									{{memberDetail.remark}}
									<br>

								</span>
							</div>
							<!--
							<div class="detail-pic" id = "newsPic">
								
							</div>
							-->
						</div>
					</div>
				</main>

			</div>
		</section>
		<!-- 檢視員工資料 彈出視窗結束 -->


		<div class="table-frame">
			<div style="width: 50vw;">
				<table id="customers">
					<tr>
						<th>user Id</th>
				    	<th>姓名</th>
				    	<th>檢視詳細資料</th>
				    	<th>操作 </th>
				 	</tr>
				 	<tr v-for="(employeesList, i) in employeesList">
				    	<td>{{employeesList.userid}}</td>
				    	<td>{{employeesList.name}}</td>
				    	<td>
				    		<button @click="windowOpen(i)">檢視</button>
				    		<button @click="recordWindowOpen(i)">出席狀況查詢</button>
				    	</td>
				    	<td>
				    		<button style="cursor: pointer;" @click="deleteMember(i)">刪除</button>
				    		<!--
				    		<button style="cursor: pointer;">修改</button>
				    		-->
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
				employeesList:[],
				
				// 員工詳細資料
				memberDetail:{
					name:'',
					position:'',
					mobile:'',
					tel:'',
					email:'',
					remark:''

				},
				// 員工出缺勤狀況面板
				memberRecord:{
					name:'',
					userId:'',

					startTimeYY: '',
					startTimemm: '',
					startTimeDD: '',
					startTimeHH: '',
					startTimeMM: '',
					startTimeSS: '00',

					endTimeYY: '',
					endTimemm: '',
					endTimeDD: '',
					endTimeHH: '',
					endTimeMM: '',
					endTimeSS: '00',

					dateString:'',
					record:[]
				}


			}
		},
		beforeMount(){
			this.getMemberList();
		},
		mounted(){
			
			
		},
		methods:{
			/*
				查詢員工出缺勤視窗
			*/
			recordWindowOpen(i){
				let _self = this;
				let recordPanel = document.getElementById('recordPanel');
				//_self.memberDetailName = _self.employeesList[i].name;
				recordPanel.style.display = 'block';

				_self.memberRecord.name = _self.employeesList[i].name;
				_self.memberRecord.userId = _self.employeesList[i].userid;
			},
			recordWindowClose(){
				let _self = this;
				let recordPanel = document.getElementById('recordPanel');
				_self.memberRecord.record = [];

				_self.memberRecord.startTimeYY = '';
				_self.memberRecord.startTimemm = '';
				_self.memberRecord.startTimeDD = '';
				_self.memberRecord.startTimeHH = '';
				_self.memberRecord.startTimeMM = '';
				

				_self.memberRecord.endTimeYY = '';
				_self.memberRecord.endTimemm = '';
				_self.memberRecord.endTimeDD = '';
				_self.memberRecord.endTimeHH = '';
				_self.memberRecord.endTimeMM = '';
				
				recordPanel.style.display = 'none';
				
			},
			createDate(){
				let _self = this;

				_self.memberRecord.dateString = String(_self.memberRecord.date[0]);
			},
			/*
				員工詳細資料彈出視窗
			*/
			windowOpen(i) {
				let _self = this;
				let detailWindow = document.getElementById('detailWindow');
				//_self.memberDetailName = _self.employeesList[i].name;
				detailWindow.style.display = 'block';

				_self.getMemberDetail(_self.employeesList[i].userid);
				
				
			},
			windowClose(){
				let _self = this;
				let detailWindow = document.getElementById('detailWindow');

				detailWindow.style.display = 'none';
				_self.memberDetail.name = "";

				_self.memberDetail.position = "";

				_self.memberDetail.mobile = "";

				_self.memberDetail.tel = "";

				_self.memberDetail.email = "";

				_self.memberDetail.remark = "";
			},
			/*
				API 相關
			*/
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
		    			//console.log(tokenData);
		    			_self.token = tokenData.access_token;

		    			let args = "token="+tokenData.access_token;
		    			
		    			_self.ajax('get', "/employeesList", args, function(){
										
							let employeesList = JSON.parse(this.responseText);
							if(!employeesList){
				    			dataErr();
				    		}else{
				    			//console.log(employeesList);
				    			_self.employeesList = employeesList.userlist;
				    			
				    		}
						});
		    		}
				});
			},
			getMemberDetail(userId){
				let _self = this;

				let args = 'token='+_self.token+'&userId='+userId;

				_self.ajax('get', '/get/memberDetail', args, function(){
					let memberDetailData = JSON.parse(this.responseText);
					if(!memberDetailData){
						dataErr();
					}else{
						/*
						memberDetail:{
							name:'',
							position:'',
							mobile:'',
							tel:'',
							email:'',
							remark:''

						}
						*/
						_self.memberDetail.name = memberDetailData.name;

						_self.memberDetail.position = memberDetailData.position;

						_self.memberDetail.mobile = memberDetailData.mobile;

						_self.memberDetail.tel = memberDetailData.tel;

						_self.memberDetail.email = memberDetailData.email;

						_self.memberDetail.remark = memberDetailData.remark;


						//console.log(memberDetailData);
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
			},
			getMemberRecord(){
				let _self = this;
				let userId = _self.memberRecord.userId;

				// 開始時間
				let startTime = _self.memberRecord.startTimeYY+'-'+_self.memberRecord.startTimemm+'-'+_self.memberRecord.startTimeDD+' '+_self.memberRecord.startTimeHH+':'+_self.memberRecord.startTimeMM+':'+_self.memberRecord.startTimeSS;

				// 結束時間
				let endTime = _self.memberRecord.endTimeYY+'-'+_self.memberRecord.endTimemm+'-'+_self.memberRecord.endTimeDD+' '+_self.memberRecord.endTimeHH+':'+_self.memberRecord.endTimeMM+':'+_self.memberRecord.endTimeSS;

				let args = 'token='+_self.token+'&userId='+userId+'&startTime='+startTime+'&endTime='+endTime;

				_self.ajax('get', '/get/record', args, function(){

					let recordData = JSON.parse(this.responseText);
					if(!recordData){
						dataErr();
					}else{
						_self.memberRecord.record = recordData.recordresult;
					}
				});

			}
			
			
		}

	};

</script>
<style scoped>

	/* ICON CSS */
	@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
	@import "https://fonts.googleapis.com/icon?family=Material+Icons";
  	

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

	#record {
	  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
	  border-collapse: collapse;
	  width: 90%;
	}

	#record td, #record th {
	  border: 1px solid #ddd;
	  padding: 8px;
	}

	#record tr:nth-child(even){background-color: #f2f2f2;}

	#record tr:hover {background-color: #ddd;}

	#record th {
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
		width: 5vw;
		padding: 4px;
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
	/*
	===========================
		*** windows layout
	===========================
	*/

	.readMore{
		color: #99ccff;
		cursor: pointer;
	}
		.readMore:hover{
			color: #1a8cff;
		}

	/* 最新消息彈出視窗 */
	.detail-window{
		width:100%; 
		height:100vh; 
		line-height: normal;
		display: none ; 
		position: fixed; 
		top: 0px; left: 0px; z-index: 101;
	}

	.detail-window-bg{
		float: left;
		position: relative;
		z-index: 1;
		height: 100vh;
		width: 100%;
		background-color: black;
		background-size: cover;
		opacity: 0.8;
		top: 0;
		display: block;
		transition: background-image 1s;
	}
	.detail-window-bgOpacity{
		float: left;
		z-index: 2;
		position: relative;
		top: 0vh;
		height: 100vh;
		width: 100%;
		border: solid 0px black;
		background-color: black;
		opacity: 0;
		top:-100vh;
	}

	.detail-window-section{
		float: left;
		z-index: 3;
		position: relative;
		top: 0vh;
		height: 100vh;
		width: 100%;
		
		/*background-color: #333;*/
		opacity: 1;
		top: -200vh;
		
		color: #ffffff;
		
	}
	/* flex box  */
	.detail-window-content{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;

	}
	div.bg-click{
		position: relative;
		z-index: 4;
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
	}
	div.detail-txt{
		position: relative;
		z-index: 5;
		flex: none;
		display: flex; 
		flex-wrap: wrap;
		align-items: flex-start;
		width: 80%;
		height: 70%;
		background-color: #ffffff;
		text-align: center;
		font-size: 40px;
		color: #ffffff;
		border-radius: 20px;
	}
	div.detail-button{
		flex: none;
		width: 50px;height:8%; 
		text-align: center;
		color: #333f;
		cursor: pointer;
		
	}
	div.detail-button:hover{
		color: black;
	}
	div.detail-cont{
		width: 100%;height:92%; 
		flex: none;
		display: flex;
		
	}
	div.detail-cont > div#detailP{
		width: 90%;
		
		color: #333;
		text-align: center;
	}
	div.detail-cont > div#recordP{
		width: 50%;
		margin-left: 5px;
		font-size: 14px;
		color: #333;
		text-align: center;
	}
	/* 最新消息內文樣式*/
	.detail-title{
		font-size: 30px;
	}
	.detail-publishTime{
		font-size: 16px;
	}
	.detail-article{
		font-size: 14px;
	}

	/* 內文樣式 */
	.detail-turnOff-button{
		flex: none;
		margin-left: 5px;
		font-size: 40px;
		cursor: pointer;
	}
	.detail-title{
		flex: none;
	}
	.detail-p{
		flex: none;
	}
	/*
	===========================
		*** windows layout End
	===========================
	*/

</style>