const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/edit')
    .post(usersController.createAndAddProduct)
    .patch(usersController.removeProduct)

router.route('/display')
    .post(usersController.getAllProducts)
    
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router