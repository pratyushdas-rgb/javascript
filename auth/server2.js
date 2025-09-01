require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())
const posts = [
    {
        username: 'Pratyush',
        title: 'Post1'
    },
        {
        username: 'Pratyush2',
        title: 'Post2'
    }
]


app.get('/posts',(req,res)=>{
res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req,res)=>{
    //Authenticate User
   console.log( req.body)
    const username = req.body.username
    const user = {name:username}

   const accessToken =  generateAccessToken(user)
   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
   res.json({accessToken: accessToken, refreshToken: refreshToken})


})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}


app.listen(3000)