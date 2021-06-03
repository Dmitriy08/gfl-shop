const {categoryProductModel} = require('../models');

class categoryProductController {
    async createCategory(req, res) {
        const {name, desc} = req.body;
        await categoryProductModel.createCategory(name, desc, result => {
           return res.json(result)
        })
    }

    async getAllCategories(req, res) {
       await categoryProductModel.getAllCategories(categories => {
            res.json({categories});
        })
    }
}

module.exports = new categoryProductController();
