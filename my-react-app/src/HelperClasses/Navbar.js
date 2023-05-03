/*import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/burger" activeStyle>
            Burger Menu
          </NavLink>
          <NavLink to="/sandwich" activeStyle>
            Sandwich Menu
          </NavLink>
          <NavLink to="/basket" activeStyle>
            Basket Menu
          </NavLink>
          <NavLink to="/sweets" activeStyle>
            Shakes N Sweets Menu
          </NavLink>
          <NavLink to="/extras" activeStyle>
            Extras Menu
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
*/


import React, { useState } from 'react'
import DropDown from './DropDown'
import Button from './Button'
import { Link } from 'react-router-dom'
import './Navbar.css'
import CustomerDropDown from './CustomerDropDown'
import ManagerDropDown from './ManagerDropDown'
import logo from "./revslogo.png";


function Navbar() {

  const [click, setClick] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [customerDropdown, setCustomerDropdown] = useState(false)
  const [managerDropdown, setManagerDropdown] = useState(false)
  const changeClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const onMouseEnter = () => {
      setDropdown(true)
  }

  const onMouseLeave = () => {
      setDropdown(false)
  }

  const onCustomersMouseEnter = () => {
    setCustomerDropdown(true)
  }

  const onCustomersMouseLeave = () => {
      setCustomerDropdown(false)
  }

  const onManagerMouseEnter = () => {
    setManagerDropdown(true)
  }

  const onManagerMouseLeave = () => {
    setManagerDropdown(false)
  }

  return (
      <>
          <section>
              <nav className="navbar">

                  <Link to='/' className='logo'><i className='fas fa-home' />
                    <img scr={logo}></img>
                  </Link>

                  <div className="menu-icon" onClick={changeClick}>
                      <i className={click ? 'fas fa-times' : 'fas fa-bars'} ></i>
                  </div>

                  <ul className={click ? 'nav-side-menu start' : 'nav-side-menu'}>

                      <li className='nav-items'>
                          <Link to="/" className='nav-links' onClick={closeMobileMenu}> Home </Link>
                      </li>

                      <li className='nav-items'>
                          <Link to="/static-menu" className='nav-links' onClick={closeMobileMenu}> Menu </Link>
                      </li>

                      <li className='nav-items' onMouseEnter={onCustomersMouseEnter} onMouseLeave={onCustomersMouseLeave} >
                          <Link className='nav-links' onClick={closeMobileMenu}> Customers <i className='fas fa-caret-down' />
                              {customerDropdown && <CustomerDropDown />}
                          </Link>
                      </li>

                      <li className='nav-items' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
                          <Link className='nav-links' onClick={closeMobileMenu}> Servers <i className='fas fa-caret-down' />
                              {dropdown && <DropDown />}
                          </Link>
                      </li>

                      <li className='nav-items' onMouseEnter={onManagerMouseEnter} onMouseLeave={onManagerMouseLeave} >
                          <Link className='nav-links' onClick={closeMobileMenu}> Manager <i className='fas fa-caret-down' />
                              {managerDropdown && <ManagerDropDown />}
                          </Link>
                      </li>
                  </ul>

                  <Button />

              </nav>
          </section>
      </>
  )
}

export default Navbar;