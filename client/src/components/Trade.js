import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StockModal from './StockModal';
import { Button, Form, Card, Navbar, Table } from 'react-bootstrap';
import axios from 'axios';
import StockCard from './StockCard';

class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            stock: [],
            isModalShown: false,
            isStockValid: false,
            buyingPower: 0,
            holdingValue: 0,
            stockPurchased: ''
        }
    }

    fetchUserData = async() => {
        await axios.get('/api/auth')
            .then(res => { 
                if (res.data) {
                    this.setState({
                        buyingPower: res.data.getUser[0].buying_power,
                        holdingValue: res.data.stockSum.sum
                    }) 
                }
            })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault();
        if (this.state.searchTerm !== '') {
            await axios.get("api/stocks", {
                params: {
                    stockName: this.state.searchTerm
                }
            })
                .then((res, req) => {
                        this.setState({ stock: res.data, searchTerm: '', isStockValid: true });
                        //console.log(res.data);
                }).catch(() => {
                    alert('The stock you entered could not be found. Please enter a valid stock symbol.');
                    this.setState({ stock: [], searchTerm: '', isStockValid: false })
                });
            
            } else {
                alert('Enter a stock symbol. Example: AAPL for Apple inc.');
        }
    }

    closeModal = () => {
        this.setState({isModalShown: false, stockPurchased: ''})
    }

    showModal = () => {
        this.setState({
            isModalShown: true
        })
    }

    handlePurchase = async e => {
        const buyStock = `http://localhost:3000/api/buy`;
        const queryDb = `http://localhost:3000/api/auth`;
        const body = {
            stock_symbol: this.state.stock.symbol,
            stock_name: this.state.stock.companyName,
            stock_owned: Number(this.state.stockPurchased),
            stock_price: this.state.stock.latestPrice,
            transaction_type: 'Buy', //hard coding "Buy"? Should this be dynamic? Only being initiated in handle purchase. 
            user_id: localStorage.getItem('userId')
        }
        await axios.post(buyStock, body)
            .then(await axios.get(queryDb)
                .then(res => {
                    if (res.data) {
                        this.fetchUserData();
                        this.setState({
                            stockPurchased: '',
                            isModalShown: false,
                            holdingValue: res.data.stockSum.sum
                        })
                        console.log(res.data)
                    }
            }))
    }

    handleSell = async e => {
        const sellStock = `http://localhost:3000/api/sell`;
        const sellBody = {
            stock_symbol: this.state.stock.symbol,
            user_id: localStorage.getItem('userId'),
            stock_sold: Number(this.state.stockPurchased),
            stock_price: Number(this.state.stock.latestPrice),
        }
        await axios.post(sellStock, sellBody)
            .then(res => {
                if (res.status == 200 && res.data) {
                    this.fetchUserData();
                    this.setState({
                        stockPurchased: '',
                        isModalShown: false,
                        holdingValue: res.data.stockSum
                    });
                } else {
                    alert('You do not own enough shares to complete this sell order')
                    this.setState({
                        stockPurchased: '',
                        isModalShown: false,
                    })
                }
            })
        //console.log('sell button clicked')
    }

    componentDidMount() {
        this.fetchUserData();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.holdingValue !== prevState.holdingValue) {
            console.log(`updated from ${prevState.holdingValue} to ${this.state.holdingValue}`)
            return this.fetchUserData();
        } else {
            console.log('did not update')
        }
    }


    render() {
        return (
            <div>
                <div>
                    <h2>Trade</h2>
                    <Navbar id='portfolio-nav' className='nav-dark'>
                        <p className='balances'>Account Balance: ${this.state.buyingPower}</p>
                        <p className='balances'>Portfolio Value: ${this.state.holdingValue}</p>
                    </Navbar>
                    <p>Enter a stock symbol below to see the
                        current price of a specific option and to buy shares.</p>
                </div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <input
                            name='searchTerm'
                            value={this.state.searchTerm}
                            onChange={this.handleChange}
                            type='text'
                            placeholder='ie. AMC' />
                        <Button
                            variant='secondary'
                            type='submit'>Search</Button>
                    </Form>
                </div>
                <div className='searched-stock-container'>
                    {this.state.isStockValid ? 
                        <StockCard
                            companyName={this.state.stock.companyName}
                            latestTime={this.state.stock.latestTime}
                            fiftytwoWeekHigh={this.state.stock.week52High}
                            fiftytwoWeeklow={this.state.stock.week52Low}
                            latestPrice={this.state.stock.latestPrice}
                            change={this.state.stock.change}
                            previousClose={this.state.stock.previousClose}
                            showModal={this.showModal}
                        /> : null}
                    
                    {this.state.stock ?
                        <StockModal
                            show={this.state.isModalShown}
                            companyName={this.state.stock.companyName}
                            stockSymbol={this.state.stock.symbol}
                            stockPrice={this.state.stock.latestPrice}
                            closeModal={this.closeModal}
                            buyingPower={this.state.buyingPower}
                            handlePurchase={this.handlePurchase}
                            handleSell={this.handleSell}
                            handleChange={this.handleChange}
                            stockPurchased={this.state.stockPurchased}
                        /> 
                        :
                            null
                    }
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Recent Purchase
                                </th>
                            </tr>
                        </thead>
                    </Table>
                </div>
                <div className='holdings'>
                </div>
            </div>
        )
    }
}

export default withRouter(Trade);
