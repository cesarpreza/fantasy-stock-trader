import React from 'react';
import { Button, Form } from 'react-bootstrap';

function Registration() {
    return (
        <div className='registration-form'>
            <Form>
                <div className='form-group'>
                    <label>First Name: </label>
                    <input type='text' className='form-control-md' />
                </div>
                <div className='form-group'>
                    <label>Last Name: </label>
                    <input type='text' className='form-control-md' />
                </div>
                <div className='form-group'>
                    <label>Username: </label>
                    <input type='text' className='form-control-md' />
                </div>
                <div>
                    <label>Email: </label>
                    <input type='email' className='form-control-md' />
                </div>
            </Form>



            <Button>Register!</Button>
        </div>
    )
}

export default Registration
