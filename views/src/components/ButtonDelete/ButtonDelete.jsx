import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';
const ButtonDelete = () => {
    const storage = JSON.parse(localStorage.getItem('user'));
    const config = {
        'Content-Type': 'application/json',
        Authorization: storage.token.token,
    };
    const navigate = useNavigate();

    const deleteAccount = (e) => {
        e.preventDefault();
        axios({
            headers: config,
            params: { _id: storage._id },
            method: 'DELETE',
            url: '/users/delete',
        })
        .then(() => {
            alert('User successfully deleted!');

            if (document.body.classList.contains('dark')) {
                document.body.classList.remove('dark');
            }
            localStorage.removeItem('user')
            navigate('/');
        })
        .catch(() => alert("The account could not be deleted!"))
    }

    return (
        <form className="form-inline my-2 mx-2">
            <button className="btn btn-danger my-2 my-sm-0" type="submit" onClick={deleteAccount}>Delete Account</button>
        </form>
    )
}

export default ButtonDelete