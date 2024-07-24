const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router