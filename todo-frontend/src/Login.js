import React from 'react'
import { useForm } from 'react-hook-form'
import { login } from './api'


export const Login = () => {

    const { register, handleSubmit } = useForm()


    const submitHandler = handleSubmit((data) => {
        alert(JSON.stringify(data))
        login(data.email, data.password).then((response) => {
            console.log(response)
        })
    })

    return (
        <div className="container">
            <div className="mt-3">
                <h3>Todo List</h3>
                <form onSubmit={submitHandler}>
                    <div className='form-group'>
                        <label htmlFor='email'>
                            Email:
                </label>
                        <input className="form-control" ref={register} type="text" name="email" id="email" />
                        <label htmlFor='password'>
                            Password:
                </label>
                        <input className="form-control" ref={register} type="password" name="password" id="password" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Login
                </button>
                    </div>
                </form>
            </div>
        </div>
    )
}