import React from 'react';
import { Card, Button } from 'react-bootstrap';

function StockCard(props) {
    return (
        <div>
            <Card>
                <Card.Header> {props.companyName} </Card.Header>
                <Card.Body>
                    {/* <Card.Title> {props.companyName} </Card.Title> */}
                    <Card.Title> ${props.latestPrice} {props.change} today </Card.Title>
                    <Card.Text> 52 Week High: ${props.fiftytwoWeekHigh} 52 Week Low: ${props.fiftytwoWeeklow} </Card.Text>
                    <Card.Text> Previous Close: ${props.previousClose} </Card.Text>
                    <Button className='btn btn-primary-md' onClick={props.showModal} >Buy/Sell</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default StockCard;