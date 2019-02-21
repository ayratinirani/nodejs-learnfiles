$(document).ready(function () {
    var auth=false;
    getinfo();
    $("#login").click(function () {
        var data={
            username:$("#username").val(),
            password:$("#password").val()
        };
        //console.log(data)
        $.post("/login",data,function (data) {
            console.log(data['satatus']);

            $("#info").append("<p>"+data['msg'].toString()+"</p>");
            getinfo();
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
            console.log(data['satatus']);
            $("#info").append("<p>"+data['msg'].toString()+"</p>");
           getinfo();
        });
    });
$("#sendcomment").click(function () {
    var comment={
        message:$("#comment-body").val()
    };
    $.post("/save_comment",comment,function (data) {
        console.log(data);
        getcomments();
    });
});


function getcomments() {
    $.post("/get_comments",{},function (data) {
        console.log(data);
        for (comment in data)
        $("#all-comments").append("<p>"+comment+"</p>")
    });
}
function hide_siging() {
    $("#userops").hide();
}

function  getinfo() {
    $.post("/get_info",function (data) {

        if(data['auth']){
            auth=data['auth'];
            hide_siging();
            getcomments();
        }
    });
}

});