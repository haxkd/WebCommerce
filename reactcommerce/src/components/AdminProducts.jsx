import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import APIurl from "./includes/config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./includes/Navbar";
const AdminProducts = () => {
  const navigate = useNavigate();

  let [products, setProducts] = useState();
  let [query, setQuery] = useState("");
  let apiuri = APIurl + "/api/product";

  if (localStorage.getItem("admin") == null) {
    toast.error("Please Login First", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      navigate("/admin-login");
    }, 1000);
  }

  function getAllData() {
    axios
      .get(apiuri)
      .then(function (response) {
        // handle success
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  useEffect(() => {
    getAllData();
  }, []);

  function queryData(val) {
    axios
      .get(APIurl + "/api/product/search/" + val)
      .then(function (response) {
        // handle success
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
  function handleDelete(pid){
    console.log(pid);
    let c = window.confirm("are your sure want to delete");
    if(c){
      axios({
        method: "delete",
        url: APIurl + "/api/product/"+pid,
        //data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("admin"),
        },
      })
        .then(function (response) {
          console.log(response);
          toast.success("Product Deleted successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/admin-products");
        })
        .catch(function (error) {
          console.log(error);
          if (error.response && error.response.status == "401") {
            setTimeout(() => {
              navigate("/admin-login");
            }, 1000);
            toast.error("Please Login First", {
              position: toast.POSITION.TOP_RIGHT,
            });
            localStorage.removeItem("admin");
          }
        });


    }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <select>
            <option>1</option>
          </select>
          <input
            placeholder="search query"
            onChange={(e) => {
              let val = e.target.value.trim();
              setQuery(val);
              if (val.length > 0) {
                queryData(val);
              } else {
                getAllData();
              }
            }}
            value={query}
          />
        </div>
        <div className="table-responsive">
          <table className="my-5 table table-bordered border-primary table-light table-striped">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link to={`/product/${value.pid}`}>{value.pname}</Link>
                      </td>
                      <td>{value.pDescription}</td>
                      <td>${value.pPrice}</td>
                      <td>
                        <img
                          src={APIurl + "/" + value.pImage}
                          style={{ width: "200px", height: "100px" }}
                        />
                      </td>
                      <td>
                        <Link to={`/edit-product/${value.pid}`}>
                          <button className="btn btn-outline-success">
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button onClick={()=>handleDelete(value.pid)} className="btn btn-outline-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
