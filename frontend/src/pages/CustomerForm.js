import React from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';




export const CustomerForm = ({ customer, onSubmit }) => {

    // HOOKS //
    const { register, handleSubmit } = useForm({
        defaultValues: {
            first_name: customer ? customer.first_name : "",
            last_name: customer ? customer.last_name : "",
            phone: customer ? customer.phone : "",
            email: customer ? customer.email : "",
            address: customer ? customer.address : "",
        }
    })

    // EVENTS //
    const submitHandler = handleSubmit((data) => {
        onSubmit(data)
    })

    return (
        <form onSubmit={submitHandler}>
            <TextField
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="first_name"
                label="First Name"
                name="first_name"
                autoFocus
            />
            <TextField
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
            />
            <TextField
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
            />
            <TextField
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
            />
            <TextField
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                id="address"
                label="Address"
                name="address"
            />

            <div className='buttonContainer'>
                <Button type="submit" variant='contained' color='primary' size='large'>
                    Submit
                </Button>
            </div>
        </form>
    )
}