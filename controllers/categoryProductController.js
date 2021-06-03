const {categoryProductModel} = require('../models');

class categoryProductController {
    async createCategory(req, res) {
        const {name, desc} = req.body;
        await categoryProductModel.createCategory(name, desc, result => {
           return res.json(result)
        })
    }

    async getAllCategories(req, res) {
       await categoryProductModel.getAllCategories(result => {
           const {success, msg} = result
            res.json(msg);
        })
    }
}

module.exports = new categoryProductController();
