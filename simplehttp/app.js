const http=require('http');
const fs= require('fs');

var server= http.createServer( function (req,res) {

    res.writeHead("200",{"Content-Type":"text/plain"});
    if(req.method=="GET"){
        res.write("GET vasl shod  ;) :)");
        res.end();

    }else if(req.method=="POST"){
        res.write("POST  vasl shod  ;) :)");
        res.end();
    }else{
        res.write("unknown method");
        res.end();

    }
    console.log(new Date().toLocaleString());
    console.log("request "+req.method);
});
server.listen(3435);
console.log("webserver started on localhost:3435");
