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
    const { email } = req.body;
    const postItem = await pool.query('SELECT email FROM stock_user WHERE email = $1;', [email]);
    if (postItem.rows.length !== 0) {
        console.log('user already exists');
    } else {
        console.log('user does not exist');
    }
    res.json(postItem.rows);
})


let users = [
    {
        id: 1,
        name: 'Cesar',
        userName: 'user1',
        email: 'abc@email.com',
        password: 'abc'
    },
    {
        id: 2,
        name: 'Cheese',
        userName: 'user2',
        email: '123@email.com',
        password: '123'
    }
]

    // app.post('/api/auth', (req, res) => {
    //     let userResult = users.find(user => user.email === req.body.email);
    //     if (userResult) {
    //         if (userResult.password === req.body.password) {
    //             res.status(200).send({
    //                 message: true,
    //                 userId: userResult.id
    //             })
    //         } else {
    //             res.status(200).send({
    //                 message: false
    //             })
    //         }
    //     } else {
    //         res.status(200).send({
    //             message: false
    //         })
    //     }
    // });

app.get('/api/stocks', (req, res) => {
    const stockName = req.query.stockName
    axios({
        method: 'get',
        url: `https://sandbox.iexapis.com/stable/stock/${stockName}/quote?token=${testSecretKey}`
    })
        .then(responce => {
            res.json(responce.data);
        }).catch(err => {
        console.log(err.message)
    })
})

app.get("/*", (req, res) =>
res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

//Sandbox URL: https://sandbox.iexapis.com
