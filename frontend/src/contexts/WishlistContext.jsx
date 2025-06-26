import { createContext, useContext, useState } from 'react'

const WishlistContext = createContext()

const useWishlistContext = () => useContext(WishlistContext)
export default useWishlistContext

export function WishlistProvider( {children} ){
    const [wishlist, setWishlist] = useState([])

    function wishlistHandler(product){
        if(wishlist.includes(product)){
            setWishlist((prevState) => wishlist.filter((item) => item !== product))
        } else {
            setWishlist((prevState) => [...prevState, product])
        }
    }

    return (
        <WishlistContext.Provider value={{wishlist, wishlistHandler}}>
            {children}
        </WishlistContext.Provider>
    )
}