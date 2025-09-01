const fs = require('fs');

// fs.mkdir('tutorial',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Folder Created Successfully");
//     }
// })

fs.mkdir('tutorial',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        fs.rmdir('tutorial', (err)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("Folder Deleted Succesfully");
            }
        })
    }
})