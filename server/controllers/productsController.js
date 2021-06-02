const {productsModel} = require('../models');

class productsController {
    createProduct(req, res) {

    }

    getAllProducts(req, res) {
        productsModel.getAllProducts(products => {
            res.json({products});
        })
    }

    getProduct(req, res) {
        const {id} = req.params;
        productsModel.getProduct(id, results => {
            res.json({results});
        })
    }
}

module.exports = new productsController();
