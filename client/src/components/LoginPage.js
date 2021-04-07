import React, { Component } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';

// LEFT OFF: Create dummy data for a user login on server side ? Post request ?
//send username and password to server?

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    
    handleChange(e) {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }
    
    handleSubmit = e => {
        e.preventDefault()
        if (this.state.userEmail === '' || this.state.userPassword === '') {
            alert('Enter Username and Password')
        } else {
            this.setState({userEmail: '', userPassword: ''})
        }
    }
    
    render() {
        console.log(this.state.userEmail, this.state.userPassword)
        return (
            <div id='loginContainer'>
                <Form id='loginForm'>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                autoFocus
                                name='userEmail'
                                onChange={this.handleChange}
                                type='email'
                                placeholder='enter email'
                                value={this.state.userEmail} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                name='userPassword'
                                type='password'
                                onChange={this.handleChange}
                                value={this.state.userPassword} />
                        </Col>
                    </Form.Group>
                    <div id='form-buttons'>
                        <Button onClick={this.handleSubmit} type='submit'>Sign In</Button>
                        <p>or, if you dont have an account</p>
                        <Button>Sign Up</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default LoginPage
