import React, { Component } from 'react';
import { Navbar, Card } from 'react-bootstrap';


class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountBalance: 100000,
            totalHoldings: 0,
            stocks: []
        }
        this.loadStock = this.loadStock.bind(this)
    }

    async loadStock() {
        
    }

    render() {
        return (
            <div>
                <div className='title-container'>
                    <h2>Dashboard</h2>
                </div>
                <div className='nav-container'>
                    <Navbar id='portfolio-nav' className='nav-dark'>
                        <p className='balances'>Account Balance: ${this.state.accountBalance}</p>
                        <p className='balances'>Total Holding Value: ${this.state.totalHoldings}</p>
                    </Navbar>
                </div>
                <div>
                    <div className='holdings-container'>
                        <h3>Current Holdings</h3>
                    </div>
                    <div>
                        <Card>
                            <Card.Body>
                                <Card.Title>Stocks</Card.Title>
                                    <table>
                                        <thead>
                                            <tr className='stock-info'>
                                                <th>Stock Symbol</th>
                                                <th>Price</th>
                                                <th>Shares</th>
                                                <th>Holding Value</th>
                                                </tr>
                                    </thead>
                                        <tbody>
                                            <tr className='stock-info'>
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
            </div>
        )
    }
}

export default Portfolio
