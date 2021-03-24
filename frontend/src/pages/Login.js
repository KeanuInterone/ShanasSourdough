
import styles from './Login.module.css'
import React from 'react'
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form'
import { login } from '../api'
import { Button } from '@material-ui/core';


export const Login = () => {

    const { register, handleSubmit } = useForm()


    const submitHandler = handleSubmit((data) => {
        alert(JSON.stringify(data))
        login(data.email, data.password).then((response) => {
            console.log(response)
        })
    })

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.title}>
                    Login
                </div>
            </div>
            <form className={styles.formContainer} onSubmit={submitHandler}>
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

                <div className={styles.buttonContainer}>
                    <Button variant='contained' color='primary' size='large' onClick={submitHandler}>
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}