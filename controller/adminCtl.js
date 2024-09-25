const adminSchema = require('../model/adminSchema')
const brcypt = require("bcrypt");
const moment = require("moment");
let jwt = require("jsonwebtoken")
// let mailer = require("../config/mailer")

module.exports.registration = async (req,res) => {
    req.body.password = await brcypt.hash(req.body.password, 10);
    req.body.createdAt = moment().format('DD-MM-YYYY, h:mm:ss a');
    // console.log(req.body.email);
    const data = await adminSchema.create(req.body)
    data ? res.status(200).json({msg:"Admin Registered"}) : res.status(400).json({ msg: "admin not registered" })
}

module.exports.loginAdmin = async (req, res) => {
    let data = await adminSchema.findOne({ email: req.body.email });
    if (data) {
        if (await brcypt.compare(req.body.password, data.password)) {
            let token = jwt.sign({ data: data }, "AdminKey", { expiresIn: "1h" })
            res.status(200).json({ msg: "passwrod is right", adminToken: token })
        } else {
            res.status(400).json({ msg: "passwrod is wrong" })
        }
    } else {
        res.status(400).json({ msg: "admin not found" })
    }
}

module.exports.viewAdmin = async (req, res) => {
    let adminExist = await adminSchema.findById(req.user.data._id)
    adminExist ? res.status(200).json({ msg: "admin data found", data: adminExist }) : res.status(400).json({ msg: "admin not found" })
}

module.exports.changeAdminPass = async (req, res) => {
    if (await brcypt.compare(req.body.oldPass, req.user.adminData.password)) {
        if (req.body.newPass == req.body.conPass) {
            let bPass = await brcypt.hash(req.body.newPass, 10);
            let change = await adminSchema.findByIdAndUpdate(req.user.adminData._id, { password: bPass })
            res.status(200).json({ msg: "password is changed" })
        } else {
            res.status(400).json({ msg: "new password and confirm password must be same" })
        }
    } else {
        res.status(400).json({ msg: "password is wrong" })
    }
}
