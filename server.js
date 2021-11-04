const express = require('express');
const axios = require('axios');
const path = require('path');
const pool = require('./db');
require('dotenv').config();
const port = process.env.PORT || 3000;
const testPublicKey = process.env.TEST_PUBLIC_KEY;
const testSecretKey = process.env.TEST_SECRET_KEY;
const prodSecretKey = process.env.SECRET_KEY;


const app = express();

app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.listen(3000);
console.log('listening on port 3000');


//DB ROUTES
app.get('/api/auth', async (req, res) => {
    // hard coding the user. update this
    const stockSum = await pool.query('SELECT SUM(stock_value) FROM user_holding WHERE user_id = 1');
    const getUser = await pool.query('SELECT * FROM stock_user');
    res.json({
        getUser: getUser.rows,
        stockSum: stockSum.rows[0]
    });
});

app.post('/api/auth', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    const userInfo = await pool.query('SELECT * FROM stock_user WHERE email = $1 AND password=$2;', [email, password]);
    if (userInfo.rows.length !== 0) {
        res.status(200).send({
            userId: userInfo.rows[0].user_id,
            buyingPower: userInfo.rows[0].buying_power
        })
    } else {
        res.status(200).send('user does not exist or incorrect email/password');
    }
});

app.post('/api/buy', async (req, res) => {
    try {
        const { stock_symbol, stock_name, stock_owned, stock_price, user_id, transaction_type } = req.body;

        const userQuery = await pool.query('SELECT * FROM stock_user WHERE user_id=$1', [user_id]);
        const stockHoldingQuery = await pool.query('SELECT * from user_holding WHERE stock_symbol=$1 AND user_id=$2', [ stock_symbol, user_id ]);
        const buyingPower = Math.round(userQuery.rows[0].buying_power * 100) / 100;
        const stock_value = Number(stock_owned) * stock_price;
        
        await pool.query('UPDATE stock_user SET buying_power=$1 WHERE user_id=$2', [buyingPower - stock_value, user_id]);
        if (stockHoldingQuery.rows[0]) {
            const sumStockOwned = stockHoldingQuery.rows[0].stock_owned;
            const currentStockValue = Number(stockHoldingQuery.rows[0].stock_value) + Number(stock_value);
            await pool.query('UPDATE user_holding SET stock_owned=$1, stock_value=$2 WHERE user_id=$3 AND stock_symbol=$4', [sumStockOwned + stock_owned, currentStockValue, user_id, stock_symbol]);
            console.log('user query was true if you see this message', `current stock value is ${currentStockValue}`);
        } else {
            const addStock = await pool.query('INSERT INTO user_holding(stock_symbol, stock_name, stock_owned, stock_value, user_id, transaction_type) VALUES($1,$2,$3,$4,$5, $6) RETURNING *',
            [stock_symbol, stock_name, stock_owned, stock_value, user_id, transaction_type]);
            res.status(200).json({
                addStock: addStock.rows[0]
            }); console.log(buyingPower);
            console.log('user query was false meaning the stock is not in the db and new stock gets added');  
        }
    } catch (err) {
        console.log(err.message);
    }
});

app.post('/api/sell', async (req, res) => {
    const { stock_symbol, user_id, stock_sold, stock_price, stock_value } = req.body;
    const sellStockQuery = await pool.query('SELECT * FROM user_holding WHERE user_id=$1 AND stock_symbol=$2', [user_id, stock_symbol]);
    const sumOfStockOwned = await pool.query('SELECT  SUM(stock_owned) FROM user_holding WHERE user_id=$1 AND stock_symbol=$2', [user_id, stock_symbol]);
    const stockSold = Number(stock_sold);
    const stockPrice = Number(stock_price);
    const stockValue = Number(stockSold) * stockPrice;
    //const querySellOrder = await pool.query('SELECT * FROM user_holding')
    if (sellStockQuery.rows[0]) {
        res.status(200).json(sellStockQuery.rows);
        await pool.query('UPDATE user_holding SET stock_owned=$1 WHERE user_id=$2 AND stock_symbol=$3', [sellStockQuery.rows[0].stock_owned - stockSold, user_id, stock_symbol]);
        await pool.query('UPDATE user_holding SET stock_value=$1 WHERE user_id=$2 AND stock_symbol=$3', [sellStockQuery.rows[0].stock_value - stockValue, user_id, stock_symbol]);
        console.log(sumOfStockOwned.rows[0], sellStockQuery.rows[0].stock_owned - stockSold, sellStockQuery.rows[0].stock_value - stockValue);
    } else {
        res.status(204).json({
            message: "stock is not in db"
        });
        console.log('stock not in db')
    } 
})

app.get('/api/stocks', (req, res) => {
    const stockName = req.query.stockName
    axios({
        method: 'get',
        url: `https://sandbox.iexapis.com/stable/stock/${stockName}/quote?token=${testSecretKey}`
    })
        .then(response => {
            res.json(response.data);
        }).catch(err => {
            res.status(404).send(err);
    })
})

app.get("/*", (req, res) =>
res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);
