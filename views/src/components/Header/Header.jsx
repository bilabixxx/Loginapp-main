import React from 'react'
import DarkToggleButton from '../DarkToggleButton/DarkToggleButton';
import LogoutButton from '../LogoutButton/LogoutButton';
const Header = () => {
  return (
    <nav className="navbar">
      <div className='mx-2 my-2 flex-grow-1 ps-1'>
        <a className="navbar-brand" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 29 29"><path d="M14.5 2A12.514 12.514 0 0 0 2 14.5 12.521 12.521 0 0 0 14.5 27a12.5 12.5 0 0 0 0-25Zm7.603 19.713a8.48 8.48 0 0 0-15.199.008A10.367 10.367 0 0 1 4 14.5a10.5 10.5 0 0 1 21 0 10.368 10.368 0 0 1-2.897 7.213ZM14.5 7a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 14.5 7Z" /></svg>
          <b>LOGINAPP</b>
        </a>
      </div>
      <DarkToggleButton />
      <LogoutButton />
    </nav>

  )
}

export default Header