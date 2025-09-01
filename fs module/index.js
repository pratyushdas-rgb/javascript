const fs = require('fs');

//create a file
// fs.writeFile('example.txt', "It is the document content", (err)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log("File Created Successfully");


//     //reading the file
//     fs.readFile('example.txt','utf8',(err,file)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log(file);
//     })
// })




//renaming a file
// fs.rename('example.txt','renameexample.txt',(err,succ)=>{
//    if(err)
//         console.log(err);
//     else
//         console.log("Successfully renamed the file");
// });


//appending something in a file

// fs.appendFile('renameexample.txt',"Somethings are to be appended", (err)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log("Appended successfully");
        
// })


fs.unlink('renameexample.txt',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully deleted the file");
    }
})

