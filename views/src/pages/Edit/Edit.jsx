import React from 'react'
import Header from '../../components/Header/Header'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
const Edit = () => {
    let storage = JSON.parse(localStorage.getItem('user'));
    const [name, setName] = useState(storage.name);
    const [email, setEmail] = useState(storage.email);
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [data, setData] = useState({});
    const [successData, setSuccessData] = useState(false);
    const [successPassword, setSuccessPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorOldPassword, setErrorOldPassword] = useState(false);
    const [comparePassword, setComparePassword] = useState(false)
    const [error, setError] = useState(false);
    const url = '/users/edit';

    const config = {
        'Content-Type': 'application/json',
        Authorization: storage.token.token,
    };

    useEffect(() => {
        setData({
            "_id": storage._id,
            "name": name,
            "email": email,
        });
    }, [name, password, email]);

    const updateName = e => {
        e.preventDefault();
        setName(e.target.value);
        setErrorName(false);
        setError(false);
    }

    const updateEmail = e => {
        e.preventDefault();
        setEmail(e.target.value);
        setErrorEmail(false);
    }

    const updatePassword = e => {
        e.preventDefault();
        setPassword(e.target.value);
        setErrorPassword(false);
        setComparePassword(false);
    }

    const updateRepeatPassword = e => {
        e.preventDefault();
        setRepeatPassword(e.target.value);
        setComparePassword(false);
    }

    const updateOldPassword = e => {
        e.preventDefault();
        setOldPassword(e.target.value);
        setErrorOldPassword(false);

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
            setErrorOldPassword(false);
            return true;
        } else {
            setErrorPassword(true);
            setErrorOldPassword(true);
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

    const changeData = (e) => {
        e.preventDefault();
        const nameIsValid = checkName(name);
        const emailIsValid = checkEmail(email);

        if (nameIsValid && emailIsValid) {
            axios({
                headers: config,
                method: 'PATCH',
                url: url,
                data: data
            }).then((respo) => {
                setSuccessData(true)
                storage['name'] = name
                storage['email'] = email
                localStorage.setItem('user', JSON.stringify(storage));
            })
        }
    }

    const changePassword = async (e) => {
        e.preventDefault();
        const newPasswordIsvalid = checkPassword(password);
        const repeatPasswordIsValid = checkPassword(repeatPassword);

        const oldPasswordIsChecked = await axios({
            headers: config,
            method: 'GET',
            url: '/users/user',
            params: {
                _id: storage._id,
                password: oldPassword
            }
        }).then(response => {
            return response.data.password;
        })
            .catch(() => {

                return false
            })

        if (oldPasswordIsChecked) {
            if (newPasswordIsvalid && repeatPasswordIsValid) {
                if (repeatPassword === password) {
                    try {
                        axios({
                            headers: config,
                            method: 'PATCH',
                            url: url,
                            data: {
                                _id: storage._id,
                                password: password
                            }
                        })
                        setSuccessPassword(true);
                    } catch (error) {
                        console.log("Non è stato aggiornato!");
                    }
                } else {
                    setComparePassword(true);
                }
            }
        } else {
            setErrorOldPassword(true)
        }

    }

    return (
        <>
            <Header />
            <form className="m-auto w-75 mb-4">
                <div className="Auth-form-content">
                    {successData ?
                        <div className="alert alert-success fade show" role="alert">
                            <strong> Data successfully updated!</strong>
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setSuccessData(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> : <></>
                    }
                    <h1 className='text-center mb-3'>Edit Profile</h1>
                    <h4 className='Auth-form-title'>Change your general data</h4>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Marco Rossi"
                            value={name}
                            onChange={updateName}
                            required
                        />
                        {errorName ? <div className="mt-1 alert alert-danger"> The name must contain at least 6 characters.</div> : <></>}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            id='email'
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            onChange={updateEmail}
                            value={email}
                            required
                        />
                        {errorEmail ? <div className="mt-1 alert alert-danger"> The email entered is not in the right format.</div> : <></>}
                    </div>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                        <button type="submit" className="btn btn-success w-25" onClick={changeData}>
                            Save
                        </button>
                    </div>
                    <h4 className='Auth-form-title mt-3'>Change your password</h4>
                    <div className="form-group mt-3">
                        {successPassword ?
                            <div className="alert alert-success fade show" role="alert">
                                <strong> Password successfully updated!</strong>
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setSuccessPassword(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> : <></>
                        }
                        <label>Old Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            onChange={updateOldPassword}
                            required
                        />
                        {errorOldPassword ? <div className="mt-1 alert alert-danger"> The password is not correct.</div> : <></>}
                    </div>
                    <div className="form-group mt-3">
                        <label>New Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            onChange={updatePassword}
                            required
                        />
                        {errorPassword ? <div className="mt-1 alert alert-danger"> The password must contain at least 6 characters.</div> : <></>}
                        {comparePassword ? <div className="mt-1 alert alert-danger"> Passwords entered do not match.</div> : <></>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            onChange={updateRepeatPassword}
                            required
                        />
                        {errorPassword ? <div className="mt-1 alert alert-danger"> The password must contain at least 6 characters.</div> : <></>}
                        {comparePassword ? <div className="mt-1 alert alert-danger"> Passwords entered do not match.</div> : <></>}
                    </div>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                        <button type="submit" className="btn btn-success w-25" onClick={changePassword}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
            <Footer />
        </>
    )
}

export default Edit