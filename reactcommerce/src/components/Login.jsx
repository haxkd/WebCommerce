import React, { useState } from "react";
import Navbar from "./includes/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import APIurl from "./includes/config";
import axios from "axios";
const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  

  function handleLogin() {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("email is in wrong format", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (password.trim().length == 0) {
      toast.error("password is empty", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    let apiuri = APIurl + "/api/users/login";
    axios
      .post(apiuri, {
        email: email,
        password: password,
      })
      .then(function (response) {
        // handle success
        toast.success("user login successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        localStorage.setItem("user", response.data);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      })
      .catch(function (error) {
        // handle error
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .finally(function () {
        // always executed
      });
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="border border-rounded">
          <h1 className="text-center my-3">-: LOGIN :-</h1>
          <hr />
          <div className="container px-5">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter Your Email"
                  className="form-control"
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="form-control"
                  placeholder="Enter Your password"
                />
              </div>
              <div className="col-12 mb-3 text-center">
                <button
                  onClick={handleLogin}
                  className="btn btn-outline-success"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
