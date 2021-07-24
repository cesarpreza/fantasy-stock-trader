import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StockModal from './StockModal';
import { Button, Form, Card, Navbar } from 'react-bootstrap';
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
            accountBalance: 10000,
            holdingValue: 0,
            stockPurchased: ''
        }
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


    handlePurchase = e => {
        const addValues = this.state.stock.latestPrice * this.state.stockPurchased
        if (this.state.stockPurchased !== '') {
            console.log(addValues);
            this.setState({stockPurchased: ''})
        }
        console.log('buy button clicked');
    }

    handleSell = e => {
        console.log('sell button clicked')
    }

    render() {
        console.log(this.state.stockPurchased);
        console.log(this.state.stock)
        return (
            <div>
                <div>
                    <h2>Trade</h2>
                    <Navbar id='portfolio-nav' className='nav-dark'>
                        <p className='balances'>Account Balance: ${this.state.accountBalance}</p>
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
                            accountBalance={this.state.accountBalance}
                            handlePurchase={this.handlePurchase}
                            handleSell={this.handleSell}
                            handleChange={this.handleChange}
                            stockPurchased={this.state.stockPurchased}
                        /> 
                        :
                            null
                    }
                </div>
                <div className='holdings'>
                </div>
            </div>
        )
    }
}

export default withRouter(Trade);
