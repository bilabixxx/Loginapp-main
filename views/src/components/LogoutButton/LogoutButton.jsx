import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LogoutButton = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const logout = async (e) => {
    e.preventDefault();
    const config = {
      'Content-Type': 'application/json',
      Authorization: user.token.token,
    }
    await axios.request({
      headers: config,
      method: 'POST',
      url: '/users/logout',

    })
      .then(() => {
        localStorage.removeItem('user');
        if(document.body.classList.contains('dark')){
          document.body.classList.remove('dark');
        }
        navigate('/')
      })
      .catch((err) => alert(err))
  }

  return (
    <form className="form-inline my-2 mx-2">
      <button className="btn btn-danger my-2 my-sm-0" type="submit" onClick={logout}>Logout</button>
    </form>
  )
}

export default LogoutButton