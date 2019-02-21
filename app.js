const  express=require("express");
const body_parser=require("body-parser");
const morgan= require("morgan");
var app = express();
var users={
    kian:"123",
    ayratin:"3435"
};

app.use(morgan("common"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));

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
app.post("/login",function (req,res,next){
    console.log("post login");
    console.log(req.body);
    var output="";
    for(user in users ){
        if(req.body["username"]==user){
            if(req.body['password']==users[user]){
                output="0";
                res.status(200).json({satatus:"true",msg:"login success"});
               break;
            }else{
                output="1";
               res.status(200).json({satatus:"false",msg:"wrong pass","pass":users.user});
               break;
            }
        }
    }
    if(output==""){
    res.status(200).json({satatus:"false",msg:"user not found"});}
});

app.post("/signup",function (req,res,next){
    console.log("post signup");
    console.log(req.body);
    if(req.body.username.length>=4 && req.body.password.length>=4){
           users[req.body['username']]=req.body['password'];
        res.json({status:true,msg:"signup success"});
    }else {
        res.json({status:false,msg:"failure in sign up"});
    }
    console.log("all users");
    console.log(users);
});
app.listen(3435);
console.log("server stated on http://localhost:3435");


