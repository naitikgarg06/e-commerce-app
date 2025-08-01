import { Link } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { red } from "@mui/material/colors";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid py-2">
        <Link to={"/"} className="navbar-brand" href="#">
          Shopper's Stop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex mx-auto mt-3 mt-lg-0" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item me-2">
              <a
                className="nav-link active btn btn-info"
                aria-current="page"
                href="#"
              >
                Login
              </a>
            </li>
           
            <li className="nav-item mx-2">
              <Link to={"/wishlist"} className="nav-link active" href="#">
                {/* <FavoriteIcon sx={{color: red[500]}} ></FavoriteIcon> */}
                <FavoriteBorderIcon></FavoriteBorderIcon>
              </Link>
            </li>
            <li className="nav-item ms-2">
              <Link to={"/cart"} className="nav-link active" href="#">
                <i className="fa-solid fa-cart-shopping fa-xl"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
