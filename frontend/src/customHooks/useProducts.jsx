import { useEffect, useState } from "react";
import useProductsContext from "../contexts/ProductsContext";

export default function useProducts(category) {
  const { products } = useProductsContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortingValue, setSortingValue] = useState("none");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(
    parseFloat(
      products.reduce((acc, curr) => {
        // console.log(acc)
        if (curr.category.toLowerCase() == category) {
          return curr.sellingPrice > acc ? curr.sellingPrice : acc;
        } else {
          return acc;
        }
      }, 0)
    )
  );
  const [currPriceValue, setCurrPriceValue] = useState(maxPrice);
  const [selectedSubCategory, setSelectedSubCatgeory] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  // console.log(maxPrice)
  useEffect(() => {
    // console.log("in effect");
    const productsListByCategory = products.filter((prod) => {
      const isSameCategory =
        prod.category.toLowerCase() == category ? true : false;
      let isSubCategoryMatched = selectedSubCategory.length ? false : true;
      selectedSubCategory?.forEach((item) => {
        if (prod.subCategory.includes(item)) {
          // console.log("yes");
          isSubCategoryMatched = true;
        }
      });
      let isInRatingRange = selectedRating
        ? prod.rating >= selectedRating
        : true;
      let isInPriceRange = parseFloat(prod.sellingPrice) <= currPriceValue;
      return (
        isSameCategory &&
        isSubCategoryMatched &&
        isInRatingRange &&
        isInPriceRange
      );
    });
    // console.log(productsListByCategory);
    // let maxValue = productsListByCategory.reduce(
    //   (acc, curr) =>
    //     parseInt(curr.originalPrice) > acc ? parseInt(curr.originalPrice) : acc,
    //   0
    // );
    // setMaxPrice(maxValue);
    // setCurrPriceValue((maxValue - minPrice) / 2);

    setFilteredProducts(productsListByCategory);

    // set sorting to prev type:
    sortProductsHandler(sortingValue, productsListByCategory);

    // filterProdsByPriceRange(currPriceValue, productsListByCategory);
    // filterProductsByRating(selectedRating, productsListByCategory);
  }, [selectedSubCategory, sortingValue, selectedRating, currPriceValue]);

  //   sort product by price:
  function sortProductsHandler(sortValue, productsArray) {
    // console.log(sortingType);
    if (sortValue != "none") {
      const sortedProducts =
        sortValue === "low"
          ? productsArray.sort((a, b) => a.sellingPrice - b.sellingPrice)
          : productsArray.sort((a, b) => b.sellingPrice - a.sellingPrice);
      setFilteredProducts([...sortedProducts]);
    }
  }

  // filter products by sub-category:
  function handleSubCategory(e) {
    const { value, checked } = e.target;
    checked
      ? setSelectedSubCatgeory((prev) => [...prev, value])
      : setSelectedSubCatgeory((prev) => prev.filter((curr) => curr != value));
  }

  // filter prods by rating:

  function filterProductsByRating(rating, productsArray) {
    console.log(rating);
    if (rating) {
      const newProducts = productsArray.filter(
        (prod) => parseFloat(prod.rating) >= parseFloat(`${rating}`)
      );
      setFilteredProducts([...newProducts]);
    }
  }

  // filter prods by price range:

  function filterProdsByPriceRange(price) {
    const newProducts = products.filter(
      (prod) => prod.sellingPrice >= minPrice && prod.sellingPrice <= price
    );
    setFilteredProducts(newProducts);
  }

  return {
    filteredProducts,
    currPriceValue,
    setCurrPriceValue,
    minPrice,
    maxPrice,
    sortProductsHandler,
    setFilteredProducts,
    handleSubCategory,
    selectedSubCategory,
    setSortingValue,
    filterProductsByRating,
    setSelectedRating,
    filterProdsByPriceRange,
  };
}
