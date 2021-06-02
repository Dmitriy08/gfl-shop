const { productsModel } = require('../models');

class productsController {
    createProduct(req, res){

    }
    getAllProducts(req, res){
         productsModel.getAllProducts(async products => {
            await res.json({products});
        })
    }
    getProduct(req, res){
        const { id } = req.params;
        productsModel.getProduct(id, async results => {
            await res.json({results});
        })
    }
}
module.exports = new productsController();
