import { Link } from "react-router";
import Header from "../components/Header";
import useWishlistContext from "../contexts/WishlistContext";
import useCartContext from '../contexts/CartContext';

export default function Wishlist() {
  const { wishlist } = useWishlistContext();
  const {cart, addToCartHandler} = useCartContext()
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <div className="flex-grow-1" style={{ background: "#E0E0E0" }}>
        <div className="container p-4">
          <h4 className="text-center">My Wishlist</h4>
          <div className="d-flex justify-content-center flex-wrap">
            {wishlist?.map((item) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <div className="" style={{ height: '130px ', aspectRatio: '3/4'}}>
                  <img
                    src={item.thumbnailImageUrl}
                    class="img-fluid d-block mx-auto object-fit-cover"
                    alt="..."
                  />
                </div>
                <div class="card-body d-flex flex-column align-items-center p-0 pt-3">
                  <h5 class="card-title">{item.name}</h5>
                  <p class="card-text fw-semibold fs-5">
                    {item.sellingPrice}
                  </p>
                  <button class="btn btn-primary w-100" onClick={() => {addToCartHandler(item)}}>
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
