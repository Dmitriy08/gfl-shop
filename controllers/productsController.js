const uuid = require('uuid');
const path = require('path')
const {productsModel} = require('../models');
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
            let fileName = uuid.v4() + ".jpg";

            await img.mv(path.resolve(__dirname, '..', 'uploads', fileName));

            await productsModel.createProduct(fileName, productName, productDescription, productPrice, productAvailable, productCount, productKeywords, productStructure, result => {
                const { success, msg } = result;
                if (!success) {
                    return res.json({errorMessage: msg})
                } else {
                    return res.json(result)
                }
            })
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    getAllProducts(req, res) {
        productsModel.getAllProducts(result => {
            const { success, msg } = result;
            res.json(msg);
        })
    }

    async getProduct(req, res) {
        const {id} = req.params;
        await productsModel.getProduct(id, result => {
            const { success, msg } = result;
            res.json(msg);
        })
    }
}

module.exports = new productsController();
