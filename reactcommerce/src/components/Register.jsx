import React, { useState } from "react";
import Navbar from "./includes/Navbar";
import { toast, ToastContainer } from "react-toastify";
import APIurl from "./includes/config";
import axios from "axios";

const Register = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [password, setPassword] = useState("");
  let [cpassword, setCpassword] = useState("");

  function register() {
    if (!/^[a-zA-Z ]{1,}$/.test(name.trim())) {
      toast.error("name is not valid", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (password != cpassword) {
      toast.error("password and confirm password didnt matched", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("email is in wrong format", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (!/^[\d]{10}$/.test(mobile)) {
      toast.error("invalid mobile number", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    let apiuri = APIurl + "/api/users/signup";
    axios
      .post(apiuri, {
        uemail: email,
        uname: name,
        umobile: mobile,
        upassword: password,
      })
      .then(function (response) {
        // handle success
        toast.success("user register successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
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
        <div className="border rounded">
          <h1 className="text-center my-3">-: REGISTER :-</h1>
          <hr />
          <div className="container px-5">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter Your Name"
                  className="form-control"
                />
              </div>
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
                  Mobile
                </label>
                <input
                  type="text"
                  placeholder="Enter Your mobile number"
                  className="form-control"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="confirm your password"
                  className="form-control"
                  onChange={(e) => setCpassword(e.target.value)}
                  value={cpassword}
                />
              </div>
              <div className="col-12 mb-3 text-center">
                <button onClick={register} className="btn btn-outline-success">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
