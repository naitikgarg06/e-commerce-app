import { useEffect, useState } from "react";
import {Link} from 'react-router'
import useCartContext from "../contexts/CartContext";
import useProductsContext from "../contexts/ProductsContext";

export default function SimilarProducts({ productDetails }) {
  const { products } = useProductsContext();
  console.log(productDetails);
  const { cart, addToCartHandler, removeProductFromCart } = useCartContext();
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const filterSimilarProds = products.filter((item) => {
      let isIncluded;
      productDetails.subCategory?.forEach((value, i) => {
        if (
          productDetails._id != item._id &&
          item.subCategory.includes(value)
        ) {
          isIncluded = true;
        }
      });
      return isIncluded;
    });
    setSimilarProducts(filterSimilarProds);
  }, [productDetails]);
  return (
    <>
      <h5>
        More items you may like in {productDetails.subCategory?.join(", ")}
      </h5>
      <div className="d-flex h">
        {similarProducts.map((item) => (
          <div className="d-flex flex-column align-items-center mx-2">
            <div className="flex-fill d-flex align-items-center">
              <img
                src={item.thumbnailImageUrl}
                alt={`${item} Image`}
                className="img-fluid"
              />
            </div>
            <div className="p-2 d-flex flex-column align-items-center">
              <div>{item.name}</div>
              <div className="fw-bold">₹{item.sellingPrice}</div>
            </div>
            {cart.filter((curr) => curr.productId._id === item._id).length ? (
              <Link to='/cart' className="btn btn-info">Go to Cart</Link>
            ) : (
              <button
                className="btn btn-secondary rounded-0 w-100"
                onClick={() => {
                  addToCartHandler(item);
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
