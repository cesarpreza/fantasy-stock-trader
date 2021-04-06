import React from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';

function LoginPage() {
    return (
        <div id='loginContainer'>
            <Form id='loginForm'>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={4}>
                        <Form.Control type='email' placeholder='enter email' /> 
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Password</Form.Label>
                    <Col sm={4}>
                        <Form.Control type='password' />
                    </Col>
                </Form.Group>
                <Button>Sign In</Button>
            </Form>
        </div>
    )
}

export default LoginPage
