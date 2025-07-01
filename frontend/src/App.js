import { useEffect } from "react";
import Category from "./components/Category";
import Header from "./components/Header";
import NewArrivals from "./components/NewArrivals";
import useFetch from "./customHooks/useFetch";
import useProducts from "./customHooks/useProducts";
import useProductsContext from "./contexts/ProductsContext";

function App() {
  return (
    <div className="App h-100">
      <Header />
      <Category />
      <section className="container mt-4">
        <div className="">
          <img
            src="https://deerdesigner.com/wp-content/uploads/2024/05/Article-34-ecommerce-design-01.png.webp"
            className="img-fluid"
          />
        </div>
      </section>
      <NewArrivals />
    </div>
  );
}

export default App;
