import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Product/Home';
import Blog from './components/Blog/Index';
import Detail from './components/Blog/Detail';
import Login from './components/Member/Login';
import Register from './components/Member/Register';
import Profile from './components/Member/Profile';
import MyProduct from './components/Member/MyProduct';
import AddProduct from './components/Member/AddProduct';
import EditProduct from './components/Member/EditProduct';
import ProductDetail from './components/Product/Detail';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Product/WishList';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path='/blog/list' element={<Blog />} />
            <Route path='/blog/detail/:id' element={<Detail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/account' element={<Profile />} />
            <Route path='account/my-product' element={<MyProduct />} />
            <Route path='account/add-product' element={<AddProduct />} />
            <Route path='account/my-product/edit-product/:id' element={<EditProduct />} />
            <Route path='product/detail/:id' element={<ProductDetail />} />
            <Route path='cart' element={<Cart />} />
            <Route path='wish-list' element={<Wishlist />} />
          </Routes>
        </App>
      </Router>
    </React.StrictMode>
  </Provider>
);
reportWebVitals();
