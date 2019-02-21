//reading file
var fs = require('fs');

// var buffer=fs.readFileSync(process.cwd()+"/test.txt");
//
// console.log(buffer);
// console.log(buffer.toString());
//

// fs.readFile(process.cwd()+"/test.txt",function (err,buffer) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(buffer.toString());
//     }
// });


//copy file to file and learn write file

// fs.readFile(process.cwd()+"/from.txt", function (err,buff) {
//     if(err){
//         console.log(err);
//     }else {
//
//         fs.writeFile(process.cwd()+"/to.txt",buff,function (err) {
//            if(err){
//                console.log(err);
//            } else {
//                console.log("copy successfull");
//            }
//         })
//     }
// });
fs.appendFile(process.cwd()+"/to.txt","\n appended 1 line"+new Date().toISOString(),function (err) {
    if(err){
        console.log(err);
    }else{
        console.log("appended");

    }
});
//end reading file




































