$(document).ready(function () {
    $("#login").click(function () {
        var data={
            username:$("#username").val(),
            password:$("#password").val()
        };
        //console.log(data)
        $.post("/login",data,function (data) {
            console.log(data);
            $("#info").append("<p>"+data['msg'].toString()+"</p>");
        });
    });


    $("#signUp").click(function () {
       // alert("reg click");
        var data={
            username:$("#signUpUdser").val(),
            password:$("#signUpPass").val()
        };
        console.log(data);
        $.post("/signup",data,function (data) {
            console.log(data);
            $("#info").append("<p>"+data['msg'].toString()+"</p>");
        });
    });






});