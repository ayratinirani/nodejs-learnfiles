const hhttp= require('http');
const fs= require('fs');

var server= hhttp.createServer( function (req,res) {
//console.log(req);
    res.writeHead("200",{"Content-Type":"text/plain"});

    res.write("vasl shod  ;) :)");
    res.end();
});
server.listen(3435);
console.log("webserver started on localhost:3435");












































