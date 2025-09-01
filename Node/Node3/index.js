let http = require("http");

let server = http.createServer((req,res)=>{

    //   res.end("Welcome to my pc");
      

      if(req.url == "/news"){
        res.end("news data");
      }
      if(req.url="/"){
        res.end("Welcome to my pc")
      }

})
server.listen("3000");