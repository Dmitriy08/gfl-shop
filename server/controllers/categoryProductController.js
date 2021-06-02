const {categoryProductModel} = require('../models');

class categoryProductController {
    createCategory(req, res) {
        const {name, desc} = req.body;
        categoryProductModel.createCategory(name, desc, result => {
           return res.json(result)
        })
    }

    getAllCategories(req, res) {
        categoryProductModel.getAllCategories(categories => {
            res.json({categories});
        })
    }
}

module.exports = new categoryProductController();
