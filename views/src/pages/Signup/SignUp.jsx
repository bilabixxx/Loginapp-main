import React from 'react'
import './SignUp.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState({});
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [error, setError] = useState(false);
    const urlSignUp = '/users/register';
    const urlLogin = '/users/login'
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    useEffect(() => {
        setData({
            "name": name,
            "email": email,
            "password": password
        });
    }, [name, password, email]);

    const updateName = e => {
        setName(e.target.value);
        setErrorName(false);
        setError(false);
    }

    const updateEmail = e => {
        setEmail(e.target.value);
        setErrorEmail(false);
    }

    const updatePassword = e => {
        setPassword(e.target.value);
        setErrorPassword(false);
    }

    const checkName = (name) => {
        if (name.length >= 6) {
            setErrorName(false);
            return true;
        } else {
            setErrorName(true);
            return false;
        }
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

    const addUser = (e) => {
        e.preventDefault();
        const emailIsValid = checkEmail(email);
        const nameIsValid = checkName(name);
        const passwordIsValid = checkPassword(password);

        if (emailIsValid && nameIsValid && passwordIsValid) {
            axios.post(urlSignUp, data)
                .then((res) => {
                    axios.post(urlLogin, { email, password })
                        .then((res) => {
                            localStorage.setItem('user', JSON.stringify(res.data))
                            navigate('/dashboard');
                        })
                        .catch((e) => {
                            const errorCode = e.response.data.code;
                            if (errorCode == 400) {
                                setError(true);
                            }
                        })
                })
                .catch((e) => {
                    const error = e.response.data;
                    if (error != undefined ) {
                        setError(true);
                    }
                })
        }
    }

    return (
        <>

            {user ? navigate('/dashboard') : (
                <div className="Auth-form-container">
                    <form className="Auth-form">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Sign Up</h3>
                            <div className="text-center">
                                Already registered?{" "}
                                <a href='/' className="link-primary">
                                    Sign In
                                </a>
                            </div>
                            <div className="form-group mt-3">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="e.g Marco Rossi"
                                    onChange={updateName}
                                    required
                                />
                                {errorName ? <div className="invalid"> The name must contain at least 6 characters.</div> : <></>}
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="email">Email address</label>
                                <input
                                    id='email'
                                    type="email"
                                    className={error || errorEmail ? "form-control mt-1 invalid" : "form-control mt-1"}
                                    placeholder="Email Address"
                                    onChange={updateEmail}
                                    required
                                />
                                {error ? <div className="invalid"> Email is already registered.</div> : <></>}
                                {errorEmail ? <div className="invalid"> The email entered is not in the right format.</div> : <></>}
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Password"
                                    onChange={updatePassword}
                                    required
                                />
                                {errorPassword ? <div className="invalid"> The password must contain at least 6 characters.</div> : <></>}
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary" onClick={addUser}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )


}

export default SignUp