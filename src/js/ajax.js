// ajax.js

export function ajax(method, src, args, callback){
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
}