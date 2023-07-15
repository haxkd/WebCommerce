import React, { useState } from "react";
import Navbar from "./includes/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import APIurl from "./includes/config";
import axios from "axios";
const AddProduct = () => {
  if (localStorage.getItem("admin") == null) {
    toast.error("Please Login First", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      navigate("/admin-login");
    }, 1000);
  }
  const navigate = useNavigate();
  let [pname, setpName] = useState("");
  let [pDescription, setpDescription] = useState("");
  let [pCategory, setpCategory] = useState("");
  let [pQuantity, setpQuantity] = useState("");
  let [pImage, setpImage] = useState("");
  let [pPrice, setpPrice] = useState("");
  let [pDiscount, setpDiscount] = useState("");
  let [pSpecification, setpSpecification] = useState("");
  function handleSave() {
    if (!/^[a-zA-Z ]{1,}$/.test(pname.trim())) {
      toast.error("name is not valid", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (!/^[a-zA-Z ]{1,}$/.test(pDescription.trim())) {
      toast.error("description is not valid", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (!/^[a-zA-Z ]{1,}$/.test(pCategory.trim())) {
      toast.error("category is not valid", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (!/^[0-9]{1,}$/.test(pQuantity)) {
      toast.error("quantity is not valid", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (!/^[0-9]{1,}$/.test(pPrice)) {
      toast.error("price is not valid", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (!/^[0-9]{1,}$/.test(pDiscount)) {
      toast.error("discount is not valid", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (document.querySelector("#fileInput").files.length == 0) {
      toast.error("Please choose a file", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (localStorage.getItem("admin") == null) {
      toast.error("Please Login First", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate("/admin-login");
      }, 1000);
    }

    let formData = new FormData();
    formData.append("pname", pname);
    formData.append("pDescription", pDescription);
    formData.append("pCategory", pCategory);
    formData.append("pQuantity", pQuantity);
    formData.append("pPrice", pPrice);
    formData.append("pDiscount", pDiscount);
    formData.append("pSpecification", pSpecification);
    formData.append("pImage", document.querySelector("#fileInput").files[0]);
    // {
    //     pname: pname,
    //     pDescription: pDescription,
    //     pCategory: pCategory,
    //     pQuantity: pQuantity,
    //     pPrice: pPrice,
    //     pDiscount: pDiscount,
    //     pSpecification: pSpecification,
    //     pImage: document.querySelector("#fileInput").files[0],
    //   }
    axios({
      method: "post",
      url: APIurl + "/api/product",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("admin"),
      },
    })
      .then(function (response) {
        toast.success("Product Added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/admin-products");
      })
      .catch(function (error) {
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
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="border rounded">
          <h1 className="text-center my-3">-: Add Product :-</h1>
          <hr />
          <div className="container px-5">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setpName(e.target.value)}
                  value={pname}
                  placeholder="Enter Product Name"
                  className="form-control"
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Description
                </label>
                <input
                  type="email"
                  onChange={(e) => setpDescription(e.target.value)}
                  value={pDescription}
                  placeholder="Enter description"
                  className="form-control"
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Enter Category"
                  className="form-control"
                  onChange={(e) => setpCategory(e.target.value)}
                  value={pCategory}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="Enter Quantity"
                  className="form-control"
                  onChange={(e) => setpQuantity(e.target.value.trim())}
                  value={pQuantity}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter Price"
                  className="form-control"
                  onChange={(e) => setpPrice(e.target.value.trim())}
                  value={pPrice}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Discount
                </label>
                <input
                  type="number"
                  placeholder="Enter Discount"
                  className="form-control"
                  onChange={(e) => setpDiscount(e.target.value.trim())}
                  value={pDiscount}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Specification
                </label>
                <input
                  type="text"
                  placeholder="Enter Specification"
                  className="form-control"
                  onChange={(e) => setpSpecification(e.target.value)}
                  value={pSpecification}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  placeholder="choose jpg or png"
                  className="form-control"
                  accept=".jpg,.png"
                  id="fileInput"
                />
              </div>
              <div className="col-12 mb-3 text-center">
                <button
                  onClick={handleSave}
                  className="btn btn-outline-success"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
