import React, { useEffect } from "react";
import { useState } from "react";
import FormError from "./FormError";
import API from "../API/API";
function Profile(props) {
    const [getInput, setInput] = useState({
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    });
    useEffect(() => {
        let getUserData = JSON.parse(localStorage.getItem('user'));
        if (getUserData) {
            setInput((state) => {
                return {
                    ...state,
                    id: getUserData.id,
                    name: getUserData.name,
                    email: getUserData.email,
                    phone: getUserData.phone,
                    address: getUserData.address,
                }
            });
        }
    }, []);
    const [getError, setError] = useState("");
    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput((state) => ({
            ...state,
            [nameInput]: valueInput
        }));
    }
    let url = '/user/update/' + getInput.id;
    let accessToken = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if (getInput.name === '') {
            errorSubmit.name = 'Name is required!';
            flag = false;
        }
        if (getInput.email === '') {
            errorSubmit.email = 'Email is required!';
            flag = false;
        }
        if (getInput.phone === '') {
            errorSubmit.phone = 'Phone is required!';
            flag = false;
        }
        if (getInput.address === '') {
            errorSubmit.address = 'Address is required!';
            flag = false;
        }
        if (!flag) {
            setError(errorSubmit);
        }
        else {
            setError("");
            const formData = new FormData();
            formData.append('name', getInput.name);
            formData.append('email', getInput.email);
            formData.append('phone', getInput.phone);
            formData.append('address', getInput.address);
            formData.append('password', getInput.password);

            API.post(url, formData, config)
                .then(res => {
                    if (res.data.errors) {
                        setError(res.data.errors);
                    } else {
                        localStorage.setItem('user', JSON.stringify(res.data.Auth));
                        window.location.reload();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    return (
        <div className="col-sm-4 col-sm-offset-0">
            <div className="signup-form">
                <h2>Update Your Profile</h2>
                <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                    <input type="text" placeholder="Enter Your Name" name="name" value={getInput.name} onChange={handleInput} />
                    <input type="email" placeholder="Enter Your Email Address" name="email" value={getInput.email} onChange={handleInput} readOnly />
                    <input type="number" placeholder="Enter Your Phone Number" name="phone" value={getInput.phone} onChange={handleInput} />
                    <input type="text" placeholder="Enter Your Address" name="address" value={getInput.address} onChange={handleInput} />
                    <button type="submit" className="btn btn-default">Update</button>
                </form>
                <FormError error={getError} />
            </div>
        </div>
    )
}
export default Profile;