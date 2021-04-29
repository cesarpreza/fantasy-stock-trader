import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function StockModal(props) {
    console.log(props.companyName)
    return (
        <div>
            <Modal show={props.show}>
                <Modal.Header>
                    {props.companyName}
                </Modal.Header>
                <Modal.Body>
                    {props.stockSymbol}
                    {props.stockPrice}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-primary'>Buy Stocks</Button>
                    <Button className='btn btn-secondary' onClick={props.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StockModal
