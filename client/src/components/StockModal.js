import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function StockModal(props) {
    return (
        <div>
            <Modal show={props.show}>
                <Modal.Header>
                    {props.companyName}
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StockModal
