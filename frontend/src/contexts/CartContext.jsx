import { createContext, useContext, useEffect, useState } from "react";
import useProductsContext from "./ProductsContext";

const CartContext = createContext();

const useCartContext = () => useContext(CartContext);
export default useCartContext;

export function CartProvider({ children }) {
  const { products, setProducts } = useProductsContext();
  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //     setCart(products.filter((prod) => prod.isAddedToCart))
  // }, [products])

    console.log(cart)


  function addToCartHandler(prod) {
    // check if prod is not added
    if (!cart.filter((item) => item.prod == prod).length) {
      setCart((prevState) => [...cart, { prod, quantity: 1 }]);
    } else {
      // const currQuantity = cart.filter((item) => item.prod == prod)[0].quantity
      const updatedProductQuantity = cart.map((item) =>
        item.prod == prod ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedProductQuantity);
    }
  }

  function removeProductFromCart(prod) {
    if (cart.filter((item) => item.prod == prod).length) {
      const currQuantity = cart.filter((item) => item.prod == prod)[0].quantity;
      if (currQuantity > 1) {
        const updatedProductQuantity = cart.map((item) =>
          item.prod == prod ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedProductQuantity);
        return currQuantity - 1;
      } else {
        const updatedProductQuantity = cart.filter((item) => item.prod != prod);
        setCart(updatedProductQuantity);
        return 0;
      }
    } else {
      return 0;
    }
  }

  // function
  // console.log(cart)
  return (
    <CartContext.Provider
      value={{ cart, addToCartHandler, removeProductFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
