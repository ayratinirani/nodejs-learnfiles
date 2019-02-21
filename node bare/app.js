const http=require('http');
const fs=require('fs');

var server= http.createServer( function (req,res) {
    var result;
    if(req.method=="GET"){
        console.log(req.url);
      if(req.url=="/"){
          console.log("index requested");
          fs.readFile("./views/index.html",function (err,data) {

              if (!err) {
                  res.writeHead("200",{"Content-Type":"text/html"});
                  res.write(data);
                  res.end();

              } else {
                  console.log(err);
              }
          });
      }else if(req.url=="/about"){
          console.log("about requested");
          fs.readFile("./views/about.html",function (err,data) {

              if (!err) {
                  res.writeHead("200",{"Content-Type":"text/html"});
                  res.write(data);
                  res.end();

              } else {//when not found
                  console.log(err);

              }
          });

      }else{//when not get
          res.writeHead("404",{"Content-Type":"text/html"});
          res.write("oops !!page not found ");
          res.end();
      }

    }else{
        res.write("unknown method");
        res.end();
    }
});
server.listen(3435);
console.log("web server stated 3435");