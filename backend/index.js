const { initialiseDatabase } = require("./db/db.connect.js");
const Products = require("./models/product.models.js");
const fs = require("node:fs");

initialiseDatabase();

const jsonData = fs.readFileSync("./products.json", "utf-8");
const productsData = JSON.parse(jsonData);

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

seedData();
