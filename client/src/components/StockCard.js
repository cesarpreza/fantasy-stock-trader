import React from 'react';
import { Card } from 'react-bootstrap';

function StockCard(props) {
    console.log(props.companyName)
    return (
        <div>
            <Card>
                <Card.Header> Price for {props.latestTime} </Card.Header>
                <Card.Body>
                    <Card.Title> {props.companyName} </Card.Title>
                    <Card.Subtitle> 52 Week High: ${props.fiftytwoWeekHigh} 52 Week Low: ${props.fiftytwoWeeklow} </Card.Subtitle>
                </Card.Body>
            </Card>
        </div>
    )
}

export default StockCard;