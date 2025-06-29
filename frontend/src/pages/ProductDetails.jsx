import { useParams } from "react-router";
import { products } from "../products";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import StarsForRating from "../components/StarsForRating";
import SimilarProducts from "../components/SimilarProducts";
import useCartContext from "../contexts/CartContext";
import useWishlistContext from "../contexts/WishlistContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { red } from "@mui/material/colors";
import useFetch from "../customHooks/useFetch";

export default function ProductDetails() {
  const id = useParams().productId;
  const { data } = useFetch(`https://e-commerce-app-ten-pi.vercel.app/products/${id}`)
  const [productDetails, setProductDetails] = useState(data || {})
  const { cart, addToCartHandler, removeProductFromCart } = useCartContext();
  const { wishlist, wishlistHandler } = useWishlistContext();
  const [quantity, setQuantity] = useState(
    cart.filter((item) => item.prod.id == id)[0]?.quantity || 0
  );
  const [isInWishlist, setIsInWishlist] = useState(wishlist.includes(productDetails));

  useEffect(() => {
    if(data){
      setProductDetails(data)
    }
  }, [data])

  if(productDetails)
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <div
        className="d-flex flex-column flex-wrap flex-grow-1 align-items-center"
        style={{ backgroundColor: "#E0E0E0" }}
      >
        <div className="flex-grow-1 container p-4">
          <div className="bg-light">
            <div className="container py-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-wrap flex-sm-nowrap  justify-content-center justify-content-sm-start">
                  <div className="d-flex flex-column me-3">
                    <div className="pt-3 pe-3" style={{position: 'relative'}}>
                      <img
                        src={productDetails.largeImageUrl}
                        alt="Product Image"
                        className="img-fluid"
                      />
                      <span className="" style={{position: 'absolute', top: '1rem', right: '-1rem'}}
                      onClick={() => {
                        wishlistHandler(productDetails)
                        setIsInWishlist(!isInWishlist)
                      }}>
                      {isInWishlist ? (
                        <FavoriteIcon
                          sx={{ color: red[500] }}
                          className=""
                        ></FavoriteIcon>
                      ) : (
                        <FavoriteBorderIcon className="" style={{}}></FavoriteBorderIcon>
                      )}
                    </span>
                    </div>
                    
                    <div className="w-100 my-3">
                      <button className="w-100">Buy Now</button>
                    </div>
                    <div className="w-100">
                      <button
                        className="w-100"
                        onClick={() => {
                          addToCartHandler(productDetails);
                          setQuantity(quantity + 1);
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>

                  <div className="container py-3 d-flex flex-column flex-nowrap">
                    <div>{productDetails.fullTitle}</div>
                    <div>
                      {productDetails.rating} -{" "}
                      <StarsForRating rating={productDetails.rating} />
                    </div>

                    <div className="d-flex">
                      <span className="fw-bold fs-5 pe-2">
                        ₹{productDetails.sellingPrice}
                      </span>
                      <span className="text-decoration-line-through fs-6 text-secondary">
                        {productDetails.originalPrice}
                      </span>
                    </div>
                    <div className="text-secondary fw-bold fs-5">
                      {productDetails.discount}%
                    </div>
                    <div className="d-flex flex-wrap">
                      Quantity:{" "}
                      <button
                        className="rounded-circle mx-2"
                        onClick={() => {
                          const newQuantity =
                            removeProductFromCart(productDetails);
                          setQuantity(newQuantity);
                        }}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <input
                        type=""
                        value={quantity}
                        className="rounded-pill text-center"
                        style={{ width: 50 }}
                      />
                      <button
                        className="rounded-circle mx-2"
                        onClick={() => {
                          addToCartHandler(productDetails);
                          setQuantity(quantity + 1);
                        }}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                    <div className="mt-3 d-flex">
                      Size:
                      <div className="d-flex flex-wrap">
                        <span className="border border-secondary border-2 px-2 m-2">
                          S
                        </span>
                        <span className="border border-secondary border-2 px-2 m-2">
                          M
                        </span>
                        <span className="border border-secondary border-2 px-2 m-2">
                          XL
                        </span>
                        <span className="border border-secondary border-2 px-2 m-2">
                          XXL
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex flex-wrap justify-content-around">
                      <div className="d-flex flex-column align-items-center">
                        <span>
                          <i className="fa-solid fa-truck fa-2xl"></i>
                        </span>
                        <span>Free Delivery</span>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <span>
                          <i className="fa-solid fa-money-bills fa-2xl"></i>
                        </span>
                        <span>Cash on Delivery</span>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <span>
                          <i className="fa-brands fa-paypal fa-2xl"></i>
                        </span>
                        <span>Secure Payment</span>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <span>
                          <i className="fa-solid fa-right-left"></i>
                        </span>
                        <span>Secure Payment</span>
                      </div>
                    </div>
                    <hr />
                    <div>
                      Description
                      <ul>
                        {productDetails.description?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <SimilarProducts
                    productDetails={productDetails}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
