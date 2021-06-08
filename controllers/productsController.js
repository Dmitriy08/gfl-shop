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
            res.json({msg});
        })
    }


    getProduct(req, res, next){
        const {id} = req.params;
        const {type, color, size} = req.query
        let variants = '';
        if (type) variants += ` and product_options.product_type=${type} `
        if (color) variants += ` and product_options.product_color=${color} `
        if (size) variants += ` and product_options.product_size=${size} `

        if (!/^\d+$/.test(id)) {
            return res.status(500).send('Server Error');
        }
        productsModel.getProduct( id, variants,product => {
            const { success, msg } = product;

            if (!success || msg.length === 0) {
                return next(ApiError.badRequest('Product not fount'))
            }

            try {
                res.json(msg)
            } catch (e) {
                res.json({message: e.message})
            }
        })
    }


}

module.exports = new productsController();
