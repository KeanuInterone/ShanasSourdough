import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'
import ImageUploader from 'react-images-upload';
import './Admin.css'




export const ProductForm = ({ product, onSubmit }) => {

    // HOOKS //
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: product ? product.name : "",
            price: product ? product.price : "",
            description: product ? product.description : ""
        }
    })
    const [file, setFile] = useState(null);

    // EVENTS //
    const submitHandler = handleSubmit((data) => {
        onSubmit(data, file)
    })
    const fileHandler = (event) => {
        setFile(event.target.files[0])
    }
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
            {(file || (product != null && product.imageURL)) &&
                (<img className='imageContainer' src={file ? URL.createObjectURL(file) : product.imageURL} />)
            }
            <div style={{ height: 20 }}></div>

            <input type='file' onChange={fileHandler} />

            <div style={{ height: 20 }}></div>

            <div className='buttonContainer'>
                <Button type="submit" variant='contained' color='primary' size='large'>
                    Submit
                </Button>
            </div>
        </form>
    )
}