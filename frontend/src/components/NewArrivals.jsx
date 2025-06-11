export default function NewArrivals() {
  const newArrivedProducts = [
    {
      id: 1,
      type: "Winter Collection",
      description:
        "Check out our best winter collection to stay warm in style this session",
      imageUrl: 'https://placehold.co/100x150',
    },
    {
      id: 2,
      type: "New Year Smartphones",
      description:
        "Latest smartphone launches by top brand like - Apple, Samsung, Oneplus and many more",
      imageUrl: 'https://placehold.co/100x150',
    },
  ];

  return (
   <section className="mb-5">
    <div className="container my-4">
    <div className="row g-3">
        {newArrivedProducts?.map((prod) => (
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body d-flex align-items-center">
                        <div><img src={prod.imageUrl} /></div>
                        <div className="d-flex flex-column justify-content-between ps-3">
                            <h5>NEW ARRIVALS</h5>
                            <div>
                                <h5>{prod.type}</h5>
                                <p>{prod.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
    </div>
   </section>
  )
}
