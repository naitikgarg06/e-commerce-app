const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    category: { type: String, required: true}
})

const Category = mongoose.model('category', CategorySchema)

module.exports = Category