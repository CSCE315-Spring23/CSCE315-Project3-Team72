import React, { useState } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import './RevNavbar.css'
import logo from "./revslogo.png";
import ManagerDropdownItems from "./ManagerItems";
import ServerDropdownItems from "./ServerItems";
import CustomerDropdownItems from "./CustomerItems";
import axios from 'axios';
function ButtonSizeUp(){
    alert("Button clicked!");
    // get all the elements with a click event listener on the page
    const clickableElements = document.querySelectorAll('*[onclick]');
    // loop through each clickable element and add a click event listener

    for (let i = 0; i < clickableElements.length; i++) {
    clickableElements[i].addEventListener('click', function() {
        // increase the size of the element by 10 pixels
        const currentSize = parseInt(window.getComputedStyle(this).getPropertyValue('font-size'));
        this.style.fontSize = (currentSize + 10) + 'px';
        this.style.transform = 'scale(1.1)';
    });
    const currentSize = parseInt(window.getComputedStyle(this).getPropertyValue('font-size'));
    this.style.fontSize = (currentSize + 10) + 'px';
    this.style.transform = 'scale(1.1)';
    }    
}
