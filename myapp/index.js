
//postgres functionality
/* eslint-disable no-async-promise-executor */
const { Pool } = require('pg');
const dotenv = require('dotenv').config()

//express app functionality
const express = require('express');
const app = express();
const port = 3001;

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false},
    headers: {'Access-Control-Allow-Origin': '*'}
});


// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

//setting view
//app.set("view engine", "ejs");

//default route
// app.get('/', (req, res) => {
//     const data = {name: 'Cameron'};
//     res.render('index', data);
// });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


//different route: add /user to the end of the link
app.get('/user', (req,res) =>{
    menu = []
    pool
        .query('SELECT * FROM menu_table;')

        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
            menu.push(query_res.rows[i]);
            }

        const data = {menu: menu};
        console.log(menu);
        res.json({message: menu});
    });
});

app.get('/inventory', (req,res) =>{
    inventory = []
    pool
        .query('SELECT * FROM inventory;')

        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
            menu.push(query_res.rows[i]);
            }

        const data = {inventory: inventory};
        console.log(inventory);
        res.json({message: inventory});
    });

 


});



//console to know what the link is
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

/**
 * Parses the transaction given from the front end, and then sends it to a function that adds the transaction to the transaction history table and also updates the inventory with the ingrediants from the transaction
 * @param {*} str  
 * @returns nothing
 */
function parse_transaction(str) {
  const itemCounts = {};
  const items_sold = str;
  const itemsSoldSTR = str.split("|");


  // Parse the items and their quantities
  for (let i = 0; i < itemsSoldSTR.length - 2; i++) {
    const [quantity, item] = itemsSoldSTR[i].split(" ");
    itemCounts[item] = parseInt(quantity);
  }

  // Parse the price and employee
  const lastTwoItems = itemsSoldSTR.slice(-2);
  const [priceStr, employee] = lastTwoItems;
  const Price = parseFloat(priceStr);

  // Print out the items and their prices
  for (let item in itemCounts) {
    const quantity = itemCounts[item];
    console.log(`${quantity} ${item}: $${(Price * quantity).toFixed(2)}`);
  }

  // Print out the total price and the employee
  console.log(`Total Price: $${Price.toFixed(2)}\nEmployee: ${employee}`);

  countItemsSoldAndManageInventory(items_sold,itemCounts,employee,Price);
}
/**
 * Updates the transaction history, and calls UpdateInventory() with the proper params
 * @param {*} itemCounts  
 * @returns nothing
 */
  async function countItemsSoldAndManageInventory(items_sold,itemCounts,employee,price){
    //const TransactionNumber = await executeSQLCommand(`SELECT quantity FROM inventory WHERE name='${item}'`);
    const itemsSoldList = removeCharactersAfterSecondToLastPipe(items_sold);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = year + '-' + month + '-' + day;

    var id = await executeSQLCommand("SELECT id FROM transaction_history ORDER BY id DESC LIMIT 1");
    id = stripNonDigitsAndIncrement(id);
    console.log("id:"+ id);
    try {
      const client = await pool.connect();
      const query = `INSERT INTO transaction_history (id, transaction_number, date, items_sold, employee, total_price) VALUES ($1, $2, $3, $4, $5, $6)`;
      const values = [id, id, currentDate, itemsSoldList, employee, price];
      const result = await client.query(query, values);
      console.log('Data inserted into table successfully!');
      client.release();
    } catch (err) {
      console.error('Error inserting data into table: ', err);
    }
    UpdateInventory(itemCounts);
  }
/**
 * goes through each item, finds the ingrediants needed to make the item, and subtracts it from the inventory
 * @param {*} itemCounts  
 * @returns nothing
 */
  async function UpdateInventory(itemCounts) {
    for (let item in itemCounts) {
      console.log("item being processed: "+item);
      var Materials = await executeSQLCommand(`SELECT materials FROM menu_table WHERE name='${item}'`);
      console.log("Materials to make "+ item+" : "+removeChars(Materials));
      Materials = removeChars(Materials);
      const Parsed_Materials = parseMenuMaterials(Materials);

      for(material in Parsed_Materials){
        console.log("material being managed: "+material);
        var currentQuantity = await executeSQLCommand(`SELECT quantity FROM inventory WHERE name='${material}'`);
        currentQuantity = stripNonDigitsAndIncrement(currentQuantity);
        console.log("quantity from database: "+currentQuantity);
        console.log("ammount of this meterial being used = "+itemCounts[item]+"(ammount of "+item+") * "+Parsed_Materials[material]+"(ammount of "+material+") = "+ Parsed_Materials[material] * itemCounts[item]);
        const newQuantity = currentQuantity - Parsed_Materials[material] * itemCounts[item];
        await executeSQLCommand(`UPDATE inventory SET quantity=${newQuantity} WHERE name='${material}'`);
      }
    }
  }
  /**
 * executes the param as an sql command, and returns result
 * @param {*} str 
 * @returns whatever the sql command generates
 */
  async function executeSQLCommand(sqlCommand) {
    try {
      const client = await pool.connect();
      const result = await client.query(sqlCommand);
      client.release();
      console.log("Executed: "+ sqlCommand.toString());
      return JSON.stringify(result.rows);
    } catch (err) {
      console.error(err);
    } 
  }
/**
 * removes characters after second to last pipe so we can have a list of items sonl
 * @param {*} str 
 * @returns string of id after its been incremented and formatted
 */
  function removeCharactersAfterSecondToLastPipe(str) {
    // Split the string by the '|' character
    const parts = str.split('|');
    
    // If there are less than three parts, there's no need to remove anything
    if (parts.length < 3) {
      return str;
    }
    
    // Join the first n-2 parts with the '|' character
    const newStr = parts.slice(0, parts.length - 2).join('|');
    
    return newStr;
  }
/**
 * increment and format the id so that we can use in in sql querys
 * @param {*} str 
 * @returns string of id after its been incremented and formatted
 */
  function stripNonDigits(str) {
    const numericString = str.replace(/\P{N}/gu, ''); // replace all non-numeric characters with an empty string
    return numericString.replace(/\s+/g, ''); // remove all spaces from the resulting string
  }

/**
 * increment and format the id so that we can use in in sql querys
 * @param {*} str 
 * @returns string of id after its been incremented and formatted
 */
  function stripNonDigitsAndIncrement(str) {
    const numericString = str.replace(/\P{N}/gu, ''); // replace all non-numeric characters with an empty string
    const numericValue = parseInt(numericString, 10); // convert numeric string to a number
    const incrementedValue = numericValue + 1; // increment the numeric value by 1
    return String(incrementedValue); // convert incremented value back to a string and return it
  }

/**
 * we use this to parse the ordered items so we can properly subtract elemetns from our inventory, and update the transaction history
 * @param {*} str 
 * @returns nothing, but does run countItemsSoldAndManageInventory(items_sold,itemCounts,employee,total) with the proper params
 */
  function parseItems(str) {
    const items_sold = str;
    const items = str.split('|');
    const itemCounts = {};
    let total = 0;
    let employee = "";
  
    for (let i = 0; i < items.length; i++) {
      if (i === items.length - 2) {
        total = items[i];
      } else if (i === items.length - 1) {
        employee = items[i];
      } else {
        const [quantity, ...nameArr] = items[i].split(' ');
        const name = nameArr.join(' ');
        itemCounts[name] = +quantity;
      }
    }
  
    console.log("Total Price: " + total);
    console.log("Employee: " + employee);
  
    for (let item in itemCounts) {
      //console.log(item + ": " + itemCounts[item]);
    }
    countItemsSoldAndManageInventory(items_sold,itemCounts,employee,total);
    return itemCounts;
  }

/**
 * we use this to parse the menu materials so we can properly subtract elemetns from our inventory
 * @param {*} str 
 * @returns list of items that you can traverse
 */
  function parseMenuMaterials(str) {
    const items_sold = str;
    const items = str.split('|');
    const itemCounts = {};
  
    for (let i = 0; i < items.length; i++) {
        const [quantity, ...nameArr] = items[i].split(' ');
        const name = nameArr.join(' ');
        itemCounts[name] = +quantity;
    }

  
    for (let item in itemCounts) {
      //console.log(item + ": " + itemCounts[item] + "(materials)");
    }
    return itemCounts;
  }
/**
 * removes characters not needed for on of the objects we get from the database
 * @param {*} str 
 * @returns a string that does not have the "object" caracters around it
 */
  function removeChars(str) {
    
    str = str.slice(15, -3);
    console.log(str);
    return str
  }

  //RUN THE FUNCTION BELOW WITH A PROPPER STRING TO TEST THE THE GENERAL FUNCTIONALITY
  parseItems("1 Double Stack Cheeseburger|2 Classic Burger|2 Grilled Cheese|42.98|Abhi");
