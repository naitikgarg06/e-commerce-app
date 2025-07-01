import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";

const CartContext = createContext();

const useCartContext = () => useContext(CartContext);
export default useCartContext;

export function CartProvider({ children }) {
  const { data, loading, error } = useFetch("https://e-commerce-app-ten-pi.vercel.app/cart");
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if ((data && data.error) || error) {
      setCart([]);
    }
    if (data && data.length) {
      setCart(data);
    }
  }, [data, error]);

  async function addToCartHandler(prod) {
    // check if prod is not added
    if (!cart.filter((item) => item.productId._id === prod._id).length) {
      const response = await fetch("https://e-commerce-app-ten-pi.vercel.app/cart", {
        method: "POST",
        body: JSON.stringify({ productId: prod._id, quantity: 1 }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const newProduct = await response.json();
        setCart((prevState) => [...cart, newProduct]);
        return true;
      } else {
        console.log("Failed to add to cart");
        return false;
      }
    } else {
      return false;
    }
  }

  async function incrementQuantity(cartId, quantity) {
    const response = await fetch(`https://e-commerce-app-ten-pi.vercel.app/cart/${cartId}`, {
      method: "POST",
      body: JSON.stringify({ quantity: quantity + 1 }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.ok) {
      const updatedCart = cart.map((item) =>
        item._id == cartId ? { ...item, quantity: quantity + 1 } : item
      );
      setCart(updatedCart);
      return quantity + 1;
    } else {
      return quantity;
    }
  }

  async function decrementQuantity(cartId, quantity) {
    if (quantity === 1) {
      // remove item:
      await removeProductFromCart(cartId);
      return 0;
    } else {
      const response = await fetch(`https://e-commerce-app-ten-pi.vercel.app/cart/${cartId}`, {
        method: "POST",
        body: JSON.stringify({ quantity: quantity - 1 }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const updatedCart = cart.map((item) =>
          item._id == cartId ? { ...item, quantity: quantity - 1 } : item
        );
        setCart(updatedCart);
        return quantity - 1;
      } else {
        return quantity;
      }
    }
  }

  async function removeProductFromCart(cartId) {
    if (cart.filter((item) => item._id == cartId).length) {
      const response = await fetch(`https://e-commerce-app-ten-pi.vercel.app/cart/${cartId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedProductQuantity = cart.filter(
          (item) => item._id != cartId
        );
        setCart(updatedProductQuantity);
      }
    }
  }

  if (cart)
    return (
      <CartContext.Provider
        value={{
          cart,
          incrementQuantity,
          removeProductFromCart,
          decrementQuantity,
          addToCartHandler,
        }}
      >
        {children}
      </CartContext.Provider>
    );
}
