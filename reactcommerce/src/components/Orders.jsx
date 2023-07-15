import React, { useEffect, useState } from "react";
import Navbar from "./includes/Navbar";
import { Link, useNavigate } from "react-router-dom";
import APIurl from "./includes/config";
import { toast } from "react-toastify";
import axios from "axios";
const Orders = () => {
  const navigate = useNavigate();
  let [orders, setOrders] = useState([]);
  if (localStorage.getItem("user") == null) {
    toast.error("Please Login First", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }
  useEffect(() => {
    let apiuri = APIurl + "/api/Orders/Orders";
    axios
      .get(apiuri, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user"),
        },
      })
      .then(function (response) {
        setOrders(response.data);
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

  return (
    <>
      <Navbar />
      <div className="container">
        <table className="my-5 table table-bordered border-primary table-light table-striped">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((value, index) => {
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
                    <td>{value.product && value.date}</td>
                  </tr>
                );
              })}
            {orders.length < 1 && (
              <>
                <tr>
                  <td className="text-center" colSpan={5}>
                    You did not made any order yet
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
