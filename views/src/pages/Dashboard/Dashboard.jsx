import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { useNavigate } from "react-router-dom";
import ButtonEdit from '../../components/ButtonEdit/ButtonEdit';
import ButtonDelete from '../../components/ButtonDelete/ButtonDelete';
import Footer from '../../components/Footer/Footer';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {

    const config = {
      'Content-Type': 'application/json',
      Authorization: user.token.token,
    };

    const body = { _id: user._id };

    axios({
      headers: config,
      params: body,
      method: 'GET',
      url: '/users/dashboard',

    })
      .then((res) => setData(res.data.data))

    const now = new Date();
    if (now.getTime() > user.token.expires) {
      localStorage.removeItem('user')
    }

  }, [])

  return (
    <>
      <Header />
      {user && data ? (
        <div className='text-center mt-5 content'>
          <p>Hi <b className='text-capitalize'>{data.name}</b></p>
          <p>This is your email address: <b>{data.email}</b></p>
          <p>Your account was created on : <b>{new Date(data.createdAt).toLocaleString('it-IT')}</b></p>
          <div className='w-75 d-flex justify-content-end'>
            <ButtonEdit />
            <ButtonDelete />
          </div>
        </div>)
        : navigate('/')}
      <Footer />
    </>

  )

}

export default Dashboard