import React, { Component } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';
import stockImage from '../images/stock-img.jpg';

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
            <div className='login-container'>
                <div>
                    <Form id='login-form' >
                        <h1>Stock Traders</h1>
                        <h5>Welcome to my fantasy stock trading application. Once logged in you will be able to
                            buy and sell stocks using real time data from the IEX Cloud API.
                        </h5>
                        <Form.Group className='email-input' as={Row}>
                            <Form.Label column sm={3}>Email</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    autoFocus
                                    name='userEmail'
                                    onChange={this.handleChange}
                                    type='email'
                                    placeholder='enter email'
                                    value={this.state.userEmail} />
                            </Col>
                        </Form.Group>
                        <Form.Group className='password-input' as={Row}>
                            <Form.Label column sm={3}>Password</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    name='userPassword'
                                    type='password'
                                    onChange={this.handleChange}
                                    value={this.state.userPassword} />
                            </Col>
                        </Form.Group>
                        <div id='form-buttons'>
                            <Button className='btn btn-sm' onClick={this.handleSubmit} type='submit'>Login</Button>
                            <p>or</p>
                            <Button className='btn btn-sm'>Sign Up</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default LoginPage
