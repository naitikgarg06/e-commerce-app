export default function SimilarProducts({ productDetails, similarProducts }) {
  return (
    <>
      <h5>
        More items you may like in {productDetails.subCategory.join(", ")}
      </h5>
      <div className="d-flex h">
        {similarProducts.map((item) => (
          <div className="d-flex flex-column align-items-center mx-2">
            <div className="flex-fill d-flex align-items-center">
              <img
                src={item.thumbnailImageUrl}
                alt={`${item} Image`}
                className="img-fluid"
              />
            </div>
            <div className="p-2 d-flex flex-column align-items-center">
              <div>{item.name}</div>
              <div className="fw-bold">₹{item.sellingPrice}</div>
            </div>
            <button className="btn btn-secondary rounded-0 w-100">
              Move to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
