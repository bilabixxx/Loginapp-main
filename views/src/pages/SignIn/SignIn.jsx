import React from 'react'
import './SignIn.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [data, setData] = useState({});
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [error, setError] = useState(true);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();
    let url = "/users/login";


    useEffect(() => {
        setData({
            "email": email,
            "password": password
        });
    }, [password, email]);

    const updateEmail = e => {
        setEmail(e.target.value);
        setErrorEmail(false);
    }

    const updatePassword = e => {
        setPassword(e.target.value);
        setErrorPassword(false);
    }

    const checkPassword = (password) => {
        if (password.length >= 6) {
            setErrorPassword(false);
            return true;
        } else {
            setErrorPassword(true);
            return false;
        }
    }

    const checkEmail = (email) => {
        const regExEmail = /\S+@\S+\.\S+/.test(email);
        if (regExEmail) {
            setErrorEmail(false);
            return true;
        } else {
            setErrorEmail(true);
            return false;
        }
    }

    const login = (e) => {
        e.preventDefault()
        const emailIsValid = checkEmail(email);
        const passwordIsValid = checkPassword(password);
        if (emailIsValid && passwordIsValid) {
            axios.post(url, data)
                .then((res) => {
                    localStorage.setItem('user', JSON.stringify(res.data))
                    navigate('/dashboard');
                })
                .catch(err => setError(err.response.data.success))
        }
    }

    return (
        <>
            {user ? navigate('/dashboard') : (
                <>
                    {!error ?
                        <div className="w-50 m-auto mt-3 alert alert-danger fade show" role="alert">
                            <strong>Invalid email or password</strong>
                            <button type="button" className="close danger" data-dismiss="alert" aria-label="Close" onClick={() => setError(true)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> : <></>}
                    <div className="Auth-form-container">
                        <form className="Auth-form">

                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title">Sign In</h3>
                                <div className="text-center">
                                    Not registered yet?{" "}
                                    <a href='/signup' className="link-primary">
                                        Sign Up
                                    </a>
                                </div>
                                <div className="form-group mt-3">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className="form-control mt-1"
                                        placeholder="Enter email"
                                        onChange={updateEmail}
                                    />
                                    {errorEmail ? <div className="invalid"> The email entered is not in the right format.</div> : <></>}
                                </div>
                                <div className="form-group mt-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control mt-1"
                                        placeholder="Enter password"
                                        onChange={updatePassword}
                                    />
                                    {errorPassword ? <div className="invalid"> The password must contain at least 6 characters.</div> : <></>}
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className="btn btn-primary" onClick={login}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    )
}

export default SignIn