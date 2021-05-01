const express = require('express');
const axios = require('axios');
const path = require('path');
const port = process.env.PORT || 3000;
const publicToken = process.env.PUBLIC_KEY;

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.listen(3000);
console.log('listening on port 3000');

let users = [
    {
        id: 1,
        userName: 'user1',
        email: 'abc@email.com',
        password: 'abc123'
    },
    {
        id: 2,
        userName: 'user2',
        email: '123@email.com',
        password: '123abc'
    }
]

    app.post('/api/auth', (req, res) => {
        let userResult = users.find(user => user.email === req.body.email);
        if (userResult) {
            if (userResult.password === req.body.password) {
                res.status(200).send({
                    message: 'User Found'
                })
            } else {
                res.status(200).send({
                    message: 'Password incorrect or user does not exist'
                })
            }
        } else {
            res.status(200).send({
                message: 'User not found'
            })
        }
    });

app.get('/api/stocks', (req, res) => {
    const stockName = req.query.stockName
    axios({
        method: 'get',
        url: `https://sandbox.iexapis.com/stable/stock/${stockName}/quote?token=${publicToken}`
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

//Sandbox testing URL:  https://sandbox.iexapis.com/ 