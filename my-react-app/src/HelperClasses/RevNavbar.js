import React, { useState } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import './RevNavbar.css'
import logo from "./revslogo.png";
import ManagerDropdownItems from "./ManagerItems";
import ServerDropdownItems from "./ServerItems";
import CustomerDropdownItems from "./CustomerItems";

function RevNavbar() {

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
              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <Link to='/' className='logo'><i className='fas fa-home' />
                            <img scr={logo}></img>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <Link to="/" className='nav-link' onClick={closeMobileMenu}> Home </Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/static-menu" className='nav-link' onClick={closeMobileMenu}> Menu </Link>
                                </li>
                                <li class="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        Customers
                                    </a>
                                    <ul className="dropdown-menu">
                                        {CustomerDropdownItems.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link className='dropdown-item menu-items' to={item.path} onClick={() => setClick(false)}>
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        Servers
                                    </a>
                                    <ul className="dropdown-menu">
                                        {ServerDropdownItems.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link className='dropdown-item menu-items' to={item.path} onClick={() => setClick(false)}>
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        Managers
                                    </a>
                                    <ul className="dropdown-menu">
                                        {ManagerDropdownItems.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link className='dropdown-item menu-items' to={item.path} onClick={() => setClick(false)}>
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <Button />
                </div>
              </nav>
          </section>
      </>
  )
}

export default RevNavbar;