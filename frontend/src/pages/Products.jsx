import { Link, useParams } from "react-router";
import Header from "../components/Header";
import { useState } from "react";
import useProductsContext from "../contexts/ProductsContext";
import useProducts from "../customHooks/useProducts";
import { products } from "../products";

export default function Products() {
  const category = useParams().category;
  const {
    filteredProducts,
    currPriceValue,
    setCurrPriceValue,
    minPrice,
    maxPrice,
    sortProductsHandler,
    handleSubCategory,
    setSortingValue,
    setSelectedRating,
    filterProductsByRating,
    filterProdsByPriceRange,
  } = useProducts(category);
  const productsByCategory = products.filter(
    (prod) => prod.category.toLocaleLowerCase() == category
  );
  let subCategories = productsByCategory.reduce(
    (acc, curr) => [...acc, ...curr.subCategory],
    []
  );
  subCategories = [...new Set(subCategories)];

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <div className="d-flex flex-grow-1">
        <div className="row flex-grow-1 w-100 m-0">
          <div
            className="col-12 col-md-3 container p-lg-5"
            style={{ background: "#f8f9fa" }}
          >
            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-5">Filters</span>
                <span className="text-decoration-underline fs-5">Clear</span>
              </div>
              <div className="my-4">
                <label htmlFor="priceRange" className="form-label fs-5 fw-bold">
                  Price - {currPriceValue}
                </label>
                <input
                  type="range"
                  className="form-range"
                  min={minPrice}
                  max={maxPrice}
                  step={Math.round((maxPrice - minPrice) / 10)}
                  id="priceRange"
                  value={currPriceValue}
                  onChange={(e) => {
                    const price = e.target.value;
                    setCurrPriceValue(e.target.value);
                    // filterProdsByPriceRange(price)
                  }}
                ></input>
              </div>
              <div className="my-4">
                <div className="fs-5 fw-bold mb-2">Category</div>
                {subCategories?.map((curr, i) => (
                  <div key={i}>
                    <label htmlFor={i}>
                      <input
                        type="checkbox"
                        name="category"
                        value={curr}
                        onChange={(e) => {
                          handleSubCategory(e);
                        }}
                        id={i}
                      />{" "}
                      {curr}
                    </label>
                  </div>
                ))}
              </div>
              <div className="my-4">
                <div className="fs-5 fw-bold mb-2">Rating</div>
                <label htmlFor="4Stars">
                  <input
                    type="radio"
                    name="rating"
                    value={4}
                    id="4Stars"
                    onChange={(e) => {
                      setSelectedRating(e.target.value);
                      // filterProductsByRating(e.target.value, filteredProducts);
                    }}
                  />{" "}
                  4 stars and above
                </label>
                <br />
                <label htmlFor="3Stars">
                  <input
                    type="radio"
                    name="rating"
                    value={3}
                    id="3Stars"
                    onChange={(e) => {
                      setSelectedRating(e.target.value);
                    }}
                  />{" "}
                  3 stars and above
                </label>
                <br />
                <label htmlFor="2Stars">
                  <input
                    type="radio"
                    name="rating"
                    value={2}
                    id="2Stars"
                    onChange={(e) => {
                      setSelectedRating(e.target.value);
                    }}
                  />{" "}
                  2 stars and above
                </label>
                <br />
                <label htmlFor="1Stars">
                  <input
                    type="radio"
                    name="rating"
                    value={1}
                    id="1Stars"
                    onChange={(e) => {
                      setSelectedRating(e.target.value);
                    }}
                  />{" "}
                  1 stars and above
                </label>
              </div>
              <div className="my-4">
                <div>Sort by</div>
                <label htmlFor="low">
                  <input
                    type="radio"
                    name="sorByPrice"
                    value="low"
                    id="low"
                    onChange={(e) => {
                      const sortingType = e.target.value;
                      setSortingValue(sortingType);
                      // sortProductsHandler(sortingType, filteredProducts);
                    }}
                  />{" "}
                  Price - Low to High
                </label>
                <br />
                <label htmlFor="high">
                  <input
                    type="radio"
                    name="sorByPrice"
                    value="high"
                    id="high"
                    onChange={(e) => {
                      const sortingType = e.target.value;
                      setSortingValue(sortingType);
                      // sortProductsHandler(sortingType, filteredProducts);
                    }}
                  />{" "}
                  Price - High to Low
                </label>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-md-9 p-5 text-center"
            style={{ backgroundColor: "#E0E0E0" }}
          >
            <h4 className="mb-4">
              Showing All Products ({filteredProducts.length} products)
            </h4>
            <div className="row g-3">
              {filteredProducts?.map((prod, i) => (
                <div className="col-md-6" key={i}>
                  <Link
                    to={`./product/${prod.id}`}
                    className="text-decoration-none"
                  >
                    <div className="card h-100">
                      <div className="row g-0 h-100">
                        <div className="col-sm-4 d-flex justify-content-center align-items-center">
                          <img
                            src={prod.thumbnailImageUrl}
                            alt="product"
                            className="img-fluid rounded mh-100"
                          />
                        </div>
                        <div className="col-sm-8">
                          <div className="card-body h-100">
                            <div className="d-flex flex-column justify-content-between align-items-sm-start h-100 mb-2">
                              <div className="d-flex flex-column align-items-sm-start align-items-center">
                                <div className="">{prod.name}</div>
                                <div className="d-flex align-items-end flex-wrap">
                                  <span className="fw-bold fs-5 pe-2">
                                    ₹{prod.sellingPrice}
                                  </span>
                                  <span className="fw-semibold text-decoration-line-through fs-6 text-secondary">
                                    {prod.originalPrice}
                                  </span>
                                </div>
                                <div className="">{prod.discount}%</div>
                              </div>
                              <div className="d-flex flex-column w-100">
                                <button
                                  to="/home appliances"
                                  className="btn btn-primary rounded-0"
                                >
                                  Add To Cart
                                </button>
                                <button className="btn btn-secondary rounded-0 mt-2">
                                  Save to Wishlist
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
