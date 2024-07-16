const Product = require('../models/Product')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

//@desc Get all products
//@route GET /products
//@access Private
const getAllProducts = asyncHandler(async (req, res) => {
    const { productIds } = req.body

    if (!productIds || !Array.isArray(productIds) || !productIds.length) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const products = await Product.find( {'_id': { $in: productIds}} ).lean()

    if (!products?.length) {
        return res.status(400).json({ message: "No products found" })
    }

    res.json(products)
})

//@desc Create new product
//@route POST /product
//@access Private
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, link } = req.body

    if (!name || !price || !link) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const duplicate = await Product.findOne({ link }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate product' })
    }

    const productObj = { name, price, link }
    const product = await Product.create(productObj)

    if (product) {
        res.status(201).json({ message: `New product ${name} created`})
    } else {
        res.status(400).json({ message: "Invalid product data received" })
    }
})

//@desc Update a product
//@route PATCH /product
//@access Private
const updateProduct = asyncHandler(async (req, res) => {
    const { id, name, price, link } = req.body

    if (!id || !name || !price || !link) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const product = await Product.findById(id).exec()

    if (!product) {
        return res.status(400).json({ message: "Product not found" })
    }

    const duplicate = await Product.findOne({ link }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate product' })
    }

    product.name = name
    product.price = price
    product.link = link

    const updatedProduct = await product.save()
    res.json({ message: `${updatedProduct.name} updated`})
})

//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: "Product ID required" })
    }

    const product = await Product.findById(id).exec()

    if (!product) {
        return res.status(400).json({ message: "Product not found" })
    }

    const result = await product.deleteOne()
    console.log(result._id)
    const reply = `Product ${product.name} with ID ${product._id} deleted`
    res.json(reply)
})

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}