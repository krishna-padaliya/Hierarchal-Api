const express = require('express')
const admin = express.Router()
const adminCtl = require('../controller/adminCtl')
const auth = require("../config/adminAuth")

admin.post("/registration" , adminCtl.registration)
admin.post("/loginAdmin", adminCtl.loginAdmin);
admin.get('/viewAdmin' ,auth, adminCtl.viewAdmin)
admin.post('/changePass' ,auth, adminCtl.changePass)
admin.post("/forgetPass", adminCtl.forgetPass);

module.exports = admin