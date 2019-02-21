const http=require('http');
var options={
    hostname:"localhost",
    port:3435,
    method:"POST",
    path:"/"
};
var request=http.request(options, function (resp) {
    console.log('headers:');
console.log(resp.headers);
resp.on("data",function (chunk) {
    console.log(chunk.toString());
});
});
request.end();