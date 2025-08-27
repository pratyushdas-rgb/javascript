const { log } = require('console');
const fs = require('fs');

const readStream = fs.createReadStream('example.txt','utf8');
const writeStream = fs.createWriteStream('example2.txt','utf-8')

readStream.on('data', (chunk)=>{
    // console.log("New Chunk Mila:------------------ ",chunk);
    
    writeStream.write(chunk);

    
})

readStream.on('end', ()=>{
    console.log("--------------------File reading Ended--------------------");
    
})

readStream.on('error', (err)=>{
    console.log(err);
    
})