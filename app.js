//dependencies
const  express=require("express");
const body_parser=require("body-parser");
const morgan= require("morgan");
const session=require('express-session');
const mongoose=require("mongoose");
const connectMongo=require("connect-mongo")(session);
//init dependencies

var app = express();
mongoose.connect("mongodb://localhost/nodejs-chat",{ useNewUrlParser: true });
app.use(morgan("common"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));

app.use(express.static(__dirname+"/public"));

//db connecting

var db=mongoose.connection;
db.on("error",function (e) {
   console.log("db error !!!"+ e) ;

});

db.once("connected",function () {
    console.log("db connected");
});
app.use(session({
    secret:"ghffufgygoluyggbyu",
    resave:false,
    saveUninitialized:true,
    store:new connectMongo({mongooseConnection:db})
}));

//schema
var userschema=new mongoose.Schema({
    password:String,
    email:String,
    username:String
});



//model
var usermodel=mongoose.model("User",userschema);

var commentschema=new mongoose.Schema({
    username:String,
    message:String,
    like:Number
});
var commentModel=mongoose.model("Comment",commentschema);

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
    var formDat=req.body;

    if(req.session.auth!=undefined){
        res.json({satatus:false,msg:"already loged in"})
    }else{
      usermodel.findOne({username:formDat.username},function (err,user) {
         if(user!=undefined){
           if(user.password==formDat.password){
               req.session.auth={username:formDat.username};
               res.status(200).json({satatus:"true",msg:"login success"});
           }else{
               res.status(200).json({satatus:"false",msg:"wrong pass"});
           }
         }else{
           res.status(200).json({satatus:"false",msg:"user not found"});
       }
    });}

});

app.post("/signup",function (req,res,next){

    var formData=req.body;

    if(formData.username.length && formData.password.length){
        if(formData.password.length>=4){
            usermodel.find({username:formData.username},function (er,data) {
                if(er){
                  console.log(er);
                }else if(data.length>0){
                    res.json({satatus:false,msg:"username existes already"})
                }else{
                    var newuser=new usermodel({
                        email:formData.email|| "",
                        password: formData.password,
                        username:formData.username
                    });
                    console.log(newuser);
                    newuser.save();
                    req.session.auth={username:newuser.username};
                    res.json({satatus:true,msg:"afarin"});
                }
            });

        }else {
            res.json({satatus:false,msg:"password should be at least 4 characters"});
        }

    }else{
        res.json({satatus:false,msg:"username or password empty"})
    }

});
app.post("/get_info",function (req,res,next) {

    res.json(req.session);

});
app.post('/logout',function (req,res,next) {
    req.session.auth=undefined;
    res.end("logout");
});
 app.post("/save_comment",function (req,res,next) {
     console.log(req.session.auth.username);
     var username1=req.session.auth.username;
     if(req.session.auth!=undefined) {
         if (req.body.message.length >= 1) {
            commentModel.create({
                username:username1,
                message:req.body.message
            },function (err,comment) {
                if(err){
                    throw err;
                }else{
                    res.json({satatus:true,msg:"message saved"});
                }
            });


         }else{
             res.json({satatus:false,msg:"message cant be empty"});
         }
     }else{
         res.json({satatus:false,msg:"unot logged in"});
     }


 });
app.post("/get_comments",function (req,res,next) {
commentModel.find({},function (err,comments) {
    if(err){

    }else {
        res.json(comments);
    }
})
});



app.listen(3435);
console.log("server stated on http://localhost:3435");


