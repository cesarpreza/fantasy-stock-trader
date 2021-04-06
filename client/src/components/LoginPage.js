import React, { Component } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        console.log('submit form')
    }

    handleChange(e) {
        this.setState({userEmail: e.target.value})
    }

    render() {
        console.log(this.state.userEmail)
        return (
            <div id='loginContainer'>
                <Form id='loginForm'>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={4}>
                            <Form.Control onChange={this.handleChange} type='email' placeholder='enter email' /> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={4}>
                            <Form.Control type='password' />
                        </Col>
                    </Form.Group>
                    <Button onClick={this.handleSubmit}>Sign In</Button>
                </Form>
            </div>
        )
    }
}

export default LoginPage
