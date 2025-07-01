import { createContext, useContext, useState } from "react";
import useFetch from "../customHooks/useFetch";
import { useEffect } from "react";

const WishlistContext = createContext();

const useWishlistContext = () => useContext(WishlistContext);
export default useWishlistContext;

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);
  const { data, loading, error } = useFetch("https://e-commerce-app-ten-pi.vercel.app/wishlist");

  useEffect(() => {
    if (data || error) {
      setWishlist(data || []);
    }
  }, [data, error]);

  async function wishlistHandler(product) {
    if (wishlist.filter((item) => item.itemId._id === product._id).length) {
      // remove item
      const itemId = wishlist.filter(
        (item) => item.itemId._id === product._id
      )[0]._id;
      const response = await fetch(`https://e-commerce-app-ten-pi.vercel.app/wishlist/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setWishlist((prevState) => [...prevState.filter((item) => item.itemId._id !== product._id)]);
      }
    } else {
      // add item
      const response = await fetch("https://e-commerce-app-ten-pi.vercel.app/wishlist", {
        method: "POST",
        body: JSON.stringify({ itemId: product._id }),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const addedItem = await response.json();
        setWishlist([...wishlist, addedItem]);
      }
    }
  }

  if (wishlist) {
    return (
      <WishlistContext.Provider value={{ wishlist, wishlistHandler }}>
        {children}
      </WishlistContext.Provider>
    );
  }
}
