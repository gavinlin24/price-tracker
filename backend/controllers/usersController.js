const User = require('../models/User')
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()

    if (!users?.length) {
        return res.status(400).json({ message: "No users found" })
    }

    res.json(users)
})

//@desc Create new user
//@route POST /users
//@access Private
const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const dupUser = await User.findOne({ username }).lean().exec()

    if (dupUser) {
        return res.status(409).json({ message: "Duplicate username" })
    }

    const dupEmail = await User.findOne({ email }).lean().exec()

    if (dupEmail) {
        return res.status(409).json({ message: "Duplicate email" })
    }

    const hashedPw = await bcrypt.hash(password, 10)
    const userObj = { username, email, "password": hashedPw }
    const user = await User.create(userObj)

    if (user) {
        res.status(201).json({ message: `New user ${username} created`})
    } else {
        res.status(400).json({ message: "Invalid user data received" })
    }
})

//@desc Update a user
//@route PATCH /users
//@access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, email, password, productIds } = req.body

    if(!id || !username) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findById(id).exec()

    if(!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate && (duplicate._id.toString() !== id)) {
        return res.status(409).json({ message: "Duplicate username" })
    }

    user.username = username

    if (email) {
        user.email = email
    }
    
    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    if (productIds && Array.isArray(productIds)) {
        user.productIds = productIds
    }

    const updatedUser = await user.save()
    res.json({ message: `${updatedUser.username} updated`})
})

//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: "User ID required" })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const result = await user.deleteOne()
    console.log(result._id)
    const reply = `User ${user.username} with ID ${user._id} deleted`
    res.json(reply)
})

//@desc Get all products a user saved
//@route GET /users/products
//@access Private
const getAllProducts = asyncHandler(async (req, res) => {
    const { username } = req.body
    const user = await User.findOne({ username }).exec()

    if(!user) {
        return res.status(401).json({ message: "Unauthorized User"})
    }
    const productIds = user.productIds;

    if (!productIds || !productIds.length) {
        return res.status(400).json({ message: "User has no tracked Products" })
    }

    try {
        const products = await Product.find({ '_id': { $in: productIds } });
        if (!products?.length) {
            return res.status(400).json({ message: "No products found" })
        }
        res.json(products)
    } catch (err) {
        console.log(err);
        res.status(500).json( { message: `An error occured: ${err.reason}`})
    }
})

//@desc Create a product and add to User's list
//@route POST /users/products
//@access Private
const createAndAddProduct = asyncHandler(async (req, res) => {
    const { username, productName, price, link } = req.body

    if(!username || !productName || !price || !link) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findOne({ username }).exec()

    if(!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const productObj = { "name": productName, price, link }
    const product = await Product.create(productObj)
    user.productIds = [...user.productIds, product._id]
    await user.save()

    res.json({ productId: product._id })
})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getAllProducts,
    createAndAddProduct
}