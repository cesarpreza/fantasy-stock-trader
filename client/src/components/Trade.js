import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StockModal from './StockModal';
import { Button, Form, Card, Navbar } from 'react-bootstrap';
import axios from 'axios';

class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            stock: [],
            isModalShown: false,
            isStockValid: false,
            accountBalance: 10000,
            holdingValue: 0
        }
    }

    handleChange = e => {
        this.setState({ searchTerm: e.target.value })
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
                        console.log(res);
                }).catch(() => {
                    alert('The stock you entered could not be found. Please enter a valid stock symbol.');
                    this.setState({ stock: [], searchTerm: '', isStockValid: false })
                });
            
            } else {
                alert('Enter a stock symbol. Example: AAPL for Apple inc.');
        }
    }

    closeModal = () => {
        this.setState({isModalShown: false})
    }

    render() {
        console.log(this.state.stock)
        console.log(this.state.isStockValid)
        console.log(this.state.isModalShown)
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
                            value={this.state.searchTerm}
                            onChange={this.handleChange}
                            type='text'
                            placeholder='ie. AMC' />
                        <Button
                            type='submit'>Search</Button>
                    </Form>
                </div>
                <div className='searched-stock-container'>
                        <table className='stock-table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Company</th>
                                    <th scope='col'>Symbol</th>
                                    <th scope='col'>Last Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.isStockValid ?
                                <tr>
                                    <td> {this.state.stock.companyName} </td>
                                    <td> {this.state.stock.symbol} </td>
                                    <td> {this.state.stock.latestPrice} </td>
                                    <td> 
                                        <Button onClick={() => this.setState({ isModalShown: true })}>
                                            Buy/Sell</Button>
                                    </td>
                                </tr>
                                    : null}
                            </tbody>
                        </table>
                        {/* when a stock is searched, Show the stock info on the trade page
                        Use a div to center the stock information, On the right 
                        Have a button the says "Buy" to initiate a modal pop up buy transaction. */}
                    {this.state.stock ?
                        <StockModal
                            show={this.state.isModalShown}
                            companyName={this.state.stock.companyName}
                            stockSymbol={this.state.stock.symbol}
                            stockPrice={this.state.stock.latestPrice}
                            closeModal={this.closeModal}
                            accountBalance={this.state.accountBalance}
                        /> 
                        :
                            null
                    }
                </div>
                <div className='holdings'>
                <Card>
                            <Card.Body>
                                <Card.Title>Stock Holdings</Card.Title>
                                    <table className='holdings-table'>
                                        <thead>
                                            <tr>
                                                <th>Stock Symbol</th>
                                                <th>Price</th>
                                                <th>Shares</th>
                                                <th>Holding Value</th>
                                                </tr>
                                    </thead>
                                        <tbody>
                                            <tr>
                                                {/* <td></td>
                                                <td>$</td>
                                                <td>{this.state.shares}</td>
                                                <td>${this.state.holdingValue}</td> */}
                                            </tr>
                                        </tbody>
                                    </table>
                            </Card.Body>
                        </Card>
                </div>
            </div>
        )
    }
}

export default withRouter(Trade);
