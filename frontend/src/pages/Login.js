
import './Admin.css'
import React from 'react'
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form'
import { Button } from '@material-ui/core';
import * as API from '../API'
import { useHistory } from 'react-router-dom'



export const Login = () => {
    
    const history = useHistory()
    const { register, handleSubmit } = useForm()


    const submitHandler = handleSubmit((data) => {
        API.login(data.email, data.password).then((success) => {
            if (success) {
                history.push('/admin_dashboard')
            }
        })
    })

    return (
        <div className='page'>
            <div className='header'>
                <div className='title'>
                    Login
                </div>
            </div>
            <form className='formContainer' onSubmit={submitHandler}>
                <TextField
                    inputRef={register}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    inputRef={register}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />

                <div className='buttonContainer'>
                    <Button type="submit" variant='contained' color='primary' size='large'>
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}