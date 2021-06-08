const { usersModel } = require('../models');
const ApiError = require('../helpers/ApiError');
const jwt = require('jsonwebtoken');

class UserController{
    async registration(req, res, next){
        const {name, email, password, phone} = req.body

       await usersModel.register(name, email, password, phone, result => {
            const { success, msg } = result;
            if (!success) {
                    return next(ApiError.badRequest(msg))
            } else {
                const token = jwt.sign({name, email}, process.env.SECRET_KEY, {expiresIn: '24h'})
                return res.json({token})
            }
        })
    }
    login(req, res, next){
        const {email, password} = req.body;
        usersModel.login(email, password, result=>{
            const { success, msg } = result;
            if (!success) {
                return next(ApiError.badRequest(msg))
            } else {
                const token = jwt.sign({name: msg.name, email: msg.email}, process.env.SECRET_KEY, {expiresIn: '24h'})
                return res.json({token})
            }
        })
    }
    async check(req, res, next) {
        const token = jwt.sign({name:req.user.name, email:req.user.email}, process.env.SECRET_KEY, {expiresIn: '24h'})
        return res.json({token})
    }
}

module.exports = new UserController();
