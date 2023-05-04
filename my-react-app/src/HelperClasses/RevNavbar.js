import React, { useState } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import './RevNavbar.css'
import logo from "./revslogo.png";
import ManagerDropdownItems from "./ManagerItems";
import ServerDropdownItems from "./ServerItems";
import CustomerDropdownItems from "./CustomerItems";
import axios from 'axios';

function RevNavbar() {
    const WEATHER_API_KEY = "8bcd0e91ddae6063e218fd0e037293f1";

  const [click, setClick] = useState(false)
  const [weatherStatus, setWeatherStatus] = useState("a mystery");
  const [temperature, setTemperature] = useState(-1);

  const changeClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const calculateTemperature = (kelvin) => {
      setTemperature(Number((kelvin - 273.15) * (9/5) + 32).toFixed(2));
  }

  navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        let weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
        axios.get(weather_api_url)
            .then(function (resp) {
                calculateTemperature(resp.data.main.temp);
                setWeatherStatus(`${resp.data.weather[0].main}, ${temperature}`);
            });
    }
  );

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

                        <div class="weather-guy">
                            The weather near you is <span class="weather-data">{weatherStatus}</span>ºF
                        </div>

                        <Button />
                </div>
              </nav>
          </section>
      </>
  )
}

export default RevNavbar;