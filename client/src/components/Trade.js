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
                    console.log(res.data);
                    this.setState({buyingPower: res.data[0].buying_power, holdingValue: res.data[0].total_holding})
                };
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
                        console.log(res.data);
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
        // fix the rounding of the stock price if its more than 2 decimal places. 
        const addValues = this.state.stock.latestPrice * this.state.stockPurchased;
        const stockInfo = {
            stock_symbol: this.state.stock.symbol,
            stock_name: this.state.stock.companyName,
            stock_owned: this.state.stockPurchased,
            stock_value: addValues,
            user_id: localStorage.getItem('userId')
        }
        await axios.post('http://localhost:3000/api/buy', stockInfo)
            .then(res => {
                console.log(res);
                this.setState({ stockPurchased: '', isModalShown: false })
        })
    }


    // handlePurchase = e => {
    //     When the buy button is clicked, the stock bought must subtract that amount from the account balance in state. 
    //     const addValues = this.state.stock.latestPrice * this.state.stockPurchased;
    //     const updateBuyingPower = this.state.buyingPower - addValues;
    //     const updateHolding = this.state.holdingValue + addValues;
    //     if (this.state.stockPurchased !== '') {
    //         if (addValues < this.state.buyingPower) {
    //             this.setState({ stockPurchased: '', isModalShown: false, buyingPower: updateBuyingPower, holdingValue: updateHolding });
    //         } else {
    //             alert('not enough money')
    //         }
    //         console.log(addValues, updateBuyingPower);
    //     }
    //     console.log('buy button clicked');
    // }

    handleSell = e => {
        console.log('sell button clicked')
    }

    componentDidMount() {
        this.fetchUserData();
    }

    render() {
        console.log(this.state.stockPurchased);
        console.log(this.state.stock)
        return (
            <div>
                <div>
                    <h2>Trade</h2>
                    <Navbar id='portfolio-nav' className='nav-dark'>
                        <p className='balances'>Account Balance: ${this.state.buyingPower}</p>
                        <p className='balances'>Total Holding Value: ${this.state.holdingValue}</p>
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
