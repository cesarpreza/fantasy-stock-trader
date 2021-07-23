import React from 'react';
import { Button, Modal } from 'react-bootstrap';


function StockModal(props) {
    
    return (
        <div>
            <Modal show={props.show}>
                <Modal.Header>
                    <h5>{props.companyName} ({props.stockSymbol})</h5>
                    <p>Available Balance - ${ props.accountBalance }</p>
                </Modal.Header>
                <Modal.Body>
                    <p>Stock price: ${props.stockPrice} </p>
                    <input required type='number' style={{ width: '65px' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ props.buyButton }>Buy</Button>
                    <Button variant='warning'>Sell</Button>
                    <Button className='btn btn-secondary' onClick={props.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StockModal
