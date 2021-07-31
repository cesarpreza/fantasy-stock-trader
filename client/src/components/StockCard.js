import React from 'react';
import { Card, Button } from 'react-bootstrap';

function StockCard(props) {
    return (
        <div>
            <Card className='stock-card'>
                <Card.Header style={{ fontFamily: 'monaco', fontWeight: 'bold', fontSize: '20px' }}> {props.companyName} </Card.Header>
                <Card.Body>
                    {/* <Card.Title> {props.companyName} </Card.Title> */}
                    <Card.Title style={{fontSize: '30px'}}> ${props.latestPrice} </Card.Title>
                    <Card.Subtitle> {props.change <0 ? `${props.change}` : `+${props.change}`} today </Card.Subtitle>
                    <Card.Text> 52 Week High: ${props.fiftytwoWeekHigh} 52 Week Low: ${props.fiftytwoWeeklow} </Card.Text>
                    <Card.Text> Previous Close: ${props.previousClose} </Card.Text>
                    <Button variant='success' onClick={props.showModal} >Trade</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default StockCard;