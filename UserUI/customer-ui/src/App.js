import React, { useState } from 'react';
import './App.css';
import Home from './components/home/home'
import ProductList from './components/productList/productList';
import ProductDetail from './components/productDetail/productDetail';
import Cart from './components/cart/cart';
import UserInformation from './components/userInformation/userInformation';
import Login from './components/login/login';
import Register from './components/register/register';
import CheckOut from './components/checkOut/checkout';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ErrorPage from './components/error/errorpage';
import { ToastContainer } from "react-toastify";
import Header from "../../../UserUI/customer-ui/src/components/customer/Header";
import Footer from "../../../UserUI/customer-ui/src/components/customer/Footer";
import Payment from "./components/payment/payment";
import Account from "./components/account/Account";
import ForgotPassword from "./components/forgotpassword/forgotpassword";
// import LoginComponent from "../../../frontend/src/components/LoginComponent/LoginComponent";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        // Thực hiện đăng xuất, xóa token khỏi localStorage
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    return (
        <Router>
            <Header />
            <ToastContainer />
            <Switch>
                <Redirect exact from='/' to='/home' />
                <Route path='/home' component={Home} />
                <Route path='/product-list' component={ProductList} />
                <Route path='/your-cart/:id' component={Cart} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/product-detail/:id' component={ProductDetail} />

                {/* Sử dụng `{isLoggedIn ? () : ()}` để kiểm tra đăng nhập */}
                {/*{isLoggedIn ? (*/}
                {/*    <>*/}
                        <Route path='/your-cart/:id' component={Cart} />
                        <Route path='/user-info' component={UserInformation} />
                        <Route path='/payment' component={Payment}/>
                        <Route path='/check-out' component={CheckOut} />
                        <Route path='/forgotpassword' component={ForgotPassword} />
                        <Route path='/account' component={Account} />
                    {/*</>*/}
                {/*) : (*/}
                {/*    <Route path='/login' component={() => <Login onLogin={handleLogin} onLogout={handleLogout} />} />*/}
                {/*)}*/}
                <Route path='*' component={ErrorPage} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
