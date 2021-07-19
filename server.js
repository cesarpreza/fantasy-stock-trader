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
            userId: userInfo.rows[0].user_id
        })
    } else {
        res.status(200).send('user does not exist or incorrect email/password');
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
            console.log(err.message);
            res.send(err);
    })
})

app.get("/*", (req, res) =>
res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

