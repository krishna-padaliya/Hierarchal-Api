const express = require('express')
const admin = express.Router()
const adminCtl = require('../controller/adminCtl')
const auth = require("../config/adminAuth")

admin.post("/registration" , adminCtl.registration)
admin.post("/loginAdmin", adminCtl.loginAdmin);
admin.get('/viewAdmin' ,auth, adminCtl.viewAdmin)

module.exports = admin