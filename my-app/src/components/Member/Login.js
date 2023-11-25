import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import FormError from "./FormError";
import API from "../API/API";
import { useNavigate } from "react-router-dom";
function Login() {
    const [getInput, setInput] = useState({
        email: '',
        password: '',
        level: 0
    });
    const [getError, setError] = useState("");
    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput((state) => ({
            ...state,
            [nameInput]: valueInput
        }));
    }
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if(getInput.email === '') {
            errorSubmit.email = 'Email is required!';
            flag = false;
        }
        if(getInput.password === '') {
            errorSubmit.password = 'Password is required!';
            flag = false;
        }
        if(flag === false) {
            setError(errorSubmit);
        } else {
            setError('');
            API.post('login', getInput)
                .then(res => {
                    if(res.data.errors) {
                        setError(res.data.errors);
                    } else {
                        localStorage.setItem('user', JSON.stringify(res.data.Auth));
                        localStorage.setItem('token', res.data.token);
                        navigate('/');
                    }
                })
        }
    }
    return (
        <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
                <h2>Login to your account</h2>
                <form onSubmit={handleSubmit} method="post">
                    <input type="email" placeholder="Enter Your Email" name="email" value={getInput.email} onChange={handleInput} required autoComplete="email" autoFocus aria-describedby="emailHelp"/>
                    <input type="password" placeholder="Enter Your Password" name="password" value={getInput.password} onChange={handleInput} />
                    <span>
                        <input type="checkbox" className="checkbox"/>
                        Keep me signed in
                    </span>
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
                <p>Don't have account ? <Link to="/register">Register now.</Link></p>
                <FormError error={getError} />
            </div>
        </div>
    )
}
export default Login;