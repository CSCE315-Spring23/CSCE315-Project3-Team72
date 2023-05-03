import React, { useState, useEffect } from "react";
import Menu from "../HelperClasses/Menu"
import './StaticMenu.css'

const Spacer = require('react-spacer');

function getBasketTuple(menu_object) {
    const tupleArray = [];
    for (let i = 0; i < menu_object.basket_id_array.length; i++) {
      tupleArray.push([menu_object.basket_id_array[i], menu_object.basket_name_array[i], menu_object.basket_price_array[i]]);
    }
    return tupleArray;
  }

function getBurgerTuple(menu_object) {
    const tupleArray = [];
    for (let i = 0; i < menu_object.burger_id_array.length; i++) {
      tupleArray.push([menu_object.burger_id_array[i], menu_object.burger_name_array[i], menu_object.burger_price_array[i]]);
    }
    return tupleArray;
  }

function getSandwichTuple(menu_object) {
    const tupleArray = [];
    for (let i = 0; i < menu_object.sandwich_id_array.length; i++) {
      tupleArray.push([menu_object.sandwich_id_array[i], menu_object.sandwich_name_array[i], menu_object.sandwich_price_array[i]]);
    }
    return tupleArray;
  }

function getSweetsTuple(menu_object) {
    const tupleArray = [];
    for (let i = 0; i < menu_object.sweets_id_array.length; i++) {
      tupleArray.push([menu_object.sweets_id_array[i], menu_object.sweets_name_array[i], menu_object.sweets_price_array[i]]);
    }
    return tupleArray;
  }

function getExtrasTuple(menu_object) {
    const tupleArray = [];
    for (let i = 0; i < menu_object.extras_id_array.length; i++) {
      tupleArray.push([menu_object.extras_id_array[i], menu_object.extras_name_array[i], menu_object.extras_price_array[i]]);
    }
    return tupleArray;
  }


function StaticMenu(props) 
{
    const menu_object = new Menu(props.json);
    
    const baskets = getBasketTuple(menu_object);
    const burgers = getBurgerTuple(menu_object);
    const sandwich = getSandwichTuple(menu_object);
    const sweets = getSweetsTuple(menu_object);
    const extras = getExtrasTuple(menu_object);


    return (

        
        
            <div class = 'body'>
                <div class = 'row'>


                    <div class = "section left">
                        <div class = "block1">
                            <div class = "title"> 
                                <h1>Burgers</h1>
                            </div>
                            <div class ="panel">
                                    {burgers.map((str)  => (
                                        <p>{str[1]} ...... {str[2]}</p>
                                    ))}
                            </div>
                        </div>

                        <div class = "block2">
                            <div class = "title"> 
                                <h1>Baskets</h1>
                            </div>
                            <div class ="panel">
                                    {baskets.map((str)  => (
                                        <p>{str[1]} ...... {str[2]}</p>
                                    ))}
                            </div>
                        </div>

                    </div>

                    <div class = 'section middle'>
                            
                            <div class = 'midblockmisc'>
                                <img src="my-react-app\public\logo512.png"></img>

                            </div>

                            <div class = "block3">
                                <div class = "title"> 
                                    <h1>Sandwiches</h1>
                                </div>
                                <div class ="panel">
                                        {sandwich.map((str)  => (
                                            <p>{str[1]} ...... {str[2]}</p>
                                        ))}
                                </div>
                            </div>
                                
                    </div>

                    <div class = 'section right'>
                        <div class = "block4">
                            <div class = "title"> 
                                <h1>Shakes 'N Sweets</h1>
                            </div>
                            <div class ="panel">
                                {sweets.map((str)  => (
                                        <p>{str[1]} ...... {str[2]}</p>
                                    ))}
                            </div>
                        </div>

                        <div class = "block5">
                            <div class = "title"> 
                                <h1>Extras</h1>
                            </div>
                            <div class ="panelextras">
                                {extras.map((str)  => (
                                        <p>{str[1]} ...... {str[2]}</p>
                                    ))}
                            </div>
                        </div>
                    </div>


                </div>    
            </div>

                

    );

}

export default StaticMenu;