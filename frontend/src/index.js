import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import { WishlistProvider } from "./contexts/WishlistContext";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:category",
    element: <Products />,
  },
  {
    path: `/:category/product/:productId`,
    element: <ProductDetails />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={routes} />
        </WishlistProvider>
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
);
