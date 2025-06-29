import { useEffect, useState } from "react";
import { Link } from "react-router";
import useFetch from "../customHooks/useFetch";

// const categories = ["Electronics", "Home Appliances", "Fashion", "Books", 'Health'];

export default function Category() {
  const { data, loading, error } = useFetch(
    "https://e-commerce-app-ten-pi.vercel.app/category"
  );
  const [categories, setCategories] = useState(data || []);

  useEffect(() => {
    if (data && data.length) {
      setCategories(data);
    }
  }, [data]);

  function createCategoryRoute(route) {
    return route.split(" ").join("-");
  }

  // console.log(createCategoryRoute("home"))

  if (loading)
    return (
      <div className="container px-5 mt-4 text-center h-100">
        <h1 className="text-center mb-3">Categories</h1>
        <div className="row g-5 justify-content-center">
          <div className="col-12 col-md-4">
            <div className="placeholder">
              <img
                src={`https://placehold.co/300x200?text=loading`}
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="placeholder">
              <img
                src={`https://placehold.co/300x200?text=loading`}
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="placeholder">
              <img
                src={`https://placehold.co/300x200?text=loading`}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container px-5 mt-4 text-center h-100">
      <h1 className="text-center mb-3">Categories</h1>
      <div className="row g-5 justify-content-center">
        {categories &&
          categories.length &&
          categories?.map((item) => (
            <div className="col-12 col-md-4">
              <Link
                to={`/${item.category.toLowerCase()}`}
                state={{ id: item._id }}
              >
                <img
                  src={`https://placehold.co/300x200?text=${item.category}`}
                  className="img-fluid"
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
