import { Link } from "react-router";
import Header from "../components/Header";
import useWishlistContext from "../contexts/WishlistContext";
import useCartContext from "../contexts/CartContext";
import { useNavigate} from 'react-router'

export default function Wishlist() {
  const naviagte = useNavigate()
  const { wishlist } = useWishlistContext();
  const { cart, addToCartHandler } = useCartContext();
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <div className="flex-grow-1" style={{ background: "#E0E0E0" }}>
        <div className="container p-4">
          <h4 className="text-center">My Wishlist</h4>
          <div className="d-flex justify-content-center flex-wrap">
            {wishlist?.map(({ _id, itemId: item }) => (
              <div className="card m-2" style={{ width: "18rem", cursor: 'pointer' }} key={_id}  onClick={() => {
                naviagte(`/${item.category.toLowerCase()}/product/${item._id}`)
              }}>
                <div
                  className=""
                  style={{ height: "130px ", aspectRatio: "3/4" }}
                >
                  <img
                    src={item.thumbnailImageUrl}
                    className="img-fluid d-block mx-auto object-fit-cover"
                    alt="item image"
                  />
                </div>
                <div className="card-body d-flex flex-column align-items-center p-0 pt-3">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text fw-semibold fs-5">
                    {item.sellingPrice}
                  </p>
                  {cart.filter((curr) => curr.productId._id == item._id)
                    .length ? (
                    <button className="btn btn-info w-100" onClick={(e) => {
                      e.stopPropagation()
                      // e.preventDefault()
                      naviagte('/cart')
                    }}>
                      Go to Cart
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary w-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCartHandler(item);
                      }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
