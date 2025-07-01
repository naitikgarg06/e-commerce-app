const mongoose = require('mongoose')
const Products = require('./product.models')

const CartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: Products
    },
    quantity: {
        type: Number,
        required: true,
    }
})

const Cart = mongoose.model('cart', CartSchema)

module.exports = Cart