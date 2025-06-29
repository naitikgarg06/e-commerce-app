import { useEffect, useState } from "react";
import useProductsContext from "../contexts/ProductsContext";
import useFetch from "./useFetch";

export default function useProducts(categoryId) {
  const { data, loading, error } = useFetch(
    `https://e-commerce-app-ten-pi.vercel.app/category/${categoryId}`,
    {}
  );
  const [category, setCategory] = useState('');
  const { products } = useProductsContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortingValue, setSortingValue] = useState("none");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [currPriceValue, setCurrPriceValue] = useState(0);
  const [selectedSubCategory, setSelectedSubCatgeory] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    if (data && data.category) {
      const initialCurrPrice = parseFloat(
        products.reduce((acc, curr) => {
          if (curr.category.toLowerCase() == data.category.toLowerCase()) {
            return curr.sellingPrice > acc ? curr.sellingPrice : acc;
          } else {
            return acc;
          }
        }, 0)
      );
      setCurrPriceValue(initialCurrPrice);
      setMaxPrice(initialCurrPrice);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.category && currPriceValue) {
      const Selectedcategory = data.category;
      const productsListByCategory = products.filter((prod) => {
        const isSameCategory =
          prod.category.toLowerCase() == Selectedcategory.toLowerCase()
            ? true
            : false;

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
      setCategory(Selectedcategory);
    }
  }, [selectedSubCategory, sortingValue, selectedRating, currPriceValue, data]);

  //   sort product by price:
  function sortProductsHandler(sortValue, productsArray) {
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
    sortingValue,
    category,
  };
}
