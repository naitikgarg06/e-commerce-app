const { initialiseDatabase } = require("./db/db.connect.js");
const express = require("express");
const Category = require("./models/category.models.js");
const Products = require("./models/product.models.js");
const Cart = require("./models/cart.models.js");
const fs = require("node:fs");
const cors = require("cors");
const mongoose = require("mongoose");
const Wishlist = require("./models/wishlist.models.js");

const app = express();

const corsOptions = {
  origin: "*",
  // credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

initialiseDatabase();

// const jsonData = fs.readFileSync("./data/products.json", "utf-8");
// const productsData = JSON.parse(jsonData);

// const cart = fs.readFileSync("./data/cart.json", "utf-8");/
// const cartData = JSON.parse(cart);
// const categories = JSON.parse(fs.readFileSync("./data/category.json", "utf-8"));

// const wishlist = JSON.parse(fs.readFileSync('./data/wishlist.json', "utf-8"))

// seedWishlist(wishlist)
// seedData();
// seedCategory(categories)
// seedCartData(cartData);




// get products api
app.get("/products", async (req, res) => {
  try {
    const productsData = await findAllProducts();
    if (productsData && productsData.length) {
      res.status(200).json(productsData);
    } else {
      res.status(404).json({ error: "No product found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// get product by ID:
app.get(`/products/:ProdId`, async (req, res) => {
  try {
    const productData = await findProductById(req.params.ProdId);
    if (productData) {
      res.status(200).send(productData);
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// get all categories:
app.get("/category", async (req, res) => {
  try {
    const categories = await findAllCategory();
    if (categories && categories.length) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ error: "No category found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// get category by id:
app.get("/category/:id", async (req, res) => {
  try {
    const category = await findCategoryById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// get cart items:
app.get("/cart", async (req, res) => {
  try {
    const cartItems = await getCartItems();
    if (cartItems && cartItems.length) {
      res.status(200).json(cartItems);
    } else {
      res.status(404).json({ error: "No items found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// post api add item in cart
app.post(`/cart`, async (req, res) => {
  try {
    const item = req.body;
    const addedItem = await addItemToCart(item);
    if (addedItem) {
      res.status(200).json(addedItem);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

app.post("/cart/:id", async (req, res) => {
  try {
    const updatedProduct = await updateQuantityInCart(
      req.params.id,
      req.body.quantity
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update item in cart" });
  }
});

app.delete("/cart/:id", async (req, res) => {
  try {
    const deletedProduct = await deleteItemFromCart(req.params.id);
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: "Item no found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/wishlist", async (req, res) => {
  try {
    const items = await getWishlistItems();
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({error})
  }
})

app.post("/wishlist", async (req, res) => {
  try {
    const newItem = await addItemToWishlist(req.body)
    res.status(200).json(newItem)
  } catch (error) {
    res.status(500).json({error})
  }
})

app.delete("/wishlist/:id", async (req, res) => {
  try {
    const removedItem = await removeItemFromWishlist(req.params.id)
    res.status(200).json(removedItem)
  } catch (error) {
    res.status(500).json({error})
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

// add data to cart
async function seedCartData(data) {
  try {
    for (const item of data) {
      const newCartItem = new Cart(item);
      newCartItem.save();
    }
  } catch (error) {
    console.log(error);
  }
}

// add data to products:
async function seedData(data) {
  try {
    for (const productData of data) {
      const newProduct = new Products(productData);
      newProduct.save();
    }
  } catch (error) {
    console.log(error);
  }
}

// add category to database:
async function seedCategory(data) {
  try {
    for (const category of data) {
      const newCategory = new Category(category);
      newCategory.save();
    }
  } catch (error) {
    console.log(error);
  }
}

// add data to wishlist
async function seedWishlist(data){
  try {
    for(const item of data){
      const newItem = new Wishlist(item)
      const savedItem = await newItem.save()
      console.log(savedItem)
    }
  } catch (error) {
    console.log(error)
  }
}

// query for dabatase

async function findAllProducts() {
  const products = await Products.find();
  return products;
}

async function findProductById(id) {
  const product = await Products.findOne({ _id: id });
  return product;
}

async function findAllCategory() {
  const categories = await Category.find();
  return categories;
}

async function findCategoryById(id) {
  const category = await Category.findOne({ _id: id });
  return category;
}

async function getCartItems() {
  try {
    const products = await Cart.find().populate("productId");
    return products;
  } catch (error) {
    throw error;
  }
}

async function addItemToCart(data) {
  try {
    const newProduct = new Cart(data);
    const savedProduct = await newProduct.save();
    return savedProduct.populate("productId");
  } catch (error) {
    throw error;
  }
}

async function updateQuantityInCart(itemId, newQuantity) {
  try {
    const updatedProduct = await Cart.findByIdAndUpdate(
      itemId,
      { quantity: newQuantity },
      { new: true }
    );
    return updatedProduct.populate("productId");
  } catch (error) {
    throw error;
  }
}

async function deleteItemFromCart(id) {
  try {
    const deletedProduct = await Cart.findOneAndDelete({ _id: id });
    return deletedProduct;
  } catch (error) {
    throw error;
  }
}

async function getWishlistItems(){
  try {
    const items = await Wishlist.find().populate('itemId')
    return items
  } catch (error) {
    throw error
  }
}

async function addItemToWishlist(data){
  try {
    const newItem = new Wishlist(data)
    const savedItem = await newItem.save()
    return savedItem.populate('itemId')
  } catch (error) {
    throw error
  }
}

async function removeItemFromWishlist(id){
  try {
    const item = await Wishlist.findOneAndDelete({ _id: id})
    return item
  } catch (error) {
    throw error
  }
}