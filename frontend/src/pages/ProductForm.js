import React from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';




export const ProductForm = ({ product, onSubmit }) => {

    // HOOKS //
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: product ? product.name : "",
            price: product ? product.price : "",
            description: product ? product.description : ""
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
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
            />
            <TextField
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                id="description"
                label="Description"
                name="description"
            />
            <TextField
                inputRef={register}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                id="price"
            />

            <div className='buttonContainer'>
                <Button type="submit" variant='contained' color='primary' size='large'>
                    Submit
                </Button>
            </div>
        </form>
    )
}