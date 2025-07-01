import { useNavigate } from "react-router";
import Header from "../components/Header";
import useCartContext from "../contexts/CartContext";
import useWishlistContext from "../contexts/WishlistContext";

export default function Cart() {
  const { cart, incrementQuantity, decrementQuantity, removeProductFromCart } = useCartContext();
  const { wishlist, wishlistHandler } = useWishlistContext();
  const naviagte = useNavigate()

  console.log(cart);
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <div className="flex-fill p-4" style={{ background: "#E0E0E0" }}>
        <section className="container px-5">
          <h4 className="text-center">MY CART (1)</h4>
          <div className="row g-3 flex-column-reverse flex-md-row">
            <div className="col-12 col-md-8 bg-light pb-3">
              {cart?.map(
                ({ _id: cartId, productId: product, quantity }, index) => (
                  <div
                    className="row d-flex w-100 flex-column flex-sm-row align-items-center"
                    key={index}
                  >
                    <div class="col-sm-4" onClick={() => {
                      naviagte(`/${product.category.toLowerCase()}/product/${product._id}`)
                    }} style={{cursor: 'pointer'}}>
                      <img
                        src={product.thumbnailImageUrl}
                        class="img-fluid mx-auto d-block"
                        alt="Product Images"
                      />
                    </div>
                    <div class="col-sm-8 flex-grow-1 ps-sm-4 d-flex flex-column align-items-center align-items-sm-start">
                      <span className="text-center">
                        <h4>{product.name}</h4>
                      </span>
                      <div className="d-flex align-items-end flex-wrap">
                        <span className="fw-bold fs-5 pe-2">
                          ₹{product.sellingPrice}
                        </span>
                        <span className="fw-semibold text-decoration-line-through fs-6 text-secondary">
                          {product.originalPrice}
                        </span>
                      </div>
                      <div className="">{product.discount}%</div>
                      <div className="d-flex flex-column flex-sm-row flex-wrap align-items-center">
                        <span className="pe-2">Quantity: </span>
                        <div className="d-flex flex-nowrap">
                          <button
                            className="rounded-circle me-2"
                            onClick={() => {
                              decrementQuantity(cartId, quantity);
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
                              incrementQuantity(cartId, quantity);
                            }}
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center mt-4">
                        <button
                          to="/home appliances"
                          className="btn btn-primary rounded-0 w-100 mb-2"
                          onClick={async () => {
                            await removeProductFromCart(cartId)
                          }}
                        >
                          Remove From Cart
                        </button>
                        {wishlist.filter(
                          (item) => item.itemId._id === product._id
                        ).length ? (
                          <button
                            className="btn btn-info rounded-0 w-100"
                            onClick={async () => {
                              await wishlistHandler(product);
                            }}
                          >
                            Remove from Wishlist
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary rounded-0 w-100"
                            onClick={async () => {
                              await wishlistHandler(product);
                            }}
                          >
                            Save to Wishlist
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="container">
                      {index < cart.length - 1 && <hr className="" />}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="col-12 col-md-4">
              <div className="bg-light p-3">
                <span className="fw-bold">
                  <h5>PRICE DETAILS</h5>
                </span>
                <hr />
                <div className="d-flex justify-content-between flex-wrap">
                  <span>Subtotal (2 items)</span>
                  <span>₹2000</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Delivery Charges:</span>
                  <span>₹200</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span>
                    <h5>TOTAL AMOUNT</h5>
                  </span>
                  <span>₹3000</span>
                </div>
                <div className="mt-3">
                  <button className="btn btn-primary w-100 btn-sm">
                    PLACE ODER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
