import React, { useEffect } from 'react'
import "./Login.scss"
import {useNavigate} from 'react-router-dom'
import useHTTP from '../../hooks/useHTTP'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/FormInput/FormInput'

export default function Login() {
    const navigate = useNavigate();
    const [sendHTTP, httpRes] = useHTTP();

    const { reset, register, handleSubmit } = useForm();

    const handleLogin = async (data) => {
        sendHTTP('/auth/login', 'POST', data);
    }
    useEffect(() => {
        console.log(httpRes)
        if (httpRes?.data) {
            localStorage.setItem('user',JSON.stringify(httpRes.data));
            navigate('/home')
        }

        else if (httpRes?.error) {
            alert('Invalid email or password')
        }
    }, [httpRes?.data, httpRes?.error])
    return (
        <div className='Login'>
            <form>
                <h1>Login</h1>
                <FormInput name="email" type="text" label="Email" register={register}/>
                <FormInput name="password" type="text" label="Password" register={register}/>
                <button onClick={handleSubmit(handleLogin)}>Login</button>
            </form>
        </div>
    )
}
