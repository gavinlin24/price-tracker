const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prevPrice: {
        type: Number,
        required: true
    },
    currPrice: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema);