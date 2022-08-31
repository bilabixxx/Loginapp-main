import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './DarkToggleButton.css'
const DarkToogleButton = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [themeColor, setThemeColor] = useState(user.themeColor);
    const url = '/users/theme';
    const config = {
        'Content-Type': 'application/json',
        Authorization: user.token.token,
    };
    useEffect(() => {
        switch (themeColor) {
            case 'dark':
                document.body.classList.add('dark');
                document.body.classList.remove('light');
                document.querySelector('.checkbox').checked = true;
                break;

            case 'light':
                document.body.classList.add('light');
                document.body.classList.remove('dark');
                document.querySelector('.checkbox').checked = false;
                break;
        }
    }, [])


    const change = () => {
        let item = JSON.parse(localStorage.getItem('user'));
        let color = themeColor;
        switch (color) {
            case 'dark':
                document.body.classList.add('light');
                document.body.classList.remove('dark');
                color= 'light'
                setThemeColor('light')
                item['themeColor'] = 'light';
                localStorage.setItem('user', JSON.stringify(item));
                break;
            case 'light':
                document.body.classList.add('dark');
                document.body.classList.remove('light');
                color='dark'
                setThemeColor('dark')
                item['themeColor'] = 'dark';
                localStorage.setItem('user', JSON.stringify(item));
                break;
        }
        
        const body = { _id: user._id, themeColor: color };
        axios({
            headers: config,
            method: 'POST',
            url: url,
            data: body
        });

    }

    return (
        <div className='me-3'>
            <input type="checkbox" className="checkbox" id="checkbox" onClick={change} />
            <label htmlFor="checkbox" className="label">
                <i className="fas fa-moon"></i>
                <i className='fas fa-sun'></i>
                <div className='ball'></div>
            </label>
        </div>
    )
}

export default DarkToogleButton