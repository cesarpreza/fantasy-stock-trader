const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.listen(3000);
console.log('listening on port 3000');

app.get('/api/stocks', (req, res) => {
    const stockData = [
        {
            "name": "Apple Inc.",
            "symbol": "AAPL",
            "pricePerShare": 200,
        },
        {
            "name": "Game Stop",
            "symbol": "GME",
            "pricePerShare": 150,
        }
    ]
    res.json(stockData)
})




//Catch all routes.
app.get("/*", (req, res) =>
res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);