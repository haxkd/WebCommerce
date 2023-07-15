import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import APIurl from "./includes/config";
import { Link } from "react-router-dom";
import Pagination from "./includes/Pagination";
import "./includes/pagination.css";
const Products = () => {
  let PageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);

  let [products, setProducts] = useState([]);
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllData();
    getAllCategories();
  }, []);

  function getAllData() {
    let apiuri = APIurl + "/api/product";
    axios
      .get(apiuri)
      .then(function (response) {
        // handle success
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
      .finally(function () {
      });
  }
  function getAllCategories() {
    let apiuri = APIurl + "/api/product/categories";
    axios
      .get(apiuri)
      .then(function (response) {
        // handle success
        setCategories(response.data);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  function queryData(query) {
    setCurrentPage(1);

    if (query.trim().length == 0) {
      getAllData();
      return;
    }
    axios
      .get(APIurl + "/api/product/search/" + query)
      .then(function (response) {
        // handle success
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
  function chooseCategory(val) {
    setCurrentPage(1);
    if (val == "0") {
      getAllData();
      return;
    }
    axios
      .get(APIurl + "/api/product/category/" + val)
      .then(function (response) {
        // handle success
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }


  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return (products && products.slice(firstPageIndex, lastPageIndex));
  });

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <select onChange={(e) => chooseCategory(e.target.value)}>
            <option key={1000000} value="0">-- all category --</option>
            {categories &&
              categories.map((value, index) => {
                return (
                  <>
                    <option key={value} value={value}>
                      {value}
                    </option>
                  </>
                );
              })}
          </select>
          <input
            placeholder="search query"
            onChange={(e) => {
              setTimeout(() => {
                queryData(e.target.value);
              }, 1000);
            }}
          />
        </div>
        <table className="my-5 table table-bordered border-primary table-light table-striped">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {
              currentTableData.map((value, index) => {
                return (
                  <tr key={index * Math.random() * 127}>
                    <td>
                      <Link
                        className="text-decoration-none"
                        to={`product/${value.pid}`}
                      >
                        {value.pname}
                      </Link>
                    </td>
                    <td>{value.pDescription}</td>
                    <td>${value.pPrice}</td>
                    <td className="text-center">
                      <img
                        src={APIurl + "/" + value.pImage}
                        style={{ width: "200px", height: "100px" }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {products && <><Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={products.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      /></>}
      </div>
    </>
  );
};

export default Products;
