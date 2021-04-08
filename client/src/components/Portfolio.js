import React from 'react';
import { Navbar } from 'react-bootstrap';

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
        </div>
    )
}

// Toolbar for portfolio, center items for navbar

export default Portfolio
