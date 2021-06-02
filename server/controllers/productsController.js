const {productsModel} = require('../models');
const uuid = require('uuid');
const path = require('path')
const ApiError = require('../helpers/ApiError');

class productsController {
    async createProduct(req, res, next) {
        try {
            const {
                productName,
                productDescription,
                productPrice,
                productAvailable,
                productCount,
                productKeywords,
                productStructure
            } = req.body;
            const {img} = req.files;
            console.log(req.files)
            let fileName = uuid.v4() + ".jpg";
            await img.mv(path.resolve(__dirname, '..', 'uploads', fileName));

            await productsModel.createProduct(fileName, productName, productDescription, productPrice, productAvailable, productCount, productKeywords, productStructure, result => {
                return res.json(result)
            })
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
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
