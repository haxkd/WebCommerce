import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom"
import Home from './components/Home';
import NotFound from './components/includes/NotFound';
import Product from './components/Product';
import Login from './components/Login';
import Register from './components/Register';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from "react-toastify";
import Cart from './components/Cart';
import Orders from './components/Orders';
import AdminLogin from './components/AdminLogin'
import AdminProducts from './components/AdminProducts';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Footer from './components/includes/Footer';

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:pid" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="admin-products" element={<AdminProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:pid" element={<EditProduct />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <ToastContainer />
<Footer/>
    </>
  );
}

export default App;
