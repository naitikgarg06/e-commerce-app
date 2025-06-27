const { initialiseDatabase } = require("./db/db.connect.js");
const express = require("express");
const Category = require("./models/category.models.js");
const Products = require("./models/product.models.js");
const fs = require("node:fs");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*",
  // credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

initialiseDatabase();

const jsonData = fs.readFileSync("./products.json", "utf-8");
const productsData = JSON.parse(jsonData);

// add data to database:
async function seedData() {
  try {
    for (const productData of productsData) {
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

const categories = JSON.parse(fs.readFileSync("./category.json", "utf-8"));
// seedCategory(categories)

// seedData();

async function findAllProducts() {
  const products = await Products.find();
  return products;
}

async function findProductById(id) {
  const product = await Products.findOne({ _id: id });
  // console.log(product)
  return product;
}

async function findAllCategory() {
  const categories = await Category.find();
  return categories;
}

async function findCategoryById(id){
  const category = await Category.findOne({_id: id})
  return category
}


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
    const category = await findCategoryById(req.params.id)
    if(category){
      res.status(200).json(category)
    } else {
      res.status(404).json({ error: "Category not found"})
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data"})
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
