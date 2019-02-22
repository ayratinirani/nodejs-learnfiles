const  express=require("express");
const body_parser=require("body-parser");
const morgan= require("morgan");

const session=require('express-session');
var app = express();

app.use(morgan("common"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));

app.use(express.static(__dirname+"/public"));



var comments={
    kian:['salam donya','khoobid'],
    ayratin:['ghawu mi ', 'najire']

};
var users={
    kian:"123",
    ayratin:"3435"
};
app.use(session({
    secret:"ghffufgygoluyggbyu",
    resave:false,
    saveUninitialized:true
}));



app.get("/",function (req,res,next){
  res.sendFile(__dirname+"/public/home.html");
});
app.get("/login",function (req,res,next) {
    console.log(req.session);
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/",function (req,res,next){
    console.log("post");

    res.send("end")
});
app.post("/login",function (req,res,next){
 //   console.log("post login");
 //   console.log(req.body);
    var output="";
    for(user in users ){
        if(req.body["username"]==user){
            if(req.body['password']==users[user]){
                output="0";
                req.session.auth={username:req.body["username"]};
                res.status(200).json({satatus:"true",msg:"login success"});
               break;
            }else{
                output="1";

               res.status(200).json({satatus:"false",msg:"wrong pass"});
               break;
            }
        }
    }
    if(output==""){
    res.status(200).json({satatus:"false",msg:"user not found"});}
});

app.post("/signup",function (req,res,next){
 //   console.log("post signup");
  //  console.log(req.body);
    if(req.body.username.length>=4 && req.body.password.length>=4){
           users[req.body['username']]=req.body['password'];
        req.session.auth={username:req.body["username"]};
        res.json({status:true,msg:"signup success"});
    }else {
        res.json({status:false,msg:"failure in sign up"});
    }
  //  console.log("all users");
   // console.log(users);
});
app.post("/get_info",function (req,res,next) {

    res.json(req.session);

});
app.post('/logout',function (req,res,next) {
    req.session.auth=undefined;
    res.end("logout");
});
 app.post("/save_comment",function (req,res,next) {
   //  console.log(req.session);
     if(req.body.message.length>=1 ) {
         if (req.session.auth.username != undefined) {
             var user = req.session.auth.username;
             if (comments[req.session.auth.username] != undefined) {

                 comments[user].push(req.body.message);
             } else {
                 comments[user] = req.body.message;
             }
             console.log(comments[user]);
             res.json({status: true, msg: "comment added success"});

         } else {
             res.json({status: false, msg: "not logged in"});
         }
     }
 });
app.post("/get_comments",function (req,res,next) {
res.json(comments);
});



app.listen(3435);
console.log("server stated on http://localhost:3435");


