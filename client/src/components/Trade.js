import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: []
        }
    }

    async componentDidMount() {
        await axios.get(`api/stocks`)
            .then(res => {
            this.setState({ stock: res.data})
        })
    }
    render() {
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
                        <input type='text' placeholder='example.. aapl' />
                        <Button>Search</Button>
                    </Form>
                </div>
                <div>
                    {this.state.stock.map(data => {
                        <tbody>
                            <tr>
                                <td>{data.pricePerShare}</td>
                                <td>{data.symbol}</td>
                            </tr>
                        </tbody>
                    })}
                </div>
            </div>
        )
    }
}

export default Trade;
