import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function StockModal(props) {
    return (
        <div>
            <Modal showModal={props.isModalShown}>
                <Modal.Header>
                    <h3>Stock Info</h3>
                </Modal.Header>
                <Modal.Body>
                    <p>Price</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StockModal
