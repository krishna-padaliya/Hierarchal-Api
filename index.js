const express = require('express')
const port = 9000;

const app = express()
const db = require("./config/database")

app.use(express.urlencoded())

app.use("/" , require("./router/"))

app.listen(port, (err)=>{
    err ? console.log('Server Not Responding') : console.log('Server Responding at:',port);
})