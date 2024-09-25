const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/HierarichalApi')

const db = mongoose.connection

db.once('open' , (err)=>{
    err ? console.log('DB Not Conntected!!') : console.log('DB Conntected');
})