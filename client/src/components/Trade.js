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
        axios.get(`api/stocks`)
            .then(res => {
            this.setState({ stock: res.data })
        })
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
                    <Form>
                        <input value={this.state.searchTerm} onChange={this.handleChange} type='text' placeholder='example.. aapl' />
                        <Button onClick={this.handleSubmit}>Search</Button>
                    </Form>
                </div>
                <div>
                    {this.state.stock.map((data) => {
                        return (
                            <div>
                                <p>Price: {data.pricePerShare}</p>
                                <p>Symbol: {data.symbol}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Trade;
