const { usersModel } = require('../models');
const ApiError = require('../helpers/ApiError')

class UserController{
    registration(req, res){

    }
    login(req, res){

    }
    check(req, res, next){
        const {id} = req.query;
        if (!id){
            return next(ApiError.badRequest('Wrong ID'));
        }
        res.json(id);
    }
}

module.exports = new UserController();
