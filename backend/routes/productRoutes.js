const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct)
    .patch(productController.updateProductPrice)
    .delete(productController.deleteProduct)

module.exports = router