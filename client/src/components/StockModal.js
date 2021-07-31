import React from 'react';
import { Button, Modal } from 'react-bootstrap';


function StockModal(props) {
    console.log(props.stockPurchased);
    
    return (
        <div>
            <Modal show={props.show}>
                <Modal.Header>
                    <h5>{props.companyName} ({props.stockSymbol})</h5>
                    <p>Available Balance - ${ props.buyingPower }</p>
                </Modal.Header>
                <Modal.Body>
                    <p>Stock price: ${props.stockPrice} </p>
                    <input
                        onChange={props.handleChange}
                        value={props.stockPurchased} name='stockPurchased'
                        type='number'
                        style={{ width: '65px' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={ props.handlePurchase }>Buy</Button>
                    <Button variant='warning' onClick={ props.handleSell }>Sell</Button>
                    <Button variant='danger' onClick={props.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StockModal
