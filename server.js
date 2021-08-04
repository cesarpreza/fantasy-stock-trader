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
    const getUser = await pool.query('SELECT * FROM stock_user');
    res.json(getUser.rows);
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
    // endpoint for updating the buiying power? 
    try {
        const { stock_symbol, stock_name, stock_owned, stock_value, user_id, buying_power } = req.body;
        const addStock = await pool.query('INSERT INTO user_holding(stock_symbol, stock_name, stock_owned, stock_value, user_id) VALUES($1,$2,$3,$4,$5) RETURNING *',
            [stock_symbol, stock_name, stock_owned, stock_value, user_id]);
        
        const updateBuyingPower = await pool.query('UPDATE stock_user SET buying_power=$1 WHERE user_id=$2', [buying_power, user_id]);
        console.log(addStock)
        res.json(addStock.rows[0], updateBuyingPower.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});


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
