import { useParams } from "react-router";
import { products } from "../products";
import Header from "../components/Header";
import { useState } from "react";

export default function Products() {
  const category = useParams().category;
  const productsListByCategory = products.filter(
    (prod) => prod.category.toLowerCase() == category
  );
  const min = 0;
  const maxValue = productsListByCategory.reduce((acc, curr) => parseInt(curr.originalPrice) > acc ? parseInt(curr.originalPrice) : acc, 0)
  const [currValue, setCurrValue] = useState((maxValue - min) / 2);
  let subCategories = productsListByCategory.reduce((acc, curr) => [...acc, ...curr.subCategory], [])
  subCategories = [...new Set(subCategories)]

  return (
    <div className="d-flex flex-column" style={{minHeight: '100vh'}}>
      <Header />
      <div className="d-flex flex-grow-1">
        <div className="row flex-grow-1 w-100 m-0">
          <div className="col-12 col-md-3 container p-lg-5" style={{ background: "#f8f9fa" }}>
            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-5">Filters</span>
                <span className="text-decoration-underline fs-5">Clear</span>
              </div>
              <div className="my-4">
                <label htmlFor="priceRange" className="form-label fs-5 fw-bold">
                  Price - {currValue}
                </label>
                <input
                  type="range"
                  className="form-range"
                  min={min}
                  max={maxValue}
                  step={Math.round((maxValue - min ) / 10)}
                  id="priceRange"
                  value={currValue}
                  onChange={(e) => setCurrValue(e.target.value)}
                ></input>
              </div>
              <div className="my-4">
                <div className="fs-5 fw-bold mb-2">Category</div>
                {subCategories?.map((curr, i) => (
                  <div>
                  <label htmlFor={i}>
                  <input type="checkbox" name='category' value={curr} id={i} /> {curr}
                  </label>
                  </div>
                ))}
              </div>
              <div className="my-4">
                <div className="fs-5 fw-bold mb-2">Rating</div>
                <label htmlFor="4Stars">
                <input type="radio" name='rating' value={4} id='4Stars' /> 4 stars and above
                </label>
               <br />
                <label htmlFor="3Stars">
                <input type="radio" name='rating' value={3} id="3Stars" /> 3 stars and above
                </label>
                <br />
                <label htmlFor="2Stars">
                <input type="radio" name='rating' value={2} id='2Stars' /> 2 stars and above
                </label>
                <br />
                <label htmlFor="1Stars">
                <input type="radio" name='rating' value={1} id="1Stars" /> 1 stars and above
                </label>
              </div>
              <div className="my-4">
                <div>Sort by</div>
                <label htmlFor="low">
                <input type="radio" name="sorByPrice" value='low' id='low'/> Price - Low to High
                </label>
                <br />
                <label htmlFor="high">
                <input type="radio" name="sorByPrice" value='high' id='high'/> Price - High to Low
                </label>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-md-9 p-5 text-center"
            style={{ backgroundColor: "#E0E0E0",}}
          >
            <h4 className="mb-4">
              Showing All Products ({productsListByCategory.length} products)
            </h4>
            <div className="row g-3">
              {productsListByCategory?.map((prod) => (
                <div className="co-12 col-sm-4 d-flex flex-column align-items-center">
                  <img
                    src={prod.thumbnailUrl}
                    alt="product"
                    className="img-fluid"
                  />
                  <span>{prod.name}</span>
                  <span className="fw-bold fs-5">₹{prod.sellingPrice}</span>
                  <button className="btn btn-primary w-100 mt-3">
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
