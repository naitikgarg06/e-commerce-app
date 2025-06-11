import { useEffect, useState } from "react";
import { Link } from "react-router";

const categories = ["Electronics", "Home Appliances", "Fashion", "Books", 'Health'];

export default function Category() {
  return (
    <div className="container px-5 mt-4 text-center h-100">
      <h1 className="text-center mb-3">Categories</h1>
      <div className="row g-5 justify-content-center">
        {categories?.map(item => (
          <div className="col-12 col-md-4">
            <Link to={`/${item.toLowerCase()}`}>
            <img src={`https://placehold.co/300x200?text=${item}`} className="img-fluid" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}