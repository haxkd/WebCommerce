import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./includes/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import APIurl from "./includes/config";
import { toast } from "react-toastify";

const Product = (props) => {
  const navigate = useNavigate();

  let param = useParams();
  let [product, setProduct] = useState({});
  let [quantity, setQuantity] = useState(0);
  useEffect(() => {
    let apiuri = APIurl + "/api/product/" + param.pid;
    axios
      .get(apiuri)
      .then(function (response) {
        // handle success
        setProduct(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  }, []);

  function chnageValue(val) {
    if (val == -1 && quantity == 0) {
      return;
    }
    setQuantity(val + quantity);
  }

  function addToCart() {
    if (localStorage.getItem("user") == null) {
      toast.error("Please Login First", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    axios
      .post(
        APIurl + "/api/Orders/AddToCart",
        {
          pid: param.pid,
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("user"),
          },
        }
      )
      .then(function (response) {
        toast.success("Product added to cart", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="container">
          <div>
            <img />
          </div>
          <div
            className="row p-5"
            style={{ backgroundColor: "rgba(230,230,230,0.7)" }}
          >
            {product && (
              <>
                <div className="col-md-12 mb-3 d-flex justify-content-center">
                  <img
                    src={product.pImage && APIurl + "/" + product.pImage}
                    style={{ minWidth: "400px", height: "300px" }}
                  />
                </div>
                <div className="col-md-6">
                  <p>
                    <b>{product.pname}</b>
                  </p>
                  <p>${product.pPrice}</p>
                  <p>flat {product.pDiscount}$ off</p>
                </div>
                <div className="col-md-6">
                  <button
                    onClick={() => {
                      chnageValue(+1);
                    }}
                    className="btn btn-outline-success"
                  >
                    +
                  </button>
                  <input
                    readOnly
                    type="number"
                    value={quantity}
                    style={{
                      border: "none",
                      outline: "none",
                      width: "50px",
                      textAlign: "center",
                    }}
                  />
                  <button
                    onClick={() => {
                      chnageValue(-1);
                    }}
                    className="btn btn-outline-success"
                  >
                    -
                  </button>
                </div>

                <div className="col-md-12 d-flex justify-content-center">
                  <button
                    onClick={addToCart}
                    className="btn btn-outline-danger"
                  >
                    Add To Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
