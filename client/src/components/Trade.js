import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            stock: []
        }
    }

    handleChange = e => {
        this.setState({ searchTerm: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.searchTerm === '') {
            alert('Enter a stock symbol. Example: AAPL for Apple inc.')
        } else {
            axios.get(`api/stocks?stockName=${this.state.searchTerm}`)
                .then(res => {
                this.setState({ stock: res.data, searchTerm: '' })
            })
        }
    }

    render() {
        console.log(this.state.searchTerm)
        console.log(this.state.stock)
        return (
            <div>
                <div>
                    <h2>Trade</h2>
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
                    {Object.keys(this.state.stock).map((stocks, i) => {
                        return (
                            <div key={i}>
                                <p>{ this.state.stock[stocks] }</p>
                            </div>
                        )
                    })}
                    {/* {this.state.stock.map(stockData => {
                            <div>
                                <p>Symbol: {stockData.latestPrice}</p>
                                <p>Latest Price: {stockData.symbol}</p>
                            </div>
                    })} */}
                </div>
            </div>
        )
    }
}

export default Trade;
