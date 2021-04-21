const express = require('express');
const axios = require('axios');
const path = require('path');
//const port = process.env.PORT || 3000;
require('dotenv').config();
const publicToken = process.env.PUBLIC_KEY;

const app = express();

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.listen(3000);
console.log('listening on port 3000');

app.get('/api/stocks', (req, res) => {
    //const stockName = req.query;
    axios({
        method: 'get',
        url: `https://sandbox.iexapis.com/stable/stock/fb/quote?token=${publicToken}`
    })
        .then(responce => {
            res.json(responce.data);
        }).catch(err => {
        console.log(err.message)
    })
    // const stockData = [
    //     {
    //         "id": 1,
    //         "name": "Apple Inc.",
    //         "symbol": "AAPL",
    //         "pricePerShare": 130,
    //     },
    //     {
    //         "id": 2,
    //         "name": "Game Stop",
    //         "symbol": "GME",
    //         "pricePerShare": 150,
    //     }
    // ]
    // res.send(stockData)
})

app.get("/*", (req, res) =>
res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

//Sandbox testing URL:  https://sandbox.iexapis.com/ 