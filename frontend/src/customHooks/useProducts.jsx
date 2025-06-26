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

  useEffect(() => {
    const productsListByCategory = products.filter((prod) => {
      const isSameCategory =
        prod.category.toLowerCase() == category ? true : false;
      let isSubCategoryMatched = selectedSubCategory.length ? false : true;
      selectedSubCategory?.forEach((item) => {
        if (prod.subCategory.includes(item)) {
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
    setFilteredProducts(productsListByCategory);
    // set sorting to prev type:
    sortProductsHandler(sortingValue, productsListByCategory);
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

  // reset states to clear all filters:

  function clearHandler() {
    setCurrPriceValue(maxPrice);
    setSelectedRating(null);
    setSortingValue("none");
    setSelectedSubCatgeory([]);
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
    selectedRating,
    setSelectedRating,
    clearHandler,
    selectedSubCategory,
    sortingValue
  };
}
