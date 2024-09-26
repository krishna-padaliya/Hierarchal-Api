const mongoose = require('mongoose')


const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required']
      },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
})

const admin = mongoose.model("Admin" , adminSchema)
module.exports = admin