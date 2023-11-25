import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import API from "../API/API";
export default function MyProduct() {
    const [getData, setData] = useState([]);
    let url = '/user/my-product';
    let token = localStorage.getItem('token');
    const config = useMemo(() => ({
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }), [token]);
    useEffect(() => {
        API.get(url, config)
            .then(res => {
                setData(res.data.data);
            })
            .catch(err => console.log(err));
    }, [config, url]);
    function showData() {
        const getUser = JSON.parse(localStorage.getItem('user'));
        if (Object.keys(getData).length > 0 && getUser) {
            return Object.keys(getData).map((value, key) => {
                return (
                    getData[value].id_user === getUser.id.toString() ? (
                        <tr key={key}>
                            <td className="cart_price">
                                <p>{getData[value].id}</p>
                            </td>
                            <td className="cart_description">
                                <h4><Link to="">{getData[value].name}</Link></h4>
                            </td>
                            <td className="cart_product">
                                <Link to=""><img src={require('./img/' + extractFilenames(getData[value].image)[0])} alt="" /></Link>
                            </td>
                            <td className="cart_total">
                                <p className="cart_total_price">$ {getData[value].price}</p>
                            </td>
                            <td className="cart_delete">
                                <Link className="cart_quantity_update" to={"edit-product/" + getData[value].id}><i className="fa fa-edit"></i></Link>
                                <Link className="cart_quantity_delete"  onClick={handleDelete}><i id={getData[value].id} className="fa fa-times"></i></Link>
                            </td>
                        </tr>
                    ) : null
                )
            });
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
    function handleDelete(e) {
        const id = e.target.id;
        if (id) {
            API.get('/user/product/delete/' + id, config)
                .then(res => {
                    if (res.data.errors) {
                        alert(res.data.errors);
                    }
                    else {
                        setData(res.data.data);
                    }
                })
                .catch(err => console.log(err));
        }
    }
    return (
        <div className="col-sm-9 col-sm-offset-0">
            <h3 className="col-sm-offset-5" style={{ color: "#fe980f" }}>List Product</h3>
            <section id="cart_items">
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                                <td className="image">ID</td>
                                <td className="description">Name</td>
                                <td className="price">Image</td>
                                <td className="quantity">Price</td>
                                <td className="total">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {showData()}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-offset-10">
                    <Link to="/account/add-product" className="btn btn-primary">Add Product</Link>
                </div>
            </section>
        </div>
    );
}
