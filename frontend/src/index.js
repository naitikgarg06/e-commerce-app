import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import { ProductsProvider } from "./contexts/ProductsContext";

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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <RouterProvider router={routes} />
    </ProductsProvider>
  </React.StrictMode>
);
