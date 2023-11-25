import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../API/API";
import { useDispatch } from 'react-redux';
import { totalCartItem } from '../../actions/totalCartItem';
function Cart() {
    const [getData, setData] = useState([]);
    const getCart = JSON.parse(localStorage.getItem('cart'));
    let cartData = {};
    if (getCart) {
        Object.keys(getCart).forEach(function (key) {
            cartData[getCart[key].id] = getCart[key].quantity;
        });
    }
    useEffect(() => {
        API.post('product/cart', cartData)
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
    function renderData() {
        return getData.map((item, index) => {
            return (
                <tr key={index} id={item.id} >
                    <td className="cart_product">
                        <Link to={'/product/detail/' + item.id}><img src={require('./img/' + extractFilenames(item.image)[0])} alt="" style={{ height: '100px' }} /></Link>
                    </td>
                    <td className="cart_description">
                        <h4><Link to={'/product/detail/' + item.id}>{item.name}</Link></h4>
                        <p>Web ID: {item.id}</p>
                    </td>
                    <td className="cart_price" >
                        <strong style={{ fontSize: '18px', marginRight: '5px', float: 'left' }}>$ </strong>
                        <p style={{ float: 'left' }}> {item.price}</p>
                    </td>
                    <td className="cart_quantity">
                        <div className="cart_quantity_button">
                            <Link className="cart_quantity_up" onClick={upQuantity}> + </Link>
                            <input className="cart_quantity_input" type="text" name="quantity" value={item.qty} autoComplete="off" size="2" readOnly />
                            <Link className="cart_quantity_down" onClick={downQuantity}> - </Link>
                        </div>
                    </td>
                    <td className="cart_total" >
                        <strong style={{ fontSize: '24px', marginRight: '5px', color: '#FE980F', float: 'left' }}>$ </strong>
                        <p className="cart_total_price" style={{ float: 'left' }}>{item.price * item.qty}</p>
                    </td>
                    <td className="cart_delete">
                        <Link className="cart_quantity_delete" onClick={deleteItem}><i className="fa fa-times"></i></Link>
                    </td>
                </tr>
            )
        })
    }
    function extractFilenames(inputString) {
        try {
            const inputArray = JSON.parse(inputString);
            const resultArray = [];
            for (let i = 0; i < inputArray.length; i++) {
                const filename = inputArray[i];
                const startIndex = filename.indexOf("_") + 1;
                const newFilename = filename.slice(startIndex);
                resultArray.push(newFilename);
            }
            return resultArray;
        } catch (error) {
            console.error("Invalid input JSON string.");
            return [];
        }
    }
    function upQuantity(e) {
        let id = e.target.parentNode.parentNode.parentNode.id;
        let quantity = e.target.parentNode.parentNode.querySelector('.cart_quantity_input').value;
        quantity++;
        e.target.parentNode.parentNode.querySelector('.cart_quantity_input').value = quantity;
        updateQuantity(id, quantity);
        let price = e.target.parentNode.parentNode.parentNode.querySelector('.cart_price p').innerHTML;
        updatePriceTotal(price, quantity, e);
        updateCartTotalItem();
        updatePriceTotalAll();
    }
    function downQuantity(e) {
        let id = e.target.parentNode.parentNode.parentNode.id;
        let quantity = e.target.parentNode.parentNode.querySelector('.cart_quantity_input').value;
        quantity--;
        e.target.parentNode.parentNode.querySelector('.cart_quantity_input').value = quantity;
        updateQuantity(id, quantity);
        let price = e.target.parentNode.parentNode.parentNode.querySelector('.cart_price p').innerHTML;
        updatePriceTotal(price, quantity, e);
        if (quantity < 1) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            if (cart[id]) {
                delete cart[id];
                localStorage.setItem('cart', JSON.stringify(cart));
                e.target.parentNode.parentNode.parentNode.remove();
            }
        }
        handleUpdateCartTotalItem();
        updatePriceTotalAll();
    }
    function updateQuantity(id, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart[id].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    function updatePriceTotal(price, quantity, e) {
        let total = price * quantity;
        let priceTotal = e.target.parentNode.parentNode.parentNode.querySelector('.cart_total_price');
        priceTotal.innerHTML = total;
    }
    function updateCartTotalItem() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let cartTotalItem = 0;
        if (cart) {
            Object.keys(cart).forEach(function (key) {
                cartTotalItem += cart[key].quantity;
            });
        }
        localStorage.setItem('cartTotalItem', cartTotalItem);
        updatePriceTotalAll();
    }
    function deleteItem(e) {
        let id = e.target.parentNode.parentNode.parentNode.id;
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart[id]) {
            delete cart[id];
            localStorage.setItem('cart', JSON.stringify(cart));
            e.target.parentNode.parentNode.parentNode.remove();
        }
        updatePriceTotalAll();
    }
    function updatePriceTotalAll() {
        let priceTotalItem = document.querySelectorAll('.cart_total_price');
        let priceTotal = 0;
        priceTotalItem.forEach((item) => {
            priceTotal += parseInt(item.innerHTML);
        });
        localStorage.setItem('priceTotalAll', priceTotal);
        document.getElementById('price-total-all').innerHTML = priceTotal;
    }
    let priceTotalAll = localStorage.getItem('priceTotalAll');
    const dispatch = useDispatch();
    function handleUpdateCartTotalItem() {
        let total = localStorage.getItem('cartTotalItem');
        const action = totalCartItem(total);
        dispatch(action);
    }
    return (
        <div>
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><Link to='/'>Home</Link></li>
                            <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description"></td>
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping & Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>

                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <Link className="btn btn-default update" href="">Get Quotes</Link>
                                <Link className="btn btn-default check_out" href="">Continue</Link>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="total_area">
                                <ul>
                                    <li>Cart Sub Total <span>$59</span></li>
                                    <li>Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li>Total <span id='price-total-all'>{priceTotalAll}</span></li>
                                </ul>
                                <Link className="btn btn-default update" href="">Update</Link>
                                <Link className="btn btn-default check_out" href="">Check Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Cart;