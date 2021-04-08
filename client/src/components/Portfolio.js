import React from 'react';
import { Navbar, Card } from 'react-bootstrap';

function Portfolio() {
    return (
        <div>
            <div className='title-container'>
                <h2>Dashboard</h2>
            </div>
            <div className='nav-container'>
                <Navbar id='portfolio-nav' className='nav-dark'>
                    <p className='balances'>Account Balance: $100,000</p>
                    <p className='balances'>Total Holding Value: $0</p>
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
                                            <td>aapl</td>
                                            <td>$130</td>
                                            <td>2</td>
                                            <td>$260</td>
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

// Toolbar for portfolio, center items for navbar

export default Portfolio
