import { createContext, useContext, useState } from "react";
import { products as productList } from "../products";

const ProductsContext = createContext()

export default function useProductsContext(){
    return useContext(ProductsContext);
}

export function ProductsProvider({children}){
    const [products, setProducts] = useState(productList)
    return (
        <ProductsContext.Provider value={{products, setProducts}}>
            {children}
        </ProductsContext.Provider>
    )
}