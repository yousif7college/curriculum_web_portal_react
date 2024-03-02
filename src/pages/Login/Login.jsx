import React from 'react'
import "./Login.scss"
import { FaUser, FaLock } from "react-icons/fa"
import { Form } from 'react-bootstrap'

export default function Login() {
    return (
        <div className='Login'>
            <form>
                <h1>Login</h1>
                <div className="input-box">
                    <Form.Control type="text" placeholder='Username' required />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <Form.Control type="Password" placeholder='Password' required />
                    <FaLock className='icon' />
                </div>
                <div className="remember-forget">
                    <label htmlFor="checkbox">Remember me</label>
                    <a href="#" Forgot Password></a>
                </div>
                <button type='submit'>Login</button>
                <div className="register-link">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
    )
}
