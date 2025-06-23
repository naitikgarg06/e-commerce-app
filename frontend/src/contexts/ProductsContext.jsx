import { createContext, useContext } from "react";
import { products } from "../products";

const ProductsContext = createContext()

export default function useProductsContext(){
    return useContext(ProductsContext);
}

export function ProductsProvider({children}){
    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}