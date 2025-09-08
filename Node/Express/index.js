let express = require("express");

let app = express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send({status:1,msg:"Home Page"})
})
app.get("/news", (req,res)=>{
    res.send({status:2,msg:"news api"})
})

app.get("/news/:id", (req,res)=>{
    let par = req.params.id;
    res.send(par+" Hello news")
})


app.get("/product", (req,res)=>{
    res.send({status:3,msg:"product api"})
})

app.post("/login",(req,res)=>{
res.status(200).json({
    status:1,
    msg:"Login API",
    bodyDataa: req.body,
    queryData: req.query
}
)

    // console.log(req.body);
    // res.send({status:1,
    //     msg:"Hello",
    //     bodyData:req.body,
    //     queryData:req.query
    // })
})

app.listen("4000");