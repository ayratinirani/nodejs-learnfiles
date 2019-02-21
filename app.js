const  express=require("express");

var app = express();

app.use(express.static(__dirname+"/public"));


app.get("/",function (req,res,next){
  res.sendFile(__dirname+"/public/home.html");
});
app.get("/login",function (req,res,next) {
    res.sendFile(__dirname+"/public/login.html");
});

app.post("/",function (req,res,next){
    console.log("post");
    res.send("end")
});

app.listen(3435);
console.log("server stated on http://localhost:3435");