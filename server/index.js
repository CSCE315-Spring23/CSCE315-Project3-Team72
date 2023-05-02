//postgres functionality
const { Pool } = require('pg');
const dotenv = require('dotenv').config()

//express app functionality
const express = require('express');
const app = express();
const port = 3001;


// Create pool
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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/user', (req, res) => {
    menu = []
    pool
        .query('SELECT * FROM menu_table;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                menu.push(query_res.rows[i]);
            }
            const data = {menu: menu};
            res.json({message: menu});
        });
});

app.get('/query', async (req, res) => {
    await pool
        .query(req.query.cmd)
        .then(query_res => {
            res.json({result: query_res.rows});
        });
});

app.get('/xz-report', (req, res) => {
    pool
        .query("SELECT * FROM transaction_history")
        .then(result => {
            res.json({list: result.rows.filter(transaction => transaction.date === req.query.date_str)});
        });
});

app.get('/restock-report', (req, res) => {
   pool
       .query("SELECT * FROM inventory")
       .then(result => {
           console.log(result.rows.filter(item => item.quantity < item.min_amount));
           res.json({list:result.rows.filter(item => item.quantity < item.min_amount)});
       });
});

app.get('/sales-report', (req, res) => {
   pool
       .query(`SELECT * FROM transaction_history WHERE date >= '${req.query.start_date}' AND date <= '${req.query.end_date}'`)
       .then(result => {
           res.json({list: result.rows});
       })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});