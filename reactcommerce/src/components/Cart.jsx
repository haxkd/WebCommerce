import React, { useEffect, useState } from "react";
import Navbar from "./includes/Navbar";
import { Link, useNavigate } from "react-router-dom";
import APIurl from "./includes/config";
import { toast } from "react-toastify";
import axios from "axios";
const Cart = () => {
  const navigate = useNavigate();
  let [cart, setCart] = useState([]);
  if (localStorage.getItem("user") == null) {
    toast.error("Please Login First", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }
  useEffect(() => {
    let apiuri = APIurl + "/api/Orders/GetCart";
    axios
      .get(apiuri, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user"),
        },
      })
      .then(function (response) {
        setCart(response.data);
      })
      .catch(function (error) {
        if (error.response.status == "401") {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          toast.error("Please Login First", {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.removeItem("user");
        }
      });
  }, []);

  function changeValue(val, cid) {
    axios
      .put(
        APIurl + "/api/Orders/EditCart/" + cid + "?quantity=" + val,
        {
          id: cid,
          quantity: val,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("user"),
          },
        }
      )
      .then(function (response) {})
      .catch(function (error) {
        if (error.response.status == "401") {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          toast.error("Please Login First", {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.removeItem("user");
        }
      });
  }

  function makeOrder() {
    axios
      .post(
        APIurl + "/api/Orders/MakeOrder",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("user"),
          },
        }
      )
      .then(function (response) {
        toast.success("Order Placed successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/orders");
      })
      .catch(function (error) {
        if (error.response.status == "401") {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          toast.error("Please Login First", {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.removeItem("user");
        }
      });
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <table className="my-5 table table-bordered border-primary table-light table-striped">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link to={`/product/${value.product && value.product.pid}`}>
                        <img
                          src={value.product && APIurl + "/" + value.product.pImage}
                          style={{ width: "200px", height: "100px" }}
                        />
                      </Link>
                    </td>
                    <td>
                      <p>{value.product && value.product.pname}</p>
                      <p>upto ${value.product && value.product.pDiscount} off </p>
                      <p>${value.product && value.product.pPrice}</p>
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          let val = parseInt(e.target.nextElementSibling.value);
                          e.target.nextElementSibling.value = val + 1;
                          changeValue(val + 1, value.cid);
                        }}
                        className="btn btn-outline-success"
                      >
                        +
                      </button>
                      <input
                        readOnly
                        className="text-center"
                        style={{
                          width: "50px",
                          border: "none",
                          outline: "none",
                        }}
                        value={value.quantity}
                      />
                      <button
                        onClick={(e) => {
                          let val = parseInt(
                            e.target.previousElementSibling.value
                          );
                          if (val != 0) {
                            e.target.previousElementSibling.value = val - 1;
                            changeValue(val - 1, value.cid);
                          }
                        }}
                        className="btn btn-outline-success"
                      >
                        -
                      </button>
                    </td>
                  </tr>
                );
              })}
            {cart.length < 1 && (
              <>
                <tr>
                  <td className="text-center" colSpan={5}>
                    No Item In cart
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <div className="text-center">
          {cart.length > 0 && (
            <>
              {" "}
              <button onClick={makeOrder} className="btn btn-outline-dark">
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
