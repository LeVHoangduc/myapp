import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Product/AppContext';
import { useSelector } from 'react-redux';
function Header() {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    }
    let totalCartItem = useSelector(state => state.totalCartItem.total);
    let cartTotalItem = useContext(AppContext).cartTotalItem;
    function renderLogin() {
        let user = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            return (
                <ul className="nav navbar-nav">
                    <li><Link to="account"><i className="fa fa-user"></i> Hello, {user.name}</Link></li>
                    <li><Link to="wish-list"><i className="fa fa-star"></i> Wishlist</Link></li>
                    <li><Link to=""><i className="fa fa-crosshairs"></i> Checkout</Link></li>
                    <li><Link to="cart"><i className="fa fa-shopping-cart"></i> Cart <span className='cart_total_item'>{cartTotalItem}</span></Link></li>
                    <li><Link to="login" onClick={handleLogout}><i className="fa fa-sign-out"></i> Logout</Link></li>
                </ul>
            )
        } else {
            return (
                <ul className="nav navbar-nav">
                    <li><Link to="wish-list"><i className="fa fa-star"></i> Wishlist</Link></li>
                    <li><Link to=""><i className="fa fa-crosshairs"></i> Checkout</Link></li>
                    <li><Link to="cart"><i className="fa fa-shopping-cart"></i> Cart</Link></li>
                    <li><Link to="login"><i className="fa fa-lock"></i> Login</Link></li>
                </ul>
            )
        }
    }
    return (
        <header id="header">
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contactinfo">
                                <ul className="nav nav-pills">
                                    <li><Link to="#"><i className="fa fa-phone"></i> +2 95 01 88 821</Link></li>
                                    <li><Link to="#"><i className="fa fa-envelope"></i> info@domain.com</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="social-icons pull-right">
                                <ul className="nav navbar-nav">
                                    <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                                    <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                                    <li><Link to="#"><i className="fa fa-linkedin"></i></Link></li>
                                    <li><Link to="#"><i className="fa fa-dribbble"></i></Link></li>
                                    <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 clearfix">
                            <div className="logo pull-left">
                                <Link to="/"><img src={require('./images/logo.png')} alt="" /></Link>
                            </div>
                            <div className="btn-group pull-right clearfix">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        USA
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link to="">Canada</Link></li>
                                        <li><Link to="">UK</Link></li>
                                    </ul>
                                </div>

                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        DOLLAR
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link to="">Canadian Dollar</Link></li>
                                        <li><Link to="">Pound</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 clearfix">
                            <div className="shop-menu clearfix pull-right">
                                {renderLogin()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><Link to="/" className="active">Home</Link></li>
                                    <li className="dropdown"><Link to="#">Shop<i className="fa fa-angle-down"></i></Link>
                                        <ul role="menu" className="sub-menu">
                                            <li><Link to="">Products</Link></li>
                                            <li><Link to="">Product Details</Link></li>
                                            <li><Link to="">Checkout</Link></li>
                                            <li><Link to="">Cart</Link></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown"><Link to="#">Blog<i className="fa fa-angle-down"></i></Link>
                                        <ul role="menu" className="sub-menu">
                                            <li><Link to="/blog/list">Blog List</Link></li>
                                            <li><Link to="/blog/detail">Blog Single</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="">404</Link></li>
                                    <li><Link to="">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="search_box pull-right">
                                <input type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;