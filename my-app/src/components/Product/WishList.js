import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from '../API/API'
function Wishlist() {
    const [getData, setData] = useState([]);
    useEffect(() => {
        API.get('product/wishlist')
            .then(res => {
                setData(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function renderWishlist() {
        let wishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (getData && wishlist.length > 0) {
            var productWishList = getData.filter((item) => {
                return wishlist.includes(item.id);
            });
            return productWishList.map((item, index) => {
                return (
                    <div className="col-sm-3" key={index}>
                        <div className="product-image-wrapper">
                            <div className="single-products" id={item.id}>
                                <div className="productinfo text-center">
                                    <img src={require('./img/' + extractFilenames(item.image)[0])} alt="" />
                                    <h2>$ {item.price}</h2>
                                    <p>{item.name}</p>
                                    <Link className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add To Card</Link>
                                </div>
                                <div className="choose">
                                    <ul className="nav nav-pills nav-justified">
                                        <li>
                                            <Link onClick={deleteWishList}><i className="fa fa-plus-square"></i>Delete to wishlist</Link>
                                        </li>
                                        <li>
                                            <Link to={'/product/detail/' + item.id}><i className="fa fa-plus-square"></i>Show detail</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div className="col-sm-12">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                            <div className="productinfo text-center">
                                <h2>Wish list is empty</h2>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
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
    function deleteWishList(e) {
        let product_id = e.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log(product_id);
        let wishlist = JSON.parse(localStorage.getItem('wishlist'));
        let index = wishlist.indexOf(parseInt(product_id));
        if (index > -1) {
            wishlist.splice(index, 1);
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        e.target.parentNode.parentNode.parentNode.parentNode.remove();
    }
    return (
        <div className="col-sm-12 padding-right">
            <div className="features_items">
                <h2 className="title text-center">WISH LIST</h2>
                {renderWishlist()}
            </div>
        </div>
    )
}
export default Wishlist;