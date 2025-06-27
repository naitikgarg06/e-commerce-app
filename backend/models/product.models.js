const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    fullTitle: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: [{type: String}],
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    thumbnailImageUrl: {
        type: String,
        required: true,
    },
    largeImageUrl: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true
    },
    description: [
        {type: String}
    ],
    gender: {
        type: String,
    }
})

const Products = mongoose.model('products', ProductSchema)

module.exports = Products