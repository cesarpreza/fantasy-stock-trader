import React from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

function Registration() {
    return (
        <div className='registration-form'>
            <Form>
                <Form.Group className='first-name-input' as={Row}>
                    <Form.Label column sm={3}>First Name: </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type='text'
                            placeholder='John'
                            />
                    </Col>
                </Form.Group>
                <Form.Group className='last-name-input' as={Row}>
                    <Form.Label column sm={3}>Last Name: </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type='text'
                            placeholder='Doe'
                        />
                    </Col>
                </Form.Group>
                <Form.Group className='username-input' as={Row}>
                    <Form.Label column sm={3}>Username: </Form.Label>
                    <Col sm={8}>
                        <Form.Control type='text' />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>Email: </Form.Label>
                    <Col sm={8}>
                        <Form.Control type='email' />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>Password: </Form.Label>
                    <Col sm={8}>
                        <Form.Control type='password' />
                    </Col>
                </Form.Group>
            </Form>



            <Button>Register!</Button>
        </div>
    )
}

export default Registration
