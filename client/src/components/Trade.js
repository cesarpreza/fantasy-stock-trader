import React, { Component } from 'react';
import Modal from './Modal';
import { Button, Form, Card, Navbar } from 'react-bootstrap';
import axios from 'axios';

class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            stock: [],
            isStockValid: false,
            accountBalance: 10000,
            holdingValue: 0
        }
    }

    handleChange = e => {
        this.setState({ searchTerm: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.searchTerm === '') {
            alert('Enter a stock symbol. Example: AAPL for Apple inc.');
        } else {
            axios.get(`api/stocks?stockName=${this.state.searchTerm}`)
                .then(res => {
                    this.setState({ stock: res.data, searchTerm: '', isStockValid: true })
            })
        }
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
                        <p className='balances'>Total Holding Value: ${this.state.totalHoldings}</p>
                    </Navbar>
                    <p>Enter a stock symbol below to see the
                        current price of a specific option and to buy shares.</p>
                </div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <input value={this.state.searchTerm} onChange={this.handleChange} type='text' placeholder='example.. aapl' />
                        <Button type='submit'>Search</Button>
                    </Form>
                </div>
                <div>
                    <Modal/>
                    {this.state.isStockValid ?
                        <ul>
                            <li>Company Name: {this.state.stock.companyName}</li>
                            <li>Stock Symbol: {this.state.stock.symbol}</li>
                            <li>Lates Price: {this.state.stock.latestPrice}</li>
                        </ul> :
                        null }
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
                                                {/* <td>{this.state.stockSymbol}</td>
                                                <td>${this.state.stockPrice}</td>
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

export default Trade;
