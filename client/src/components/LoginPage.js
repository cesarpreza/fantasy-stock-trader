import React, { Component } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';

// LEFT OFF: Create dummy data for a user login on server side ? Post request ?
//send username and password to server?

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: '',
            isAuth: false
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
        const request = {
            email: this.state.userEmail,
            password: this.state.userPassword
        }
        if (this.state.userEmail === '' || this.state.userPassword === '') {
            alert('Enter Username and Password')
        } else {
            this.setState({userEmail: '', userPassword: ''})
        }
        axios.post(`http://localhost:3000/api/auth`, request)
            .then(res => {
                if(res.data.message) {
                    this.setState({isAuth: true})
                } else {
                    this.setState({isAuth: false})
                }
            console.log(res.data.message)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    render() {
        console.log(this.state.userEmail, this.state.userPassword, `isAuth is: ${this.state.isAuth}`)
        return (
            <div className='login-container'>
                <div>
                    <Form id='login-form' onSubmit={e => this.handleSubmit(e)} >
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
                            <Button className='btn btn-sm' type='submit'>Login</Button>
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
