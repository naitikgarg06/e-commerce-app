import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";

const ProductsContext = createContext();

export default function useProductsContext() {
  return useContext(ProductsContext);
}

export function ProductsProvider({ children }) {
  const { data, loading, error } = useFetch(
    "https://e-commerce-app-ten-pi.vercel.app/products"
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data && data.length) {
      setProducts(data);
    }
  }, [data]);

  if (loading)
    return (
      <div className="container py-5">
        <p className="text-center display-4 fw-semibold text-danger">Loading</p>
      </div>
    );
    
  if (error) return <p>Error fetching products</p>;

  if (products && products.length)
    return (
      <ProductsContext.Provider value={{ products, setProducts }}>
        {children}
      </ProductsContext.Provider>
    );
}
