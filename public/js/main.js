$(document).ready(function () {
    var isauth=false;
    $("#cm").hide();
    getinfo();
    $("#login").click(function () {
        var data={
            username:$("#username").val(),
            password:$("#password").val()
        };
        //console.log(data)
        $.post("/login",data,function (data) {
            console.log(data['satatus']);
            isauth=data['satatus'];

            $("#info").html("<p>"+data['msg'].toString()+"</p>");
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
          isauth=data['satatus'];

            $("#info").html("<p>"+data['msg'].toString()+"</p>");
           getinfo();
        });
    });
$("#sendcomment").click(function () {
  //  if(isauth) {
 //   alert(isauth);
        var comment = {
            message: $("#comment-body").val()
        };
        $.post("/save_comment", comment, function (data) {
            console.log(data);
            getcomments();
        });
   // }
});
    $("#logout").click(function () {
        //  if(isauth) {
        //   alert(isauth)
        $.post("/logout", {}, function (data) {
            console.log(data);
                location.reload();
        });
        // }
    });

function getcomments() {
    $.post("/get_comments",{},function (comments) {
        $("#all-comments").html("");
        console.log(comments);
        comments.forEach(function (cm,index) {
            $("#all-comments").append("<p>"+ cm.username +" says     <strong>"+cm.message+"</strong></p>")
        });
    });
    $("#cm").show();
}
function hide_siging() {
    $("#userops").hide();
}

function  getinfo() {
    $.post("/get_info",function (data) {

        if(data['auth']){
            isauth=true;
            auth=data['auth'];
            $("#myname").html(auth.username);
            hide_siging();
            getcomments();
        }
    });
}

});