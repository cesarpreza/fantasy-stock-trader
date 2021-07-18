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
        this.handleErrors = this.handleErrors.bind(this);
    }

    handleChange = e => {
        this.setState({ searchTerm: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.searchTerm === '') {
            alert('Enter a stock symbol. Example: AAPL for Apple inc.');
        } else {
            axios.get("api/stocks", {
                params: {
                    stockName: this.state.searchTerm
                }
            })
                .then((res, req) => {
                    this.setState({ stock: res.data, searchTerm: '', isStockValid: true });
                }) .catch(this.handleErrors);
            
        }
    }

    handleErrors(err) {
        if (err.response) {
            console.log('error with response', err.response.status);
        } else if (err.request) {
            console.log(err.message);
        }
    }

    closeModal = () => {
        this.setState({isModalShown: false, isStockValid: false})
    }

    render() {
        console.log(this.state.searchTerm)
        console.log(this.state.stock)
        console.log(this.state.isStockValid)
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
                            onClick={() => this.setState({ isModalShown: true })}
                            type='submit'>Search</Button>
                    </Form>
                </div>
                <div>
                    {this.state.isStockValid ?
                        <StockModal
                            show={this.state.isModalShown}
                            companyName={this.state.stock.companyName}
                            stockSymbol={this.state.stock.symbol}
                            stockPrice={this.state.stock.latestPrice}
                            closeModal={this.closeModal}
                            accountBalance={this.state.accountBalance}
                        /> :
                            null
                    }
                </div>
                <div>
                <Card>
                            <Card.Body>
                                <Card.Title>Stock Holdings</Card.Title>
                                    <table className='stock-table'>
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
