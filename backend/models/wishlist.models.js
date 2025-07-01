const mongoose = require("mongoose");
const Products = require("./product.models");

const WishlistSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Products,
    required: true,
  },
});

const Wishlist = mongoose.model('wishlist', WishlistSchema)

module.exports = Wishlist