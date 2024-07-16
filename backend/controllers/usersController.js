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

    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
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
    const { id, username, email, password} = req.body

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
    user.email = email
    
    if (password) {
        user.password = await bcrypt.hash(password, 10)
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

const getAllProducts = asyncHandler(async (req, res) => {
    const { productIds } = req.body

    if (!productIds || !Array.isArray(productIds) || !productIds.length) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        const products = await Product.find( {'_id': { $in: productIds}} ).lean()
        if (!products?.length) {
            return res.status(400).json({ message: "No products found" })
        }
        res.json(products)
    } catch (err) {
        console.log(err);
        res.status(500).json( { message: `An error occured: ${err.reason}`})
    }
})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getAllProducts
}