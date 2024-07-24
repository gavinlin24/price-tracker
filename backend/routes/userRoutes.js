const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/products')
    .get(usersController.getAllProducts)
    .post(usersController.createAndAddProduct)

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router