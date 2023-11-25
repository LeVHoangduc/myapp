import React from "react";
import { useState } from "react";
import FormError from "./FormError";
import API from "../API/API";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Register() {
    const [getInput, setInput] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: '',
        level: 0
    });
    const navigate = useNavigate();
    const [getError, setError] = useState("");
    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput((state) => ({
            ...state,
            [nameInput]: valueInput
        }));
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
        if (getInput.password === '') {
            errorSubmit.password = 'Password is required!';
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
        if (getInput.avatar === '') {
            errorSubmit.avatar = 'Avatar is required!';
            flag = false;
        } else {
            const typeFile = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];
            if (typeFile.indexOf(getInput.file.type) === -1) {
                errorSubmit.avatar = 'Avatar is not valid!';
                flag = false;
            }
            else if (getInput.file.size > 1024 * 1024) {
                errorSubmit.avatar = 'Avatar is too large!';
                flag = false;
            }
        }
        if (!flag) {
            setError(errorSubmit);
        }
        else {
            setError("");
            const formData = new FormData();
            formData.append('name', getInput.name);
            formData.append('email', getInput.email);
            formData.append('password', getInput.password);
            formData.append('phone', getInput.phone);
            formData.append('address', getInput.address);
            formData.append('avatar', getInput.avatar);
            formData.append('level', getInput.level);

            API.post('register', formData)
                .then(res => {
                    if (res.data.errors) {
                        setError(res.data.errors);
                    } else {
                        console.log(res.data)
                        navigate('/login');
                        alert('Register success!');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    function handleInputFile(e) {
        const fileInput = e.target.files;
        let reader = new FileReader();
        reader.onload = function (e) {
            setInput((state) => {
                return {
                    ...state,
                    avatar: e.target.result,
                    file: fileInput[0]
                }
            });
        };
        reader.readAsDataURL(fileInput[0]);
    }
    return (
        <div className="col-sm-4 col-sm-offset-1">
            <div className="signup-form">
                <h2>New User Signup!</h2>
                <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                    <input type="text" placeholder="Enter Your Name" name="name" onChange={handleInput} />
                    <input type="email" placeholder="Enter Your Email Address" name="email" aria-describedby="emailHelp" onChange={handleInput} />
                    <input type="password" placeholder="Enter Your Password" name="password" onChange={handleInput} />
                    <input type="tel" placeholder="Enter Your Phone Number" name="phone" onChange={handleInput} />
                    <input type="text" placeholder="Enter Your Address" name="address" onChange={handleInput} />
                    <input type="file" placeholder="Enter Your Avatar" name="avatar" onChange={handleInputFile} />
                    <input type="hidden" placeholder="Enter Your Level" name="level" onChange={handleInput} />
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
                <p className="hint-text">Already have an account? <Link to="/login">Login here</Link></p>
                <FormError error={getError} />
            </div>
        </div>
    )
}
export default Register;