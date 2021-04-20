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
        this.stockData = this.stockData.bind(this)
    }

    handleChange = e => {
        this.setState({ searchTerm: e.target.value })
    }

    async stockData() {
        await axios.get(`api/stocks`)
            .then(res => {
            this.setState({ stock: res.data })
        })
    }

    // async componentDidMount() {
    //     await axios.get(`api/stocks`)
    //         .then(res => {
    //         this.setState({ stock: res.data.symbol })
    //     })
    // } 

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.searchTerm === '') {
            alert('Enter a stock symbol')
        } else if (this.state.searchTerm) {
            axios.get('/api/stocks')
                .then(res => {
                    res.data.symbol.includes(this.state.searchTerm)
                    
                console.log(res.data)
            } )
        }
        console.log('submit hit')
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
                                <h2>Price: {data.pricePerShare}</h2>
                                <h2>Symbol: {data.symbol}</h2>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Trade;
