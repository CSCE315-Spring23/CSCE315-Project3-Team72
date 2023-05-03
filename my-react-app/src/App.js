import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {View, TextInput} from 'react-native';
import BurgerMenu from './Pages/BurgerMenu';
import Transaction from './HelperClasses/Transaction';
import Navbar from './HelperClasses/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SandwichMenu from './Pages/SandwichMenu';
import SweetsMenu from './Pages/SweetsMenu';
import ExtrasMenu from './Pages/ExtrasMenu';
import BasketMenu from './Pages/BasketMenu';
import StaticMenu from './Pages/StaticMenu';
import HomePage from './Pages/HomePage';
import Header from './HelperClasses/Header';
import { GoogleLogin } from '@react-oauth/google';


function App() {

  var url = "http://localhost:3001/user"
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  
  let current_transaction = new Transaction(message);

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
      console.log(error);
  };

  return (
    <>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      <Router>
      <Header/>
      <Routes>
        <Route path='/'element={<HomePage/>}/>
        <Route path='/burger' element={<BurgerMenu json={message} transaction={current_transaction}/>} />
        <Route path='/sandwich' element={<SandwichMenu json={message} transaction={current_transaction}/>} />
        <Route path='/sweets' element={<SweetsMenu json={message} transaction={current_transaction}/>} />
        <Route path='/extras' element={<ExtrasMenu json={message} transaction={current_transaction}/>} />
        <Route path='/basket' element={<BasketMenu json={message} transaction={current_transaction}/>} />
        <Route path='/menu' element={<StaticMenu json={message}/>} />
        
      </Routes>
      </Router>
    </>
  );
}

export default App;
