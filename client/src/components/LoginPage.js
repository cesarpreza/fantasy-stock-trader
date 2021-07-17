import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleSignUp = e => {
        e.preventDefault;
        console.log('button pressed');
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
                console.log(res);
                if (res.data) {
                    console.log(`user ID is: ${res.data}`)
                    localStorage.setItem('userId', res.data.userId)
                    this.props.history.push('/dashboard')
                } else {
                    alert('Invalid username or password')
                    this.setState({userEmail: '', userPassword: ''})
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    render() {
        console.log(this.state.userEmail, this.state.userPassword)
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
                                    placeholder='email@email.com'
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
                            <Link className='signup-link' to='/register'>
                                <Button className='btn btn-sm' onClick={ () => {console.log('register button clicked')} }  >Sign Up</Button>
                            </Link>
                            {/*Link to registration form! does not work. */}
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default LoginPage
