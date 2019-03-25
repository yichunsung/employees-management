// app.js
const express = require('express');


const app = express();
const request = require('request'); // 載入request模組


app.use(express.static(__dirname +"/dist"));

// # For cross-domain
// ## Add headers
app.use(function (req, res, next) {


    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/', function(req, res){
	res.sendFile(__dirname+'/dist/index.html');
});

app.get('/testToken', function(req, res){
	request({
		url:'https://oapi.dingtalk.com/gettoken?appkey=dingac8sxofjiifrelz7&appsecret=EKXyUfnhrl2NtcBynECGNBkF6Oed88pQwogBQnn2H13Jkbq0dgaWc3dGPKfygcsh', 
		json: true
	}, function(error, response, body){
	  // body是回傳的json物件，使用JSON.stringify()轉為json字串
	  res.send(JSON.stringify(body, undefined, 2)); 
	});
});

app.get('/testListRecord', function(req, res){
	let token = req.query.token;
	request.post({
		url:'https://oapi.dingtalk.com/attendance/listRecord?access_token='+token, 
		json: true,
		body:{
		    "userIds": ["252343161523567844"],
		    "checkDateFrom": "2019-02-28 00:00:00",
		    "checkDateTo": "2019-03-06 00:00:00",
		    "isI18n":"true"
		}
	}, function(error, response, body){
	  // body是回傳的json物件，使用JSON.stringify()轉為json字串
	  console.log(JSON.stringify(body, undefined, 2)); 
	  console.log(token);
	  res.send(JSON.stringify(body, undefined, 2)); 
	});
});

app.get('/employeesList', function(req, res){
	let token = req.query.token;
	request.get({
		url:'https://oapi.dingtalk.com/user/simplelist?access_token='+token+'&department_id=1', 
		json: true
		
	}, function(error, response, body){
	  // body是回傳的json物件，使用JSON.stringify()轉為json字串
	  console.log(JSON.stringify(body, undefined, 2)); 
	  console.log(token);
	  res.send(JSON.stringify(body, undefined, 2)); 
	});
});

app.get('/addNewMember',function(req, res){
	let token = req.query.token,
		name = req.query.name,
		position = req.query.position,
		mobile = req.query.mobile,
		tel = req.query.tel,
		remark = req.query.remark,
		email = req.query.email;


	request.post({
		url:'https://oapi.dingtalk.com/user/create?access_token='+token, 
		json: true,
		body:{
		    "name": name,
		    "department":[1,2],
		    "position": position,
		    "mobile": mobile,
		    "tel" : tel,
		    "remark" : remark,
		    "email": email,
		    "isHide": false,
		    "isSenior": false
		    
		}
	}, function(error, response, body){
	  // body是回傳的json物件，使用JSON.stringify()轉為json字串
	  console.log(JSON.stringify(body, undefined, 2)); 
	  res.send('ok');
	});
})

app.get('/deleteMember', function(req, res){
	let token = req.query.token;
	let userId = req.query.userId;
	
	request.get({
		url:'https://oapi.dingtalk.com/user/delete?access_token='+token+'&userid='+userId, 
		json: true
		
	}, function(error, response, body){
	  // body是回傳的json物件，使用JSON.stringify()轉為json字串
	  console.log(JSON.stringify(body, undefined, 2)); 
	  
	  res.send('ok');
	});
});

app.get('/get/memberDetail', function(req, res){
	let token = req.query.token;
	let userId = req.query.userId;
	
	request.get({
		url:'https://oapi.dingtalk.com/user/get?access_token='+token+'&userid='+userId, 
		json: true
		
	}, function(error, response, body){
	  // body是回傳的json物件，使用JSON.stringify()轉為json字串
	  console.log(JSON.stringify(body, undefined, 2)); 
	  
	  res.send(JSON.stringify(body, undefined, 2)); 
	});
});

app.get('/get/record', function(req, res){
	let token = req.query.token;
	let userId = req.query.userId;
	let startTime = req.query.startTime;
	let endTime = req.query.endTime;
	
	request.post({
		url:'https://oapi.dingtalk.com/attendance/listRecord?access_token='+token, 
		json: true,
		body:{
		    "userIds": [userId],
    		"checkDateFrom": startTime,
    		"checkDateTo": endTime,
    		"isI18n":"true"
		}
		
	}, function(error, response, body){
	  // body是回傳的json物件，使用JSON.stringify()轉為json字串
	  console.log(JSON.stringify(body, undefined, 2)); 
	  
	  res.send(JSON.stringify(body, undefined, 2)); 
	});
});

let port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Start in "+port);

});

