import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  function logOut(){
    localStorage.removeItem("user");
    toast.success("logout successfull", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Grocery App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              {localStorage.getItem("user")==null && <>
              <li className="nav-item">
                <Link to="/login" className="nav-link active">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link active">
                  Register
                </Link>
              </li></>
              }
              {localStorage.getItem("user")!=null && <>
              <li className="nav-item">
                <Link to="/cart" className="nav-link active">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link active">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={logOut} className="nav-link active">
                  Logout
                </Link>
              </li>
              </>}
            
            {localStorage.getItem("admin")==null && <>
                <Link to="/admin-login" className="nav-link active">
                  Admin
                </Link>
              </>}
              {localStorage.getItem("admin")!=null && <>
                <Link to="/add-product" className="nav-link active">
                  Add Products
                </Link>
                <Link to="/admin-products" className="nav-link active">
                  Admin Products
                </Link>
              </>}
              </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
